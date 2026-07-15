# Zomato Frontend — Production-Ready React Architecture

Transform the Stitch UI into a fully modular, production-ready React + Vite + Tailwind CSS + Framer Motion frontend, branded as **Zomato**.

---

## Summary

The Stitch design uses a **premium floating glassmorphism aesthetic** with:
- **Primary red**: `#b7122a` (Zomato red — coincides exactly)
- **Font stack**: Inter + Plus Jakarta Sans
- **Glass pills** for the navbar (floating rounded pill, 90% width, `backdrop-blur-xl`)
- **Floating cards** with `hover:-translate-y-2` and `shadow-[0_10px_30px_rgba(0,0,0,0.05)]`
- **Circular food images** for categories
- **Cinematic hero section** with parallax floating food images

The project already has React 19, Tailwind CSS v4, Framer Motion, Lucide React, and React Router DOM installed.

> [!IMPORTANT]
> Tailwind CSS v4 is installed (`@tailwindcss/vite` + `tailwindcss@4`). This version uses a **CSS-first config** (no `tailwind.config.js`). Theme tokens are defined via `@theme` in CSS. The Stitch HTML uses Tailwind CDN v3 custom config — we must re-implement the custom color/spacing tokens in the CSS `@theme` block.

> [!IMPORTANT]
> The vite.config.js does NOT include the Tailwind Vite plugin yet. We must add `tailwindcss()` from `@tailwindcss/vite`.

---

## Proposed Changes

### Foundation

#### [MODIFY] [vite.config.js](file:///c:/Users/USER/Documents/Project/ZomatoDummy/vite.config.js)
- Add `import tailwindcss from '@tailwindcss/vite'` and include in plugins array.

#### [MODIFY] [src/index.css](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/index.css)
- Replace entirely with Zomato design system tokens in `@import "tailwindcss"` + `@theme { }`.
- Define all Stitch color tokens (primary `#b7122a`, surface, on-surface-variant, outline-variant, etc.) as CSS variables.
- Add Google Fonts import (Inter + Plus Jakarta Sans).
- Add utility classes: `.glass-pill`, `.glass-card`, `.hide-scrollbar`, `.hover-lift`, `.animate-fade-in-up`.

---

### Routing

#### [NEW] [src/routes/AppRoutes.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/routes/AppRoutes.jsx)
- `BrowserRouter` + `Routes` with all 12 routes.
- Wraps everything in `MainLayout`.

#### [MODIFY] [src/App.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/App.jsx)
- Simply renders `<AppRoutes />`.

---

### Layout

#### [NEW] [src/layouts/MainLayout.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/layouts/MainLayout.jsx)
- Renders `<Navbar />`, `<Outlet />`, `<Footer />`.
- Page transition wrapper with Framer Motion `AnimatePresence`.

---

### Context (State Management)

#### [NEW] [src/context/CartContext.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/context/CartContext.jsx)
- `useReducer` with actions: `ADD_ITEM`, `REMOVE_ITEM`, `INCREMENT`, `DECREMENT`, `CLEAR_CART`.
- Computed: `subtotal`, `deliveryFee`, `total`, `itemCount`.

#### [NEW] [src/context/AuthContext.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/context/AuthContext.jsx)
- `useState` for `user`, `isAuthenticated`.
- Placeholder `login()`, `logout()`, `signup()`.

#### [NEW] [src/context/ThemeContext.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/context/ThemeContext.jsx)
- Light/dark toggle (future use).

---

### Services

#### [NEW] [src/services/api.js](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/services/api.js)
- Placeholder async functions: `getRestaurants()`, `getRestaurant(id)`, `searchRestaurants(query)`, `login(creds)`, `signup(data)`, `getCategories()`, `getCollections()`, `getOffers()`.
- Uses `axios`-style pattern with a base URL constant — ready for backend swap.

---

### Constants

#### [NEW] [src/constants/index.js](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/constants/index.js)
- `MOCK_RESTAURANTS`, `MOCK_CATEGORIES`, `MOCK_COLLECTIONS`, `MOCK_OFFERS`, `MOCK_REVIEWS`, `NAV_LINKS`.

---

### Hooks

#### [NEW] [src/hooks/useCart.js](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/hooks/useCart.js)
- Convenience hook wrapping `useContext(CartContext)`.

#### [NEW] [src/hooks/useAuth.js](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/hooks/useAuth.js)
- Convenience hook wrapping `useContext(AuthContext)`.

#### [NEW] [src/hooks/useScrollDirection.js](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/hooks/useScrollDirection.js)
- Detects scroll direction for navbar hide/show.

---

### Reusable Components

#### [MODIFY] [src/components/Navbar/Navbar.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/Navbar/Navbar.jsx)
- Floating glass pill navbar from `premium_quickbite_home` design.
- Branding: **Zomato** (with a fork/flame lucide icon).
- Links: Browse, Offers, Support.
- Right: Location pin, Cart (with badge from CartContext), Login, Signup buttons.
- Mobile: hamburger menu with slide-down panel.
- Framer Motion: fade-in on mount, shadow intensification on scroll.

#### [NEW] [src/components/SearchBar/SearchBar.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/SearchBar/SearchBar.jsx)
- Pill-shaped glass search bar (matches Stitch floating search).
- Props: `onSearch`, `placeholder`.
- Lucide `Search` + `Mic` icons.
- Framer Motion focus ring animation.

#### [NEW] [src/components/RestaurantCard/RestaurantCard.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/RestaurantCard/RestaurantCard.jsx)
- Props: `image`, `name`, `rating`, `deliveryTime`, `price`, `cuisine`, `offer`, `distance`, `id`.
- Hover lift + image scale-110 on hover.
- Favorite button (glassmorphic circle, top-right).
- Offer badge (bottom-left on image).
- Rating chip (green, top-right with star icon).

#### [NEW] [src/components/CategoryChip/CategoryChip.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/CategoryChip/CategoryChip.jsx)
- Circular image + label below.
- Props: `image`, `name`, `onClick`.
- Framer Motion scale on click.

#### [NEW] [src/components/CollectionCard/CollectionCard.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/CollectionCard/CollectionCard.jsx)
- Tall portrait image card with gradient overlay text at bottom.
- Props: `image`, `title`, `count`.

#### [NEW] [src/components/OfferCard/OfferCard.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/OfferCard/OfferCard.jsx)
- Gradient card with offer percentage + description.

#### [NEW] [src/components/ReviewCard/ReviewCard.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/ReviewCard/ReviewCard.jsx)
- White rounded card with star rating, quote, avatar, name, role.

#### [NEW] [src/components/Button/Button.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/Button/Button.jsx)
- Props: `variant` (primary/secondary/ghost/danger), `size`, `onClick`, `children`, `icon`, `loading`.

#### [NEW] [src/components/Input/Input.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/Input/Input.jsx)
- Controlled input with label, error state, icon support.

#### [NEW] [src/components/Modal/Modal.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/Modal/Modal.jsx)
- Framer Motion overlay + slide-up panel.

#### [NEW] [src/components/Loader/Loader.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/Loader/Loader.jsx)
- Spinning ring in Zomato red + optional skeleton card loader.

#### [NEW] [src/components/Footer/Footer.jsx](file:///c:/Users/USER/Documents/Project/ZomatoDummy/src/components/Footer/Footer.jsx)
- 4-column footer (Zomato branding, Company, Support, Get the App).
- App Store / Play Store buttons.

---

### Sections (Home Page Sections)

#### [NEW] src/sections/Hero/Hero.jsx
- Full viewport hero from `premium_quickbite_home`.
- Floating circular food images (parallax via Framer Motion `useMotionValue`).
- Badge: "✨ Fastest Delivery in the City".
- Giant headline: "Urban Gastronomy, **Delivered.**"
- Integrated `<SearchBar />` with location pill.
- Social proof: stacked avatars + "50,000+ happy diners".

#### [NEW] src/sections/Categories/Categories.jsx
- Horizontal scroll carousel of `<CategoryChip />` items.
- Prev/Next arrow buttons.
- Framer Motion scroll reveal on entry.

#### [NEW] src/sections/PopularRestaurants/PopularRestaurants.jsx
- Grid of `<RestaurantCard />` (3 columns desktop, 2 tablet, 1 mobile).
- "View All" link → `/search`.

#### [NEW] src/sections/TrendingRestaurants/TrendingRestaurants.jsx
- Similar grid but with "Trending" badge overlay.

#### [NEW] src/sections/Collections/Collections.jsx
- 4-column portrait grid of `<CollectionCard />`.

#### [NEW] src/sections/Offers/Offers.jsx
- Horizontal scroll of `<OfferCard />`.

#### [NEW] src/sections/Reviews/Reviews.jsx
- 3-column testimonial grid of `<ReviewCard />`.

#### [NEW] src/sections/DownloadApp/DownloadApp.jsx
- Gradient banner section with App Store / Play Store buttons.

#### [NEW] src/sections/BecomePartner/BecomePartner.jsx
- Promotional banner for restaurant partners.

#### [NEW] src/sections/FAQ/FAQ.jsx
- Accordion-style FAQ.

#### [NEW] src/sections/Newsletter/Newsletter.jsx
- Email capture with input + subscribe button.

---

### Pages

#### [NEW] src/pages/Home/Home.jsx
- Assembles all sections in order: Hero → Categories → PopularRestaurants → Collections → Offers → TrendingRestaurants → Reviews → DownloadApp → BecomePartner → FAQ → Newsletter.
- Page fade-in animation.

#### [NEW] src/pages/RestaurantDetails/RestaurantDetails.jsx
- Based on `restaurant_details` Stitch design.
- Cinematic hero image (614px tall) + floating restaurant info card at bottom.
- Tab navigation: Overview / Menu / Reviews / Photos / About.
- Menu item grid (2-col) with "Add to Cart" integration.
- Sticky cart sidebar (right) on desktop.

#### [NEW] src/pages/SearchResults/SearchResults.jsx
- Filter chips (Sort, Rating, Fast Delivery, Offers).
- Restaurant grid.
- URL param-driven search.

#### [NEW] src/pages/Collections/CollectionsPage.jsx
- Full page of collection cards.

#### [NEW] src/pages/Offers/OffersPage.jsx
- Full page of offer cards.

#### [NEW] src/pages/Profile/Profile.jsx
- User avatar, name, stats (orders, wishlist, reviews).
- Navigation tiles for Orders, Wishlist, Settings.

#### [NEW] src/pages/Orders/Orders.jsx
- Order list with status chips and re-order button.

#### [NEW] src/pages/Wishlist/Wishlist.jsx
- Grid of wishlisted restaurants.

#### [NEW] src/pages/Cart/Cart.jsx
- Based on `cart_checkout` Stitch design.
- Cart items with quantity controls.
- Promo code input.
- Order summary sidebar.

#### [NEW] src/pages/Checkout/Checkout.jsx
- Progress stepper (Cart → Address → Payment).
- Address selection cards.
- Summary panel with "Place Order" CTA.

#### [NEW] src/pages/Login/Login.jsx
- Glassmorphic centered card.
- Email + Password inputs.
- "Continue with Google" social button.
- Link to Signup.

#### [NEW] src/pages/Signup/Signup.jsx
- Name, Email, Password, Phone inputs.
- Form validation.

#### [NEW] src/pages/NotFound/NotFound.jsx
- 404 page with animation and "Go Home" button.

---

## Tailwind v4 Notes

> [!WARNING]
> Tailwind CSS v4 does **not** use `tailwind.config.js`. All theme customization goes in `index.css` under `@theme { }`. The `@tailwindcss/vite` plugin must be added to `vite.config.js`. Custom color names with hyphens (e.g., `on-surface`) need to be defined as `--color-on-surface` in `@theme`.

---

## Verification Plan

### Build Check
```bash
npm run dev
```
- App should run on localhost with no console errors.

### Manual Verification
1. Home page renders with all sections visible.
2. Navbar is a floating glass pill, sticks on scroll, collapses to hamburger on mobile.
3. Restaurant card hover lifts and image scales.
4. Cart context: add item from RestaurantDetails → badge increments in Navbar → Cart page shows item.
5. All routes are accessible without 404 (except `/bad-path` which shows NotFound).
6. Responsive: test at 375px, 768px, 1280px.

### Open Questions for User Review

> [!IMPORTANT]
> **Mock data vs. live data**: All data in constants uses the Stitch placeholder images (Google AIDA CDN URLs). These are from the Stitch-generated HTML and will work for demo but are not permanent. Do you want me to use local generated images instead, or keep these CDN URLs for now?

> [!IMPORTANT]
> **Tailwind v4 custom colors**: Tailwind v4 uses `--color-*` CSS variable naming. The Stitch designs use class names like `text-on-surface-variant`, `bg-surface-container-low`, etc. These will be mapped to `@theme` CSS variables. **Confirm**: should I keep this exact naming or simplify to standard Tailwind color names?

> [!NOTE]
> **`index.html`**: The current `index.html` does NOT link Google Fonts. I'll add the `<link>` tags for Inter and Plus Jakarta Sans there.
