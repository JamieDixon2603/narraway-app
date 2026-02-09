import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.10.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log("Received event:", event.type);

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.user_id;
    const customerEmail = session.customer_email;

    console.log("Payment completed for user:", userId, "email:", customerEmail);

    if (userId) {
      // Update user's subscription status in Supabase
      const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Check if user exists in users table
      const { data: existingUser, error: selectError } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      if (selectError && selectError.code !== "PGRST116") {
        console.error("Error checking user:", selectError);
      }

      if (existingUser) {
        // Update existing user
        const { error: updateError } = await supabase
          .from("users")
          .update({ subscription_status: "active" })
          .eq("id", userId);

        if (updateError) {
          console.error("Error updating user:", updateError);
          return new Response("Error updating user", { status: 500 });
        }
        console.log("Updated user subscription status to active");
      } else {
        // Insert new user record
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            id: userId,
            email: customerEmail,
            subscription_status: "active",
          });

        if (insertError) {
          console.error("Error inserting user:", insertError);
          return new Response("Error inserting user", { status: 500 });
        }
        console.log("Created new user with active subscription");
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
