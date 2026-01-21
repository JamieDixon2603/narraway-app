# NarraWay Brand Guidelines

## Colour Palette: "Joyful Explorer"

| Role | Colour Name | Hex Code | RGB | Usage |
|------|-------------|----------|-----|-------|
| **Primary** | Bright Amber | `#E4A625` | 228, 166, 37 | Sun in logo, buttons, highlights, CTAs |
| **Secondary** | Terracotta | `#C94C2E` | 201, 76, 46 | Energy accents, warmth, alerts |
| **Tertiary (Light)** | Verdant Green | `#5A8F4E` | 90, 143, 78 | Front hill in logo, terrain elements |
| **Tertiary (Dark)** | Deep Verdant | `#3D7340` | 61, 115, 64 | Back hill in logo, depth |
| **Accent** | Ocean Teal | `#2D7A8C` | 45, 122, 140 | Journey/water elements, contrast |
| **Text** | Warm Umber | `#3B2A1A` | 59, 42, 26 | All body text, logo wordmark |
| **Background** | Warm Parchment | `#F8EDD4` | 248, 237, 212 | App backgrounds, cards |

---

## Typography

### Logo
- **Font:** Gilroy Bold
- **Note:** Baked into logo image file (no web license required)

### Web Application

| Use | Font | Weight | Source |
|-----|------|--------|--------|
| Headings (H1, H2, H3) | Poppins | Semi-Bold (600) / Bold (700) | Google Fonts |
| Body text | Source Sans Pro | Regular (400) | Google Fonts |
| UI elements (buttons, labels) | Source Sans Pro | Regular (400) / Semi-Bold (600) | Google Fonts |

### CSS Implementation

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Source+Sans+Pro:wght@400;600&display=swap');

/* Font stacks */
--font-heading: 'Poppins', system-ui, sans-serif;
--font-body: 'Source Sans Pro', system-ui, sans-serif;

/* Colour variables */
--color-primary: #E4A625;
--color-secondary: #C94C2E;
--color-tertiary-light: #5A8F4E;
--color-tertiary-dark: #3D7340;
--color-accent: #2D7A8C;
--color-text: #3B2A1A;
--color-background: #F8EDD4;
```

---

## Logo Specifications

- **Master file:** 2000 x 2000 pixels
- **Formats needed:**
  - PNG with transparent background (primary)
  - PNG with parchment background (`#F8EDD4`) for social/marketing
  - Favicon: 512 x 512 pixels (icon only or full lockup)

### Logo Construction
- Sun + hills icon aligned above wordmark
- Hills align horizontally with "arra" in wordmark
- Bottom of hills sits halfway between top of "arra" and top of "N" and "W"

---

## Brand Aesthetic

**Keywords:** Joyful, warm, exploratory, hopeful, grounded, map-inspired

**Influences:**
- Settlers of Catan (warm, earthy, playful)
- Age of Exploration (parchment, journeys, discovery)

**Tone:** Professional enough for corporate L&D contexts, warm enough for purpose-driven leaders and coaches.

---

## Parent Brand Relationship

NarraWay sits within **The Story Habit** brand family:
- Shares warm, approachable aesthetic
- Typography choices align with parent brand
- Can be used standalone or co-branded

---

*Last updated: January 2026*
