# NarraWay — Update Context (Last updated: 6 April 2026 — PDF Export session)

Use this file to resume context in a new chat. Reference it at the start of the session.

---

## What We're Building

A significant redesign of the NarraWay journey-builder app, driven by user feedback and market research. The core change: **each step now has a clear, designed output** — something the user is proud to display and use as a reference.

Three outputs total:
1. **Strengths Profile** (from Step 1)
2. **Map** (from Step 2)
3. **Strategy** (from Step 3)

---

## Agreed Build Order

> Step 2 → Step 3 → Step 1 → Grid Coordinates → Team Mode → PDF Export

## Status
- [x] Step 2 — split map notes into 3 sections ✅
- [x] Step 3 — "My strengths will help me..." + 3 Moves cards ✅
- [x] Step 1 — full rebuild (pre-work, list, card assignment, summary) ✅
- [x] Grid Coordinates toggle ✅
- [x] Team Mode toggle ✅
- [x] Move card word limits (30 words per field) ✅
- [x] PDF Export — jsPDF canvas-based implementation ✅

### How to resume in a new chat
> "Please read UPDATE_CONTEXT.md in the App folder and let's continue the NarraWay redesign."

---

## What Was Built — Grid Coordinates ✅

A toggle on the Step 2 and Step 3 map panels that overlays spreadsheet-style coordinate labels on both maps.

- **Column headers** A, B, C... across the top of each map
- **Row numbers** 1, 2, 3... down the left of each map
- **Toggle UI:** "Grid coordinates" checkbox in the map panel's gallery-controls bar (both Step 2 and Step 3)
- **Synced:** ticking on either step syncs both checkboxes
- **UI only:** coordinates do not appear in any exported images or PDF pages
- **Persisted:** saved with the journey (`showGridCoords` boolean in state)

**New state field:** `showGridCoords: false`
**New function:** `toggleGridCoords(checked)` — updates state, syncs checkboxes, re-renders both maps
**IDs added:** `mapContainer`, `strategyMapContainer` (for reliable DOM reference in render functions)
**Checkbox IDs:** `gridCoordsToggle2` (Step 2), `gridCoordsToggle3` (Step 3)

---

## What Was Built — Step 2 ✅

Replaced the single notes textarea in Step 2 with a **Journey Logbook** panel containing 3 sections displayed below the map:
- **Where I am right now...** — 100 word hard cap
- **What lies in between...** — 100 word hard cap
- **Where I want to go...** — 100 word hard cap

Word counter turns amber at 20 words remaining, red at limit. Hard cap enforced (text trimmed on input).

**New IDs:** `notes2Left`, `notes2Centre`, `notes2Right` (+ `notes2LeftCount` etc.)
**Backward compat:** old `notes2` value loads into `notes2Left` on legacy saves.
**Save/load/reset/export** all updated.

---

## What Was Built — Step 3 ✅

1. **"My strengths will help me..."** panel — replaces old generic "Your Notes". 300-word hard cap, same counter behaviour as Step 2 notes. ID: `notes3`, counter: `notes3Count`.
   - Positioned **after the map**, before the Moves cards.

2. **My Three Moves** — 3 parchment cards side-by-side, each with 5 fields:
   - The Move (`move{n}Move`)
   - The Strength/s I'm Using (`move{n}Strengths`)
   - When and Where (`move{n}WhenWhere`)
   - If I Get Stuck (`move{n}IfStuck`)
   - Checkpoint (`move{n}Checkpoint`)

   Where `{n}` = 1, 2, or 3.

**Save/load/reset/export** all updated. Moves saved as array: `moves: [{move, strengths, whenWhere, ifStuck, checkpoint}, ...]`

**Step 3 panel order:**
1. Instructions
2. Video guide
3. Your Equipment (drag onto map)
4. Strategy map
5. My strengths will help me...
6. My Three Moves
7. Nav buttons

---

## What Was Built — Step 1 ✅

Full rebuild replacing the old click-to-select equipment gallery with a 6-section strengths discovery flow.

**6 sections:**
1. **Survey Responses** — free-form textarea, no word limit, for pasting peer survey feedback
2. **Self-Reflection** — 3 italic prompts as ordered list, single textarea below
3. **Patterns Spotted** — free-form textarea, no word limit
4. **Name Your Strengths** — type-and-add list builder; Enter key or Add button; counter turns green at 5; Add locks at 7; delete items
5. **Choose Your Equipment Cards** — strength slots appear as list grows; each slot has circular drag-drop zone + editable title (pre-filled from strength name) + descriptor textarea; gallery shows all 42 cards, assigned ones dimmed; card assignment panel hidden until at least 1 strength added
6. **Strengths Summary** — "I am at my best when..." textarea with 300-word cap

**Key behaviours:**
- `state.selectedEquipment` derived from assigned cards — Steps 2 & 3 unchanged
- Continue button requires ≥5 strengths named AND ≥5 cards assigned
- Full save/load/reset/export support
- Backward compat: old `notes1` maps to Strengths Summary; old `selectedEquipment` array rebuilds basic strength slots

**New state fields:** `strengthsList[]`, `strengthCards[]` (each: `{name, cardId, title, descriptor}`)
**New data fields saved:** `surveyResponses`, `selfReflection`, `patternsSpotted`, `strengthsList`, `strengthCards`, `strengthsSummary`

---

## What Was Built — Team Mode ✅

A toggle in the journey name modal that switches all I/My/Me → We/Our/Us throughout the app.

- **Checkbox:** "This is for a team" in the journey name modal, with hint text "(switches I/My to We/Our throughout)"
- **`applyTeamMode(isTeam)`** — iterates `[data-solo]`/`[data-team]` elements (text content) and `[data-solo-placeholder]`/`[data-team-placeholder]` elements (placeholders)
- **State field:** `teamMode: false` — saved, loaded, and reset correctly
- **Elements that switch:** "I am at my best when..." / "Where I am right now..." / "Where I want to go..." / "My strengths will help me..." / "My Three Moves" / "The Strength/s I'm Using" / "If I Get Stuck" / all 15 move card placeholders

## What Was Built — Move Card Word Limits ✅

30-word hard cap on all 15 move card text fields (5 fields × 3 cards).

- Uses existing `applyWordCountUI()` pattern — same amber/red counter behaviour
- New function: `updateMoveWordCounts()` — called on input, load, and reset
- Counter IDs: `move{n}{Field}Count` (e.g. `move1MoveCount`, `move2IfStuckCount`)
- 15 event listeners added in `init()`

---

## Grid Coordinates Toggle ← NEXT BUILD

### What it is
Column headers **A, B, C...** along the top of the map; row numbers **1, 2, 3...** down the left side — like a spreadsheet. Lets teams and coaches refer to specific tiles by coordinate (e.g. "what did you put at C2?").

### Decisions
- Available to **all users** (individual and team), not just team mode
- **Toggle** to show/hide — user preference, persists with the journey
- Shows on the **interactive map only** — does NOT appear in any exported images or PDF pages
- Applies to **both** the terrain map (Step 2) and the strategy map (Step 3)

### Implementation notes
- New state field: `showGridCoords: false` (boolean)
- Toggle UI: small checkbox or button in the map panel header (both Step 2 and Step 3)
- Rendering: add coordinate labels as DOM elements overlaid on the map grid (not canvas)
- Column labels: A–Z (sufficient for any map size — max is 6 columns)
- Row labels: 1–4 (max rows)
- Style: small, subtle labels — light colour, small font, outside the grid border

---

## Team Mode Toggle ← AFTER GRID COORDINATES

### What it is
A mode toggle presented at the **start of the journey** (in the journey name / welcome flow) that switches all UI copy from first-person singular (I/My) to first-person plural (We/Our).

### Decisions
- Simple boolean toggle, shown alongside the journey name field at journey start
- Saved in state and persisted with the journey — loads correctly on save/load
- **One person shares screen** while the group discusses — no multi-user accounts needed
- No separate app or URL — same `get-started.html`

### Scope of text changes
Every instance of I/My/Me in user-facing labels and instructions switches to We/Our/Us:
- Panel titles: "My Strengths" → "Our Strengths", "My Three Moves" → "Our Three Moves"
- Textarea placeholders and prompts
- Step instructions
- Counter badges, summary labels, etc.
- Does NOT affect field IDs, state keys, or save format

### Implementation notes
- New state field: `teamMode: false` (boolean)
- Toggle UI: simple labelled checkbox in the journey name modal — "This is for a team"
- All UI text that contains I/My/Me should be driven by a helper `t(singular, plural)` that returns the right string based on `state.teamMode`
- Or simpler: `const pronoun = state.teamMode ? 'We' : 'I'` etc., used inline when rendering
- Re-render Step panels on toggle change

---

## PDF Export — Key Decisions (Finalised 6 April 2026)

### Per-step export architecture
Exports are available at the **end of each step**, not just Step 4. Each export only renders completed content from that step.

| Step | Portrait Pages | Landscape Export |
|------|---------------|-----------------|
| Step 1 | Pages 2–4 (Survey & Reflections, Key Strengths, Strengths Summary) | — |
| Step 2 | Page 5 (Map of The Journey Ahead + Journey Logbook) | Journey Map (terrain only + NarraWay logo) |
| Step 3 | Pages 6–7 (Strengths Map & Strategy, My Three Moves) | Strategy Map (terrain + equipment cards + logo) |
| Step 4 | Full portrait report (all 8 pages) | Both landscape maps (2-page document) |

**Partial export rule:** only render content that has been completed in that section. Empty sections are omitted.

**Landscape exports:** Visual only — terrain map (Step 2) or terrain + equipment cards (Step 3). NarraWay logo underneath. Same style as current Step 4 canvas export. No text content. Grid coordinates do NOT appear in exports.

**Step 4's role:** Assembles everything — still valuable even if users have already exported sections individually. Full report + both landscape maps in one go.

### Approach
- Use `html2pdf.js` (html2canvas + jsPDF) — client-side, no server needed
- Hidden output template divs designed for A4, separate from interactive UI
- **Modular page templates** — one hidden div per page — export functions select which pages to include

### Portrait Report — Page Structure (APPROVED: 8-page "alt" layout ✓)

| Page | Title | Header Colour | Content |
|------|-------|---------------|---------|
| 1 | Title Page | — | Map (full width, with strength cards 86px), pushed down from top; journey name / "Strategic Plan for" / user name / NarraWay logo lower half |
| 2 | Survey Responses & Reflections | Amber | 3 parchment boxes: Survey Responses, Self-Reflection, Patterns Spotted — **flexible height, may overflow to page 3** |
| 3 | Key Strengths | Amber | Equipment cards in 3-col × 3-row grid (sized for up to 7 strengths); parchment card per strength with circular image, title, descriptor |
| 4 | Strengths Summary | Amber | "I am at my best when..." title inside parchment box; 300-word body text; decorative row of circular card images below box |
| 5 | Map of The Journey Ahead + Journey Logbook | Green | Full-width terrain map (no cards) at top with padding; 3 stacked parchment boxes below (Where I am / Between / Where I'm going) |
| 6 | Strengths Map & Strategy | Teal | Full-width terrain map with strength cards at top with padding; parchment box below with "My strengths will help me..." title + 300-word body |
| 7 | My Three Moves | Teal | 3 equal parchment cards; 5 fields per card in 2 columns; equipment card (80px) bottom-right of each |
| 8 | Closing Page | — | Amber bars top/bottom; L-shaped corner lines in amber; NarraWay logo centred; teal tagline; amber rule; date; URL |

### Landscape Document — Page Structure
| Page | Content |
|------|---------|
| 1 | Terrain map (full landscape, no cards) |
| 2 | Strengths map (terrain + equipment cards, full landscape) |

### Design Language — FINALISED ✓
- **Background:** White (print-friendly)
- **Fonts:** Poppins (headings/labels), Source Sans Pro (body) — loaded via Google Fonts, renders in html2pdf.js
- **Colours:**
  - Amber: `#E4A625` — header bands (strengths pages), top/bottom bars on every page, rules, corner accents
  - Green: `(61,115,64)` — header band (map + logbook combined page)
  - Teal: `(45,122,140)` — header bands (strategy + moves pages), tagline on closing page
  - Body text: `(28,18,8)` — very dark warm brown, all body text
  - Mid brown: `(120,95,65)` — labels / secondary text
  - Parchment: `#F8EDD4` — content box backgrounds
  - Light grey: `(210,205,198)` — content box borders
- **Typography scale:**
  - Page section titles (header band): Poppins Bold 30px
  - "I am at my best when..." / "My strengths will help me..." titles: Poppins Bold 24px, colour matches header band
  - Move card titles: Poppins Bold 20px, teal
  - Strength/field labels: Poppins SemiBold 17–19px, mid brown
  - Body text / descriptors / field values: Source Sans Pro 17–18px
  - Small text (date, URL): Source Sans Pro 16px
- **Layout rules:**
  - Canvas: 1014 × 1434px (~130dpi equivalent)
  - Page margin: 56px
  - Content width: 902px (margin to margin)
  - Map width: 902px (full content width — same as content boxes)
  - Tile size: 150px → map height: 450px (6 cols × 3 rows)
  - Amber bar: 6px top and bottom of every page
  - Header band: 88px; "NarraWay" text right-aligned in white (header pages); logo pages have no header band
  - Card corner radius: 14px
  - Equipment cards: circular clip — 88px on Key Strengths page, 96px on map pages, 86px on title page map, 80px on Moves cards
- **Page-specific notes:**
  - **Title page:** Map pushed down 72px from top bar (not flush); lower section vertically centred in remaining space; NarraWay logo (black text, transparent bg, 280px wide) replaces logo text
  - **Key Strengths:** 3 cols × 3 rows grid, sized for max 9 slots (supports up to 7 strengths); odd-number last row left-aligned
  - **Combined map pages (5 & 6):** Map has 16px top padding; 24px gap between map bottom and content boxes below
  - **Closing page:** L-shaped right-angle amber lines in corners (not filled blocks); NarraWay logo (320px wide) above centre; tagline below centre
- **Logo file:** `App/Assets/Logos/NarraWay Logo Black Text Cropped Transparent.png` (2000×650, RGBA)
- **Approved mockup:** `pdf_mockup_alt.png` in project root — this is the reference file
- **Generation script:** `/tmp/nw_mockup2.py` (re-runnable; fonts at `/tmp/nw_fonts/`, cards at `/tmp/nw_cards/`)

### Word Counts — Consistent Between App and PDF
- Strengths summary: **300 words**
- "My strengths will help me...": **300 words**
- Each map notes section (Where I am / Between / Where I'm going): **100 words**
- Survey responses, self-reflection, patterns spotted: **no limit**

---

## Team Version — Approach

No separate app or URL. Team mode is a **toggle within the existing app**, shown at journey start alongside the journey name field. One person shares their screen while the group discusses.

**What changes in team mode:**
- All I/My/Me → We/Our/Us in UI labels, instructions, placeholders
- Grid coordinates available (same as individual — not team-exclusive)
- No multi-user accounts, no real-time sync, no separate codebase

**What stays the same:**
- All field IDs, state keys, save format
- PDF output (uses the same templates — pronoun changes are UI-only for now)

---

## What Was Built — PDF Export ✅

Canvas-based PDF generation using jsPDF (CDN: `cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`).

**Library:** jsPDF via CDN (NOT html2pdf.js — canvas approach used instead for reliability)

**Export buttons added:**
- Step 1 nav-panel: "📄 EXPORT PROFILE" → pages 2–4 (portrait A4 PDF)
- Step 2 nav-panel: "📄 EXPORT MAP" → page 5 + landscape terrain (A4 PDF)
- Step 3 nav-panel: "📄 EXPORT STRATEGY" → pages 6–7 + landscape strategy (A4 PDF)
- Step 4: "📄 EXPORT FULL REPORT" → all 8 pages portrait; "🗺️ EXPORT LANDSCAPE MAPS" → both landscape pages

**Architecture:** All drawing done in canvas (1014×1434px portrait, 1434×1014px landscape), converted to JPEG, assembled into A4 PDF via jsPDF.

**Key functions (all in PDF script block at end of `get-started.html`):**
- `PD` — constants object (dimensions, colours)
- `_drawMap(ctx, x, y, mapW, includeEq)` — async, draws terrain + optional equipment
- `_circ(ctx, cx, cy, r, cardId)` — async, draws circular equipment card
- `_page1()` – `_page8()` — async, build each portrait page canvas
- `_landscape1()`, `_landscape2()` — async, build landscape canvases
- `_makePDF(portraitBuilders, landscapeBuilders, filename)` — assembles and downloads PDF
- `exportStep1PDF()`, `exportStep2PDF()`, `exportStep3PDF()`, `exportFullReportPDF()`, `exportLandscapeMapsPDF()` — public export functions called from button onclick

**Page colours:**
- Amber header: pages 2, 3, 4 (`#E4A625`)
- Green header: page 5 (`#3D7340`)
- Teal header: pages 6, 7 (`#2D7A8C`)
- No header band: pages 1, 8 (title + closing)

**Quick image export** (original PNG/text exports) kept as "Quick Image Export" panel in Step 4.

---

## Key Constraints / Context
- App is a single HTML file (`get-started.html`) — all JS, CSS, and base64 assets inline
- No backend changes needed for this phase
- Jamie is non-technical — guide step by step, recommend safest/easiest approach
- Vercel auto-deploys from `main` branch; Jamie pushes via GitHub Desktop
