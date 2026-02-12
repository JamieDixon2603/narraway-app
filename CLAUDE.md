# NarraWay — Project Context

## Overview
NarraWay is a coaching journey-builder app where users create visual journey maps using terrain tiles and equipment/strength cards. It's a metaphor-based coaching tool.

## Tech Stack
- **Frontend:** Vanilla JavaScript (single HTML file: `get-started.html`, ~18.8MB due to base64-encoded assets)
- **Database:** PostgreSQL via Supabase
- **Auth:** Supabase Auth (email/password)
- **Payments:** Stripe (one-time £100 payment, not subscription)
- **Hosting:** Vercel
- **Edge Functions:** Supabase (Deno runtime) — `create-checkout` and `stripe-webhook`

## Database Schema
### `users` table
- `id` (UUID, from Supabase Auth)
- `email`
- `subscription_status` ("active" or null)

### `journeys` table
- `id` (UUID)
- `user_id` (FK to users)
- `name` (journey name)
- `journey_data` (JSONB — stores full journey state: currentStep, selectedEquipment, mapCols/Rows, placedTerrain, terrainUsage, placedEquipment, notes)
- `updated_at`

## Current Auth/Access Model
- Binary: paid or unpaid. No roles, no admin, no multi-user features.
- Payment gated — Stripe checkout redirects, webhook sets `subscription_status = "active"`

## Content
- 42 equipment/strength cards (circular icons, base64-encoded)
- 42 terrain tiles (organised by rarity: base, settlement, special feature, rare)
- All hardcoded in frontend, not in database

## Key Files
- `get-started.html` — The entire app (auth, UI, journey builder, cloud save/load)
- `index.html` — Landing/marketing page
- `supabase/functions/stripe-webhook/index.ts` — Handles Stripe payment confirmation
- `supabase/functions/create-checkout/index.ts` — Creates Stripe checkout session
- `vercel.json` — Routes `/` to `get-started.html`

---

## Planned: Coach Licensing Model

### Decision (Feb 2025)
Adding a system where licensed coaches can buy NarraWay accounts for their coachees at a discounted rate (£50 vs £100).

### Approach — Phased
**Phase 1: Coach purchase flow**
- New `coaches` table in Supabase: `id`, `email`, `coach_code`, `is_active`
- New columns on `users` table: `coach_id` (FK to coach who bought the account)
- New standalone page: `/coach-purchase` — simple form (coach code + coachee email + Stripe £50 checkout)
- Coach enters their unique code (validated against `coaches` table) and the coachee's email
- On payment success, webhook creates/activates the coachee's account using `supabase.auth.admin.inviteUserByEmail()`
- Coachee receives email with link to set their password
- No separate "coach app" — just a standalone purchase form page
- Coach codes are unique per coach, can be deactivated by flipping `is_active`

**Phase 2: "Share with coach" (future)**
- Add `share_with_coach` boolean on `journeys` table
- Coachee controls sharing via a toggle on each journey
- Coach gets a "My Coachees" tab in the existing app (read-only view of shared journeys)
- Enforced at DB level via Supabase Row Level Security
- Coach is also a regular user with their own journeys
- No separate master app needed — conditional UI based on whether user is in `coaches` table

**Phase 3: Full coach dashboard (future, if demand warrants)**
- Analytics, coachee progress tracking, etc.

### Key Decisions
- No payout/commission system — coach buys at £50, charges coachee whatever they want privately
- No coupon codes or referral tracking — coach purchase page has its own Stripe price
- Coach access is code-protected so the discount link can't be used by non-coaches
- Privacy-first: coachee controls what's shared, not the coach

---

## Session Log
_Ask Claude to update this section at regular intervals during chats._

### Session — 10 Feb 2025
- Discussed coach licensing business model (3 options: full portal, simple discount link, hybrid)
- Decided on hybrid/phased approach
- Worked through technical design of coach-buys-for-coachee flow
- Decided against payouts/commission (too complex for Stripe setup across different coaches)
- Confirmed no separate coach app needed — one codebase, conditional UI
- Discussed access control for coach purchase page — unique codes per coach (Option 2)
- Created this CLAUDE.md file for cross-session context
