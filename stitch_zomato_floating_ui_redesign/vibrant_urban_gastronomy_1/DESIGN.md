---
name: Vibrant Urban Gastronomy
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1b'
  on-surface-variant: '#5b403f'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8f6f6e'
  outline-variant: '#e4bebc'
  surface-tint: '#bb162c'
  primary: '#b7122a'
  on-primary: '#ffffff'
  primary-container: '#db313f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b1'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#006b34'
  on-tertiary: '#ffffff'
  tertiary-container: '#29844a'
  on-tertiary-container: '#f6fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#9bf6b0'
  tertiary-fixed-dim: '#80da96'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005227'
  background: '#fcf9f8'
  on-background: '#1b1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style
The design system is built for a high-energy, fast-paced food delivery environment. It balances the urgency of hunger with the joy of discovery. The personality is confident, appetizing, and hyper-modern, drawing from a "Floating UI" aesthetic that emphasizes depth and clarity.

The visual style combines **Corporate Modern** efficiency with **Glassmorphism** for navigational overlays. The emotional response should be one of reliability and excitement—achieved through high-contrast typography, generous whitespace, and vivid imagery.

## Colors
The palette is dominated by a high-chroma **Vibrant Red**, used strategically for primary actions and brand signals to stimulate appetite and urgency. 

- **Primary Red (#E23744):** Used for CTA buttons, price highlights, and active states.
- **Surface/Neutral:** Pure white is used for the base layer, while the secondary off-white (#F8F8F8) provides soft containment for background sections and card groupings.
- **Deep Black (#1C1C1C):** Reserved for high-contrast headings and primary text to ensure maximum readability.
- **Success Green (#2D884D):** Specifically for ratings, availability, and "order completed" statuses.

## Typography
This design system utilizes **Plus Jakarta Sans** for headings to introduce a friendly, slightly rounded geometric feel that softens the high-energy red. **Inter** is used for all functional body text and interface labels to maintain a clean, systematic look.

Headlines should use tight letter-spacing to feel "packed" and impactful. Use `display-lg` for hero marketing sections and `headline-md` for restaurant titles. `body-sm` is the workhorse for ingredient lists and descriptions.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for vertical scrolling. 

- **Mobile:** 4-column grid with 20px outside margins.
- **Desktop:** 12-column centered grid with a max-width of 1200px.
- **Rhythm:** An 8px linear scale drives all padding and margins. Use `md` (24px) for vertical separation between distinct restaurant cards and `sm` (16px) for internal card padding. 

Horizontal scrolling "carousels" should be used for categories (Cuisines) to maintain a compact vertical footprint.

## Elevation & Depth
The "Floating UI" concept is realized through a layered elevation strategy:

1.  **Level 0 (Base):** Pure white background.
2.  **Level 1 (Cards):** Subsurface cards use a very soft, diffused shadow (0px 10px 30px rgba(0,0,0,0.05)) to appear lifted off the page.
3.  **Level 2 (Navigation):** Bottom navigation bars and top search bars use a **Glassmorphic** effect (Backdrop Blur: 20px, 80% Opacity White) to provide context of the content underneath.
4.  **Level 3 (Interactive):** Floating Action Buttons (FABs) and active "Add" buttons use a more pronounced shadow with a hint of the primary red tint to signify high interactivity.

## Shapes
The design system leans into a high-radius aesthetic to feel approachable and modern. 

- **Containers & Cards:** Use a generous 24px radius (`rounded-xl`) to create the "pill-container" look common in high-end mobile apps.
- **Buttons:** Use a 12px radius for a balanced, clickable feel.
- **Images:** Food photography must always be clipped with a 16px radius to avoid harsh corners that conflict with the soft UI.
- **Search Bars:** Should be fully rounded (pill-shaped) to distinguish them from content cards.

## Components

- **Buttons:** 
  - *Primary:* Solid Primary Red with white text, 12px radius, heavy weight.
  - *Secondary:* Ghost style with a 1px Grey-200 border or soft grey background.
- **Cards:** 
  - White background, 24px radius, soft ambient shadow. Images should take up the top 60% of the card area.
- **Chips:** 
  - Small, pill-shaped tags for "Fast Delivery" or "Free Dish." Use Primary Red for brand promos and Success Green for ratings.
- **Search Bar:** 
  - Sticky at the top, pill-shaped, glassmorphic background blur, with a muted grey placeholder and a primary red search icon.
- **Floating Action Button (FAB):** 
  - Circular or "Capsule" shaped, positioned bottom-center or bottom-right, using the Primary Red to indicate "View Cart" or "Filter."
- **Inputs:** 
  - Clean, 12px rounded corners, 1px light grey border that turns Primary Red on focus. Labels should use `label-sm`.
- **Lists:**
  - Borderless with subtle divider lines (#F8F8F8) or clear vertical spacing (16px) between items.