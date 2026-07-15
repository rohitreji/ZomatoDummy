---
name: Vibrant Urban Gastronomy
colors:
  surface: '#fff8f6'
  surface-dim: '#e1d8d6'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2f0'
  surface-container: '#f5ecea'
  surface-container-high: '#efe6e4'
  surface-container-highest: '#e9e1df'
  on-surface: '#1e1b1a'
  on-surface-variant: '#5b403f'
  inverse-surface: '#342f2e'
  inverse-on-surface: '#f8efed'
  outline: '#8f6f6e'
  outline-variant: '#e4bebc'
  surface-tint: '#bb162c'
  primary: '#b7122a'
  on-primary: '#ffffff'
  primary-container: '#db313f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b1'
  secondary: '#9f4122'
  on-secondary: '#ffffff'
  secondary-container: '#fd8863'
  on-secondary-container: '#722104'
  tertiary: '#785600'
  on-tertiary: '#ffffff'
  tertiary-container: '#976d00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59e'
  on-secondary-fixed: '#3a0b00'
  on-secondary-fixed-variant: '#7f2a0d'
  tertiary-fixed: '#ffdea4'
  tertiary-fixed-dim: '#f4be4e'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4200'
  background: '#fff8f6'
  on-background: '#1e1b1a'
  surface-variant: '#e9e1df'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style

The design system embodies a premium, modern approach to urban dining, blending the energy of high-end street food with the sophistication of fine bistro culture. The aesthetic centers on "Warm Minimalism"—utilizing expansive whitespace, tactile depth, and a vibrant primary palette to evoke an emotional response of appetite, excitement, and culinary trust.

The design style is a hybrid of **Modern Corporate** precision and **Glassmorphism**. It utilizes soft, multi-layered shadows to create a sense of physical layering, while translucent glass elements provide a lightweight, airy feel that prevents the rich color palette from feeling heavy. The target audience is the discerning urban epicurean who values both speed and quality.

## Colors

The palette is anchored by a warm, off-white background that mimics the organic texture of high-quality menu paper. 

- **Primary (#E23744):** A sophisticated deep red used for high-intent actions, branding, and critical highlights.
- **Accent Palette:** Soft coral (#FF8A65) and sun-drenched amber (#FFC857) provide warmth and visual variety for secondary cues, while a crisp emerald (#22C55E) handles success states and freshness indicators.
- **Neutral:** A deep, warm charcoal (#2D2928) is used for typography to maintain high contrast against the off-white base while avoiding the harshness of pure black.

## Typography

This design system relies exclusively on **Inter** to achieve a clean, systematic, and highly legible interface. The typographic hierarchy uses tight tracking on larger display heads to create a premium editorial feel, while body copy maintains standard tracking for maximum accessibility.

- **Scale:** Use `display-lg` for hero sections, scaling down to `display-lg-mobile` on smaller viewports.
- **Emphasis:** Bold weights (700) are reserved for brand moments; semi-bold (600) is the standard for headlines and primary labels to maintain an authoritative but approachable voice.

## Layout & Spacing

The layout is built on a rigorous **8px grid system**. This ensures mathematical harmony across all components and screen sizes.

- **Desktop:** 12-column fluid grid with 24px gutters and 48px side margins.
- **Tablet:** 8-column fluid grid with 16px gutters and 32px side margins.
- **Mobile:** 4-column fluid grid with 16px gutters and 24px side margins.

Spacing should favor the larger end of the scale (`lg` and `xl`) to create the "Urban Gastronomy" sense of luxury and breathing room.

## Elevation & Depth

Depth is conveyed through a combination of **Ambient Shadows** and **Glassmorphism**. 

1.  **The Base:** Surfaces sit on the warm background with no shadow or a very faint 2px stroke in a darker tint of the background color.
2.  **Elevated Cards:** Use multi-layered shadows—a sharp 4px blur for definition and a soft 24px blur for "lift." Shadows should be slightly tinted with the Primary color at 5% opacity to maintain warmth.
3.  **Glass Layers:** Floating elements (badges, navigation bars) use a `backdrop-filter: blur(12px)` with a semi-transparent white fill (70% opacity) and a thin 1px white border to simulate light hitting the edge of glass.

## Shapes

The shape language is defined by **large, soft roundedness**. All primary containers and cards utilize a radius of 16px to 20px (represented by `rounded-lg` and `rounded-xl` in the token scale). This softness offsets the technical precision of the Inter typeface, making the UI feel inviting and tactile. 

Small elements like buttons and input fields should strictly follow the `rounded-md` (8px) or `rounded-full` (pill) patterns.

## Components

- **Buttons:** Primary buttons are pill-shaped, using the Primary color with white text. Secondary buttons use a glass effect with a Primary color border.
- **Cards:** Elevated with a 16px corner radius. On hover, cards should "lift" by increasing shadow depth and scaling by 1.02x.
- **Floating Pill Navigation:** The main navigation should be a centered, floating pill with a glassmorphic background and subtle internal padding.
- **Rating Badges:** Use a glass effect (`blur(8px)`) with white text and a small icon, placed in the top-right corner of image containers.
- **Input Fields:** Use a subtle inset shadow to create a "pressed" feel into the warm background, with a 2px Primary color border appearing only on focus.
- **Chips/Tags:** Used for food categories; these should have a 10% opacity fill of their respective accent color (e.g., Green for "Vegetarian") with high-contrast text.