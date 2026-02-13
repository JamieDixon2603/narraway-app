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
- `data` (JSONB — stores full journey state: currentStep, selectedEquipment, mapCols/Rows, placedTerrain, terrainBuffer, terrainUsage, placedEquipment, notes)
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

## Planned: Tiered Pricing Model

### Decision (Feb 2025)
Three-tier pricing to support individual, coached, and team use cases.

| Tier | Price | Buyer | Features |
|------|-------|-------|----------|
| Individual | £100 | Self-guided user | Full app |
| Coached | £50 | Coach (buys for coachee) | Full app + coach sharing |
| Team | £200 | Team leads / L&D / facilitators | Full app + facilitation/presentation mode |

### Technical approach
- Extend `subscription_status` on `users` table: `null` → `"individual"` / `"coached"` / `"team"` (currently just `"active"`)
- Facilitation mode features gated by `subscription_status === "team"` in frontend
- Separate Stripe price objects per tier
- **Facilitation/presentation mode (parked):** Optimised screen-sharing layout with numbered/lettered cards, larger display, cleaner gallery view. Not real-time multiplayer — designed for one person sharing screen while team discusses.

---

## Planned: HubSpot Integration
- On user signup, send confirmation email via HubSpot instead of Supabase default
- Add new user email to HubSpot mailing list for automated email sequence
- Needs investigation into wiring HubSpot API with Supabase auth flow

---

## Session Log
_Ask Claude to update this section at regular intervals during chats._

### Session — 13 Feb 2025
**Tester feedback & UX improvements:**
- Fixed critical save bug: all journey CRUD functions used wrong variable (`supabase` vs `supabaseClient`)
- Redesigned header: separated Save/Load into distinct buttons (💾 Save + 📂 Load ▼ dropdown)
- Added save prompt panel on Step 4 (green highlight, prominent save button)
- Logo now links to landing page in both `get-started.html` and `index.html`
- Added smooth scroll-to-top on step transitions
- Fixed blue italic text in Step 2 instructions — now bold italic in regular text colour (was being mistaken for hyperlinks)
- Added `beforeunload` warning to prevent accidental navigation away from unsaved work

**Autosave feature:**
- Welcome modal now includes journey name input (defaults to "My Journey 01" etc.)
- Journey created in database immediately on "BEGIN YOUR JOURNEY" click
- Autosave triggers on every step transition (silent, with "✓ Saved" indicator in header)
- Manual save and autosave stay in sync (shared journey ID)
- New Journey flow properly resets autosave state

**Map resize tile preservation:**
- Added `terrainBuffer` to state — tiles hidden by downsizing are preserved, not deleted
- Buffered tiles still count against per-tile usage limits (prevents exceeding maximums)
- Tiles auto-restore when grid is resized back up
- Buffer notice shown to user: "X tiles saved from a larger map size. Resize back up to restore."
- Buffer data persists in cloud saves

**Decisions & future planning:**
- Structured notes (Step 1 phases, Step 2 destination/start/between, side-by-side view) — parked for UX exploration
- Personalisation ("Welcome {name}") — to implement alongside coach features before Feb 25th session
- Coach licensing — ready to plan and build (Phase 1: coach purchase flow)
- HubSpot integration — new requirement: signup emails via HubSpot + mailing list automation
- Tiered pricing discussed: Individual £100 / Coached £50 / Team £200
- Presentation/facilitation mode — parked as future Team tier feature (not real-time multiplayer, just optimised screen-sharing layout with numbered cards)
- Testimonials section on landing page — parked until content available

### Session — 10 Feb 2025
- Discussed coach licensing business model (3 options: full portal, simple discount link, hybrid)
- Decided on hybrid/phased approach
- Worked through technical design of coach-buys-for-coachee flow
- Decided against payouts/commission (too complex for Stripe setup across different coaches)
- Confirmed no separate coach app needed — one codebase, conditional UI
- Discussed access control for coach purchase page — unique codes per coach (Option 2)
- Created this CLAUDE.md file for cross-session context
