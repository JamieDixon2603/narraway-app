# PROMPT: NARRAWAY - COACHING GAME APP

## PROJECT OVERVIEW

Build a single-file HTML coaching game app called "NarraWay" with an Age of Discovery / explorer theme. The app guides users through a reflective coaching exercise in 4 steps. It feels like a game but has no win/lose conditions.

This is a **demo version** for recording demonstration videos - no Memberstack integration, no video embeds needed yet.

---

## VISUAL ASSETS PROVIDED

- **Logos:** 
  - `NarraWay_Logo_Transparent.png` - Black text version (use in welcome modal and export)
  - `NarraWay_Logo_White_Text.png` - White text version (use in header bar)
  - **IMPORTANT:** Both logos must be cropped to remove blank space before embedding (original files have large transparent margins)
- **Equipment cards:** Objects folder - 42 circular icons representing explorer equipment (compass, sword, telescope, etc.)
- **Terrain cards:** Terrain_Cards folder - 42 square tiles organised into subfolders indicating usage limits:
  - Base Terrain (x 4 of each card) - 10 types
  - Settlement Cards (x 2 of each) - 10 types
  - Special Feature Cards (x 2 of each) - 20 types
  - Rare Cards (x 1 of each) - 2 types

---

## BRAND GUIDELINES

### Colour Palette: "Joyful Explorer"

| Role | Colour Name | Hex Code | Usage |
|------|-------------|----------|-------|
| Primary | Bright Amber | `#E4A625` | Buttons, highlights, CTAs, selected states |
| Primary Dark | Dark Amber | `#C99020` | Button hover states |
| Secondary | Terracotta | `#C94C2E` | Energy accents, warmth, alerts, remove buttons |
| Tertiary Light | Verdant Green | `#5A8F4E` | Success states, completed step indicators |
| Tertiary Dark | Deep Verdant | `#3D7340` | Depth, hover states |
| Accent | Ocean Teal | `#2D7A8C` | Journey/water elements, links, contrast, italic text |
| Text | Warm Umber | `#3B2A1A` | All body text, headings |
| Header Background | Dark Brown | `#4A3728` | Header bar background |
| Background | Warm Parchment | `#F8EDD4` | App backgrounds, cards, panels |
| Wood Border | Wood Brown | `#8B5A2B` | Panel borders, scrollbar thumb |
| Wood Light | Light Wood | `#A67C52` | Secondary borders |

### Typography

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Source+Sans+Pro:wght@400;600&display=swap');

/* Font stacks */
--font-heading: 'Poppins', system-ui, sans-serif;
--font-body: 'Source Sans Pro', system-ui, sans-serif;
```

| Use | Font | Weight |
|-----|------|--------|
| Headings (H1, H2, H3) | Poppins | Semi-Bold (600) / Bold (700) |
| Body text | Source Sans Pro | Regular (400) |
| UI elements (buttons, labels) | Source Sans Pro | Regular (400) / Semi-Bold (600) |

---

## TECHNICAL REQUIREMENTS

- Single HTML file with all images embedded as base64 (~19MB total)
- No external dependencies except Google Fonts (Poppins and Source Sans Pro)
- Responsive design (works on desktop and tablet)
- Warm parchment backgrounds with subtle wood-frame borders (3px solid #8B5A2B)
- Gold/amber highlights for selected/active states
- Smooth transitions and hover effects
- **Logos must be programmatically cropped** to remove blank space before embedding (use PIL/Pillow to find non-transparent bounds)

---

## WELCOME MODAL

### Layout:
1. Text "Welcome to" (centered, Poppins Bold, **2rem font-size** to match logo text)
2. NarraWay logo (black text version, cropped, centered, **max-width: 320px**)
3. Description paragraph (minimal gap from logo - **margin-bottom: 16px** on logo)
4. "You'll go through 4 steps:" heading
5. Numbered list of steps
6. "BEGIN YOUR JOURNEY" button (full width, amber)

### Spacing:
- "Welcome to" to logo: **4px margin-bottom**
- Logo to description: **16px margin-bottom**
- Description to steps title: **16px margin-bottom**

### Text to Display:
> "Welcome to
> [LOGO]
>
> This coaching experience will help you explore your strengths and how to make the most of them to navigate the journeys you face.
>
> You'll go through 4 steps:"

### Steps Overview:
1. **Choose Your Equipment** - Select cards that represent your strengths
2. **Map Your Journey** - Create a visual map of your challenge or goal
3. **Apply Your Strengths** - Place your equipment where it will help most
4. **Export** - Save your completed Journey Map

---

## HEADER

- Background: Dark Brown (`#4A3728`) - NOT the darker Warm Umber
- NarraWay logo on left (white text version, cropped, **50px height**)
- Step indicator dots (1-4) on right
- Sticky positioning at top of viewport
- Padding: 12px 24px
- Box shadow: `0 2px 8px rgba(0,0,0,0.3)`

### Step Indicators:
- Circular dots (32px Ã— 32px)
- Numbers in Poppins Semi-Bold, 14px
- Active step: Amber background (`#E4A625`) with dark text, glow shadow
- Completed steps: Green background (`#5A8F4E`) with white checkmark (replaces number)
- Future steps: Semi-transparent white background (`rgba(255,255,255,0.2)`)
- Clickable for navigation (respects validation rules)
- Hover: scale(1.1) on non-active dots

---

## STEP 1: EQUIPMENT SELECTION

### Prompt to Display:
> "**Reflect on your strengths.** Think about:
> 1. What do people normally come to you for help with?
> 2. What sort of things energise you?
> 3. What sort of things do you find easy that others find difficult?
>
> When you are clear on your strengths, choose **5-7 of the Equipment cards** from the gallery below to represent those. It doesn't matter what those cards are, what matters is what those cards mean to you."

### Layout (top to bottom):
1. Instruction panel with prompt text
2. Notes textarea panel ("Your Notes")
3. Selected Equipment panel - displays chosen cards with remove buttons
4. Equipment Gallery panel - all 42 cards in grid
5. Navigation buttons panel

### Features:
- Gallery of all 42 equipment cards (circular images)
- **NO labels on equipment cards** (to avoid influencing user thinking)
- Click to select/deselect cards in gallery
- Selection counter badge showing "Equipment Selected: X / 7 (minimum 5)"
- Counter turns green when 5+ selected
- Separate display area showing selected equipment cards
- **Red Ã— button appears on hover** over each selected card for removal
- Resizable gallery slider: **50-100px range, default 75px**
- Notes textarea for user reflections
- "CONTINUE TO MAPPING â†’" button disabled until 5-7 cards selected

---

## STEP 2: TERRAIN MAPPING

### Prompt to Display:
> "**Now think of a project, goal or challenge that is important to you right now.** The more specific the better. For example, a career transition, a business goal, a health related challenge.
>
> Then use the terrain cards from the gallery below to represent and map out this project, goal or journey. Start by thinking *where you want to go*, then *where you are now*, and then map the *terrain that lies in between*."

### Layout (top to bottom):
1. Instruction panel with prompt text
2. Notes textarea panel ("Your Notes")
3. Map Size selector panel (button group)
4. Side-by-side layout (grid: 1fr 2fr):
   - LEFT: Terrain Gallery panel (scrollable, max-height 600px)
   - RIGHT: Map panel with grid
5. Navigation buttons panel

### Map Size Options:
- 3Ã—3 (9 tiles)
- 4Ã—3 (12 tiles) - DEFAULT
- 6Ã—3 (18 tiles)
- 6Ã—4 (24 tiles)

### Terrain Gallery Features:
- **Single flat gallery** (no category headers visible to user)
- All 42 terrain cards displayed in responsive grid
- Count badge on each card showing remaining availability
- Badge turns red/low when only 1 remaining
- Cards become greyed out (opacity: 0.4) and non-draggable when limit reached
- Gallery Size slider: **60-160px range, default 90px**
- Gallery container scrollable with max-height

### Map Features:
- Grid with dark border lines between cells
- Empty cells show dashed border
- Drag-and-drop terrain cards from gallery onto grid
- Drag placed cards to swap/move positions
- **Ã— button appears on hover** over placed terrain cards
- Map Size slider: **60-150% range, default 100%**
- Compass rose in bottom-right corner (hides when that cell is filled)
- Validation message showing "X/Y filled"
- Cannot proceed until all tiles filled

### Terrain Usage Limits (internal reference only):
- Base Terrain: 4 uses each
- Settlements: 2 uses each
- Special Features: 2 uses each
- Rare: 1 use each

---

## STEP 3: STRATEGY (APPLY EQUIPMENT TO MAP)

### Prompt to Display:
> "**Whatever journey you are on, you always carry your strengths.**
>
> In this section, reflect on how you can use the strengths you have to navigate the journey you face. Drag your equipment cards onto the terrain tiles where you think those strengths will be most useful."

### Layout (top to bottom):
1. Instruction panel with prompt text
2. Notes textarea panel ("Your Notes")
3. Equipment Inventory panel - shows selected equipment as draggable items
4. Map panel - completed terrain map with equipment overlay capability
5. Navigation buttons panel

### Features:
- Equipment inventory displays selected cards from Step 1 (50px size)
- Equipment cards are draggable (cursor: grab/grabbing)
- Completed terrain map displayed (not editable)
- Each terrain tile has invisible 2Ã—2 grid overlay for equipment placement
- Drag equipment cards onto any of the 4 quadrant positions per tile
- **Can place unlimited copies** of each equipment card
- Equipment renders as circles with:
  - Parchment background (`#F8EDD4`)
  - Brown border (2px solid `#8B5A2B`)
  - Box shadow for depth
  - Size: 70% of slot, image 85% of circle
- **Ã— button appears on hover** over placed equipment for removal
- Map Size slider: **80-200% range, default 120%**
- Notes textarea for strategy reflections

---

## STEP 4: EXPORT

### Layout (top to bottom):
1. Instruction panel with congratulations message
2. Export Options panel:
   - Checkbox: "Include equipment on map" (checked by default)
   - Three export buttons in a row
3. Map Preview panel with canvas and zoom control
4. Navigation buttons panel (Back + Start New Journey)

### Prompt to Display:
> "Congratulations on completing your Journey Map! You can now export your work to keep as a reminder of your strengths and the path ahead."

### Export Buttons:
- **EXPORT MAP AS IMAGE** (primary amber button with ðŸ–¼ï¸ icon)
- **EXPORT NOTES** (secondary button with ðŸ“ icon)
- **EXPORT EVERYTHING** (secondary button with ðŸ“¦ icon) - exports both sequentially

### Export Image Requirements:
- High resolution: **3x scale**
- Cell size: **150px** (450px at 3x)
- Parchment background (`#F8EDD4`)
- Dark grid lines between tiles (2px, `#3B2A1A`)
- Equipment cards rendered as circles with:
  - Parchment fill background
  - Brown border (2px solid `#8B5A2B`)
  - Clipped circular image
  - Size: 35% of cell size
- **Logo positioned in margin below the map:**
  - Margin bottom: **100px**
  - Logo height: **70px** (cropped version)
  - Centered horizontally
  - 15px from top of margin area

### Map Preview:
- Preview slider: **40-100% range, default 60%**
- Canvas border: 3px solid wood brown

### Export Notes Format:
```
NARRAWAY - MY JOURNEY NOTES
============================

MY STRENGTHS
------------
[user's step 1 notes]


MY JOURNEY
----------
[user's step 2 notes]


MY STRATEGY
-----------
[user's step 3 notes]


============================
Created with NarraWay
```

### Start New Journey:
- Confirmation dialog before clearing
- Resets all state (equipment, terrain, placed equipment, notes)
- Returns to Step 1 with welcome modal

---

## UI/UX DETAILS

### Panels:
- Background: Warm Parchment (`#F8EDD4`)
- Border: 3px solid `#8B5A2B`
- Border radius: 12px
- Padding: 20px
- Margin bottom: 20px
- Box shadow: `0 4px 12px rgba(0,0,0,0.15)`

### Buttons:
- Primary: Amber background (`#E4A625`), dark text, hover darkens to `#C99020`
- Secondary: White background, dark text, 2px border `#A67C52`, border darkens on hover
- Disabled: Grey background (#ccc), grey text (#888), cursor: not-allowed
- Border radius: 8px
- Padding: 12px 24px
- Font weight: 600
- Transition: all 0.2s ease

### Navigation Panel:
- Flex layout with space-between
- "â† BACK TO [STEP]" on left (secondary)
- "CONTINUE TO [STEP] â†’" on right (primary)
- Padding: 16px 20px

### Remove Buttons (Ã—):
- Small circular button (22px for selected equipment, 24px for map cells, 18px for placed equipment)
- Terracotta background (`#C94C2E`)
- White Ã— symbol (font-weight: bold)
- Hidden by default, appears on hover (display: flex)
- Positioned top-right of item (top: -6px, right: -6px for equipment)

### Counter Badges:
- Terracotta background (`#C94C2E`) when invalid
- Green background (`#5A8F4E`) when valid/complete
- White text
- Font weight: 600
- Font size: 0.9rem
- Border radius: 20px
- Padding: 6px 16px

### Scrollbars:
- Custom styled (webkit)
- Width/height: 10px
- Track: `rgba(0,0,0,0.1)`, border-radius: 4px
- Thumb: `#8B5A2B`, border-radius: 4px
- Thumb hover: `#A67C52`

---

## VALIDATION RULES

1. **Step 1 â†’ Step 2:** Must have 5-7 equipment cards selected
2. **Step 2 â†’ Step 3:** Must have all map tiles filled
3. **Step 3 â†’ Step 4:** No validation required
4. **Backward navigation:** Always allowed
5. **Step indicator clicks:** Respect forward validation, backward always allowed

---

## STATE MANAGEMENT

### Global State:
- `currentStep` - Current step number (1-4)
- `selectedEquipment` - Set of selected equipment keys
- `mapCols`, `mapRows` - Current map dimensions
- `placedTerrain` - Object mapping "row-col" to terrain key
- `terrainUsage` - Object tracking usage count per terrain type
- `placedEquipment` - Object mapping "cellIndex-slotIndex" to equipment key

### Preservation:
- Terrain positions preserved when changing map size (if within new bounds)
- Equipment selections preserved across steps
- Notes preserved in textareas
- All state cleared on "Start New Journey"

---

## BUILD NOTES

### Logo Cropping (Python/PIL):
```python
from PIL import Image
import numpy as np

img = Image.open('logo.png').convert('RGBA')
arr = np.array(img)
alpha = arr[:,:,3]
rows = np.any(alpha > 0, axis=1)
cols = np.any(alpha > 0, axis=0)
row_min, row_max = np.where(rows)[0][[0, -1]]
col_min, col_max = np.where(cols)[0][[0, -1]]
cropped = img.crop((col_min, row_min, col_max + 1, row_max + 1))
```

### Image Embedding:
- All images converted to base64 data URIs
- Format: `data:image/png;base64,{base64_data}`
- Total file size approximately 19MB

---

## END OF PROMPT
