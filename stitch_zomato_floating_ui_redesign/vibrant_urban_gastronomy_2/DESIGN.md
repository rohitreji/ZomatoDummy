---
name: Vibrant Urban Gastronomy
colors:
  surface: '#f6faff'
  surface-dim: '#d2dbe4'
  surface-bright: '#f6faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf5fe'
  surface-container: '#e6eff8'
  surface-container-high: '#e0e9f2'
  surface-container-highest: '#dbe4ed'
  on-surface: '#141d23'
  on-surface-variant: '#5b403f'
  inverse-surface: '#293138'
  inverse-on-surface: '#e9f2fb'
  outline: '#8f6f6e'
  outline-variant: '#e4bebc'
  surface-tint: '#bb162c'
  primary: '#b7122a'
  on-primary: '#ffffff'
  primary-container: '#db313f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b1'
  secondary: '#5d5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e5'
  on-secondary-container: '#636467'
  tertiary: '#5a5c5d'
  on-tertiary: '#ffffff'
  tertiary-container: '#737576'
  on-tertiary-container: '#fcfdfe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#e2e2e5'
  secondary-fixed-dim: '#c6c6c9'
  on-secondary-fixed: '#1a1c1e'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f6faff'
  on-background: '#141d23'
  surface-variant: '#dbe4ed'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 8px
  container-max-width: 1280px
  gutter: 24px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The brand personality is high-energy, confident, and sophisticated, capturing the pulse of metropolitan dining. It targets urban professionals who value both speed and culinary quality. 

The design style is **Corporate / Modern** with a lean toward **Minimalism**, ensuring the interface remains a clean canvas for high-fidelity food photography. By utilizing generous whitespace and a bold primary accent, the UI evokes an emotional response of excitement and reliability. The aesthetic is polished and systematic, prioritizing functional clarity without sacrificing the "crave-ability" of the content.

## Colors

The palette is anchored by a vibrant, high-chroma primary red (`#E23744`), used strategically for calls to action, price points, and brand signifiers to stimulate appetite and urgency. 

- **Primary:** Urban Red (#E23744) for interactive elements and highlights.
- **Secondary:** Deep Obsidian (#1A1C1E) for high-contrast typography and iconography.
- **Neutral Surface:** A series of cool grays used for backgrounds and subtle borders to maintain a clean, professional environment.
- **Color Mode:** Optimized for a "Light" default to reflect cleanliness and daylight freshness, essential for food-related platforms.

## Typography

This design system leverages **Plus Jakarta Sans** across all levels to maintain a contemporary, friendly, and geometric feel. 

For the desktop experience, the scale is intentionally generous. **Display** levels use heavy weights and tight tracking for high-impact marketing sections. **Headlines** are used for restaurant names and category headers, providing a clear information hierarchy. **Body** text is optimized for readability, utilizing a slightly larger 18px size for primary descriptions to reduce eye strain on large monitors.

## Layout & Spacing

The layout utilizes a **Fixed Grid** model for desktop, centered within the viewport with a maximum width of 1280px to prevent excessive line lengths and maintain visual density.

- **Grid:** A 12-column system with 24px gutters. 
- **Margins:** 48px outer margins provide a breathable frame on standard laptop screens.
- **Rhythm:** An 8px linear scale governs all padding and margins. Vertical rhythm is enforced through "Section Gaps" of 80px to clearly separate distinct content areas (e.g., "Trending Now" vs "Cuisines").
- **Adaptation:** On desktop, sidebars for filters and cart summaries remain persistent or anchored to the right, utilizing the expanded horizontal real estate.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Ambient Shadows**. 

- **Surface Tiers:** The base background is white. Secondary containers (like cards or sidebars) use a subtle Off-White (#F8F9FA) to create soft separation.
- **Shadows:** Elements like restaurant cards and floating action buttons use "Soft Glow" shadows—low opacity (4-8%), large blur (20px+), and a tiny hint of the primary red in the shadow tint to maintain brand warmth.
- **Interactions:** On hover, cards should lift slightly (translate -4px Y) and the shadow should deepen, providing tactile feedback to the user.

## Shapes

The shape language is defined by **Rounded** corners (0.5rem / 8px), striking a balance between professional structure and approachable softness.

- **Standard Elements:** Buttons, input fields, and small thumbnails use the base 8px radius.
- **Large Containers:** Restaurant cards and promotional banners use `rounded-lg` (16px) to appear friendlier and more substantial on large displays.
- **Search Bars:** Utilize `rounded-xl` (24px) or full pill-shape to distinguish them as high-priority navigation tools.

## Components

- **Buttons:** Primary buttons are solid #E23744 with white text, utilizing a bold weight. Secondary buttons use a thick 2px outline of the primary color. On desktop, buttons have a minimum width of 160px for better Fitts's Law compliance.
- **Cards:** Restaurant cards are the hero component. They feature a full-bleed image at the top, followed by a 16px padded content area. Information density is high, including rating chips and delivery time labels.
- **Chips:** Used for categories (e.g., "Sushi", "Vegan"). These are pill-shaped with a light gray background that transitions to the primary red on click/selection.
- **Input Fields:** Search bars and form inputs feature a 1px border (#DEE2E6) that thickens and changes to primary red on focus.
- **Persistent Cart:** A desktop-specific sidebar component that remains fixed during the browsing experience, using a subtle shadow to appear elevated above the main content grid.