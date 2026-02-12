# Checkout 401 Fix — Context for Next Session

## The Problem
A client (ggjones@gmail.com) signed up, verified their email, logged in, but got:
**"Failed to start checkout. Please try again. Error: Checkout failed: 401"**

Their second attempt with info@gwenydd.com didn't receive a verification email at all (likely spam filter or Supabase rate limiting).

## Root Cause
The 401 is coming from **Supabase's edge function gateway**, not from our code. Supabase verifies the JWT at the infrastructure level *before* our `create-checkout` function runs. If the token from the email confirmation redirect is stale or slightly expired, the gateway rejects it with a 401.

Our `create-checkout/index.ts` error handler returns status 400, not 401 — confirming the 401 is from the gateway, not our code.

## Fixes Required

### Fix 1: Supabase Dashboard — Disable gateway JWT verification on `create-checkout`
- Go to **Edge Functions** → `create-checkout`
- Disable the JWT verification at the gateway level
- OR redeploy via CLI: `supabase functions deploy create-checkout --no-verify-jwt`
- OR add to `supabase/config.toml`:
  ```toml
  [functions.create-checkout]
  verify_jwt = false
  ```
- **This is safe** because `create-checkout/index.ts` already validates the token manually (lines 20-42)

### Fix 2: Supabase Dashboard — Check redirect URLs
- Go to **Authentication → URL Configuration**
- Confirm **Site URL** and **Redirect URLs** include `https://app.narraway.co.uk`

### Fix 3: Frontend — Add session refresh before checkout (`get-started.html`)
In the `redirectToCheckout()` function (line ~3474), add a session refresh before `getSession()`:

**Current code (line ~3476):**
```javascript
const { data: { session } } = await supabaseClient.auth.getSession();
```

**Change to:**
```javascript
await supabaseClient.auth.refreshSession();
const { data: { session } } = await supabaseClient.auth.getSession();
```

This ensures the access token is fresh before calling the edge function.

### Fix 4 (no change): Stripe
No Stripe changes needed. The 401 happens before Stripe is ever contacted.

## Testing Plan
1. Apply fixes 1-3
2. Sign up with a new test email
3. Confirm verification email arrives
4. Click verification link
5. Confirm checkout redirects to Stripe successfully
6. Complete test payment (use Stripe test card if in test mode)

## Key Files
- `get-started.html` — lines ~3474-3510 (`redirectToCheckout` function)
- `supabase/functions/create-checkout/index.ts` — the edge function
- `supabase/functions/stripe-webhook/index.ts` — handles payment confirmation (no changes needed)

## Client Follow-up
Once fixed, the client (ggjones@gmail.com) should be able to log in and complete checkout. They may need to try again or reset their password if their account is in a weird state from the failed attempts.
