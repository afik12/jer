# Gemini Sync Log — Jersey Locker Room Platform

This document is the **single source of truth** for all changes, file creations, and architectural decisions made during the development of this project. It is intended for review by another AI or developer to understand the complete evolution of the codebase.

---

## Log Entries

### [INITIAL] Project Vision & Scope
- **Date/Context:** Project kickoff
- **Decision:** Build a premium, immersive web app for buying/selling/exploring soccer jerseys with:
  - **"The Locker Room"** UI — digital locker room / museum exhibition feel (no standard e-commerce grid).
  - **Era & Storytelling** — each jersey has narrative context (e.g., "The Treble Season", "The Golden Era").
  - **Dynamic Theming** — UI palette and background adapt to the jersey being viewed (e.g., Barcelona → Blaugrana, Man City → Sky Blue).
  - **Interactive Discovery** — unconventional navigation, timeline slider by decade, touch-friendly gestures for future native app.
- **Constraint:** Architecture must be **strictly Mobile-First** and tech stack must facilitate future conversion to native mobile (e.g., React Native).

---

### [ARCHITECTURE] Tech Stack Selection
- **Decision:** Use the following stack to maximize future React Native conversion and mobile-first UX:
  - **Framework:** Next.js 14+ (App Router) — SSR, API routes, file-based routing; business logic and data fetching patterns reusable in RN.
  - **Language:** TypeScript — shared types and interfaces between web and future RN app.
  - **Styling:** Tailwind CSS — utility-first; design tokens and spacing can be mirrored in RN (e.g., NativeWind or shared theme constants).
  - **Animations:** Framer Motion — touch-friendly, with conceptual parity to React Native Reanimated for future app.
  - **State:** React Context + hooks first; optional Zustand later for complex state — both portable to RN.
- **Rationale:** React-centric stack ensures component logic, hooks, and API contracts can be reused; only view-layer (DOM vs. RN components) needs swapping during app conversion.

---

### [ARCHITECTURE] Mobile-First & Future RN Conversion Strategy
- **Decisions:**
  - All layout and interaction design prioritize touch targets, swipe gestures, and viewport-first (mobile breakpoint as default).
  - Business logic, API client, and data models live in framework-agnostic modules (e.g., `lib/`, `types/`, `hooks/`) so they can be imported into a future React Native app with minimal changes.
  - UI components will be structured so that a future RN version can swap `<div>`/CSS for `<View>`/StyleSheet (or NativeWind) without changing props or state flow.
- **Logged:** No code yet; this is the architectural guideline for all subsequent work.

---

### [FILE] `gemini_sync_log.md` created
- **Path:** `c:\Users\menah\OneDrive\Documenti\jer\gemini_sync_log.md`
- **Action:** Created.
- **Purpose:** Changelog and decision log for the entire project; must be updated for every change, file creation, or architectural decision.

---

### [PLANNING] First Interactive UI Component
- **Component:** **Decade Timeline Slider** (interactive discovery).
- **Description:** A horizontal, touch-friendly timeline that lets users explore retro jerseys by decade (e.g., 70s, 80s, 90s, 00s, 10s, 20s). Smooth scrolling/snapping, optional parallax or gradient shifts per era, and clear visual feedback for the selected decade.
- **Why first:** It establishes the "unconventional navigation" and touch-first interaction model, and will drive the data shape for "era" and "story" attached to jerseys. Building it first sets the tone for the rest of the Locker Room experience.
- **Status:** Planned; project initialization next, then this component will be implemented.

---

---

### [FILE] `package.json` created
- **Path:** `package.json`
- **Action:** Created.
- **Contents (summary):** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion. Scripts: `dev` (with Turbopack), `build`, `start`, `lint`.
- **Rationale:** Framer Motion chosen for touch-friendly animations with future RN Reanimated parity in mind.

---

### [FILE] `tsconfig.json` created
- **Path:** `tsconfig.json`
- **Action:** Created.
- **Contents (summary):** Standard Next.js TypeScript config with path alias `@/*` for project root.

---

### [FILE] `next.config.mjs` created
- **Path:** `next.config.mjs`
- **Action:** Created.
- **Contents (summary):** Minimal Next config with `reactStrictMode: true`.

---

### [FILE] `postcss.config.mjs` created
- **Path:** `postcss.config.mjs`
- **Action:** Created.
- **Contents (summary):** PostCSS with Tailwind and Autoprefixer.

---

### [FILE] `tailwind.config.ts` created
- **Path:** `tailwind.config.ts`
- **Action:** Created.
- **Contents (summary):** Tailwind 3 config; content paths for `pages/`, `components/`, `app/`. Extended theme: `locker` color tokens (dark, panel, border, muted) for base UI; `fontFamily` placeholders for display/body (CSS vars to be set in layout).
- **Rationale:** Central design tokens to support dynamic theming (jersey-based palettes) and consistent Locker Room look.

---

### [FILE] `next-env.d.ts` created
- **Path:** `next-env.d.ts`
- **Action:** Created.
- **Contents (summary):** Next.js TypeScript references (auto-generated).

---

### [FILE] `app/globals.css` created
- **Path:** `app/globals.css`
- **Action:** Created.
- **Contents (summary):** Tailwind directives; CSS variables for `--background`, `--foreground`, `--locker-panel`, `--locker-border`; body styles; `-webkit-tap-highlight-color: transparent` and touch-action for touch-friendly UX (mobile-first).

---

### [FILE] `app/layout.tsx` created
- **Path:** `app/layout.tsx`
- **Action:** Created.
- **Contents (summary):** Root layout with metadata (title, description), HTML lang, body with min-height and CSS variable-based background/foreground.

---

### [FILE] `app/page.tsx` created
- **Path:** `app/page.tsx`
- **Action:** Created.
- **Contents (summary):** Placeholder home page with title and short description; will be replaced by Locker Room experience.

---

### [FILE] `.eslintrc.json` created
- **Path:** `.eslintrc.json`
- **Action:** Created.
- **Contents (summary):** Extends `next/core-web-vitals`.

---

### [FILE] `.gitignore` created
- **Path:** `.gitignore`
- **Action:** Created.
- **Contents (summary):** Standard Next.js/Node ignore (node_modules, .next, env, etc.).

---

### [FILE] `types/jersey.ts` created
- **Path:** `types/jersey.ts`
- **Action:** Created.
- **Contents (summary):** Shared TypeScript types: `DecadeId`, `Decade`, `JerseyTheme`, `Jersey`. Used by timeline, theme context, and future jersey data. Kept in `types/` for reuse in React Native app.

---

### [FILE] `lib/constants.ts` created
- **Path:** `lib/constants.ts`
- **Action:** Created.
- **Contents (summary):** `DECADES` array with id, label, startYear, endYear, and optional `accent` color per decade (70s–20s). Used by Decade Timeline Slider.

---

### [ARCHITECTURE] Theme context for dynamic theming
- **Decision:** Theme state lives in React Context (`ThemeContext`) so that when a jersey is viewed, we can call `setTheme(jersey.theme)` and drive CSS variables or inline styles for the Locker Room UI. Default theme is neutral (zinc/gray). Not yet applied to layout; will be used when jersey detail view exists.

---

### [FILE] `contexts/ThemeContext.tsx` created
- **Path:** `contexts/ThemeContext.tsx`
- **Action:** Created.
- **Contents (summary):** `ThemeProvider` and `useTheme()`; state: `theme: JerseyTheme | null`, `setTheme()`. Default theme with primary/secondary/bgStart/bgEnd for fallback.

---

### [FILE] `components/DecadeTimelineSlider.tsx` created
- **Path:** `components/DecadeTimelineSlider.tsx`
- **Action:** Created.
- **Contents (summary):** First interactive UI component. Horizontal, touch-friendly timeline of decades (70s–20s). Props: `selectedDecade`, `onDecadeChange`. Uses Framer Motion for drag (swipe) and tap; each decade is a button with min touch target, accent color when selected, aria-pressed/aria-label. Drag-end with velocity/offset to switch decade (swipe left/right). `cursor-grab` / `active:cursor-grabbing` for desktop; touch-friendly for mobile.

---

### [FILE] `app/page.tsx` updated
- **Path:** `app/page.tsx`
- **Action:** Replaced placeholder with full home experience.
- **Contents (summary):** Client component; state `selectedDecade` (default "90s"); wraps content in `ThemeProvider`; header "The Locker Room" + subtitle; `DecadeTimelineSlider` with `className="-mx-4 px-4"` for edge-to-edge feel; section showing selected decade. Prepares for locker room and jersey cards.

---

### [FILE] `tailwind.config.ts` updated
- **Path:** `tailwind.config.ts`
- **Action:** Extended theme.
- **Contents (summary):** Added `minHeight.touch` and `minWidth.touch` (44px) for touch-friendly targets.

---

### [ACTION] `npm install` executed
- **Command:** `npm install` in project root.
- **Result:** Success; dependencies installed (next, react, react-dom, framer-motion, dev deps for TypeScript, Tailwind, ESLint, etc.).

---

### [VERIFICATION] `npm run build` executed
- **Command:** `npm run build` in project root.
- **Result:** Success; Next.js 14.2.35 compiled and generated static pages for `/` and `/_not-found`.

---

---

### [FIX] Remove `--turbopack` from dev script
- **Path:** `package.json`
- **Action:** Changed `"dev": "next dev --turbopack"` to `"dev": "next dev"`.
- **Reason:** Next.js 14.2 does not support the `--turbopack` flag (Turbopack is stable in Next.js 15+); dev server was failing with "unknown option '--turbopack'".

---

## E-commerce storefront expansion

### [SCOPE] Full e-commerce requirements
- **Decision:** Implement a fully functional online store: product catalog, individual product pages, shopping cart, checkout flow. UI must be premium (large imagery, smooth scrolling, hover animations), with dynamic theming per jersey, cart as animated side-drawer, mobile-first.

---

### [FILE] `types/cart.ts` created
- **Path:** `types/cart.ts`
- **Action:** Created.
- **Contents (summary):** `CartLineItem` interface: `jersey: Jersey`, `quantity: number`. Shared for web and future RN app.

---

### [FILE] `contexts/CartContext.tsx` created
- **Path:** `contexts/CartContext.tsx`
- **Action:** Created.
- **Contents (summary):** `CartProvider` and `useCart()`. State: `items`, `isOpen`. Actions: `openCart`, `closeCart`, `toggleCart`, `addItem(jersey, quantity?)`, `removeItem(jerseyId)`, `updateQuantity(jerseyId, quantity)`. Computed: `totalItems`, `subtotal`. Cart is in-memory (no persistence yet).

---

### [FILE] `components/CartDrawer.tsx` created
- **Path:** `components/CartDrawer.tsx`
- **Action:** Created.
- **Contents (summary):** Animated side-drawer (slide from right) using Framer Motion `AnimatePresence` and `motion.aside`. Overlay closes on click; drawer shows line items with quantity +/- and Remove. Subtotal and "Checkout" link to `/checkout`. Body scroll locked when open. Accessible (dialog role, aria-label, focus).

---

### [FILE] `lib/mock-jerseys.ts` created
- **Path:** `lib/mock-jerseys.ts`
- **Action:** Created.
- **Contents (summary):** `MOCK_JERSEYS` array: 8 jerseys (Barcelona 08/09, Man City 21/22, Milan 88/89, Real 01/02, Juve 95/96, Liverpool 18/19, Ajax 94/95, Bayern 12/13). Each has id, title, club, era, story, theme (primary/secondary/bgStart/bgEnd), decade, price. Helpers: `getJerseyById(id)`, `getJerseysByDecade(decade)`.

---

### [FILE] `components/JerseyCard.tsx` created
- **Path:** `components/JerseyCard.tsx`
- **Action:** Created.
- **Contents (summary):** Premium product card: large aspect ratio (3/4), team-gradient background, era badge, price, title, club, story (line-clamp 2). Link to `/products/[id]`. Framer Motion entrance animation (opacity, y). Hover: image scale 105%, gradient overlay. No standard small grid photo; bold imagery as specified.

---

### [FILE] `components/JerseyShowcase.tsx` created
- **Path:** `components/JerseyShowcase.tsx`
- **Action:** Created.
- **Contents (summary):** Product list section. Props: `jerseys`, optional `filterDecade`. Filters by decade when provided. Renders responsive grid (1 col mobile, 2 sm, 3 lg) of `JerseyCard`. Empty state when no jerseys for decade.

---

### [FILE] `components/CartTrigger.tsx` created
- **Path:** `components/CartTrigger.tsx`
- **Action:** Created.
- **Contents (summary):** Button that calls `toggleCart()`. Shows cart icon and badge with `totalItems` when > 0. Used in header.

---

### [FILE] `components/Providers.tsx` created
- **Path:** `components/Providers.tsx`
- **Action:** Created.
- **Contents (summary):** Client wrapper: `ThemeProvider` → `CartProvider` → children + `CartDrawer`. Single place for app-wide providers and drawer mount.

---

### [FILE] `components/Header.tsx` created
- **Path:** `components/Header.tsx`
- **Action:** Created.
- **Contents (summary):** Sticky header with "The Locker Room" link (/) and `CartTrigger`. Border, backdrop blur, mobile-first.

---

### [FILE] `app/layout.tsx` updated
- **Path:** `app/layout.tsx`
- **Action:** Wrapped app with `Providers` and added `Header` above children. Cart and theme available on every page; header and cart drawer global.

---

### [FILE] `app/page.tsx` updated
- **Path:** `app/page.tsx`
- **Action:** Replaced with full storefront.
- **Contents (summary):** Home uses `MOCK_JERSEYS`, `DecadeTimelineSlider` (selected decade state), `JerseyShowcase` with filter by selected decade. Removed duplicate `ThemeProvider` (now in layout). Max-width container, responsive padding.

---

### [FILE] `app/products/[id]/page.tsx` created
- **Path:** `app/products/[id]/page.tsx`
- **Action:** Created.
- **Contents (summary):** Individual product page. Fetches jersey by id via `getJerseyById`. Dynamic theming: `setTheme(jersey.theme)` on mount, clear on unmount. Page background uses `jersey.theme.bgStart`/`bgEnd` gradient. Large product image (gradient placeholder), era badge, title, club, story, price, "Add to Locker" button. Add to cart opens cart drawer. Back link to home.

---

### [FILE] `app/checkout/page.tsx` created
- **Path:** `app/checkout/page.tsx`
- **Action:** Created.
- **Contents (summary):** Placeholder checkout page. Message that payment/shipping will be implemented later; link back to home.

---

### [VERIFICATION] Build after e-commerce storefront
- **Command:** `npm run build`
- **Result:** Success. Routes: `/` (static), `/checkout` (static), `/products/[id]` (dynamic).

---

## Fashion-brand aesthetic (Zara / Castro style)

### [SCOPE] Editorial lookbook redesign
- **Decision:** Redesign home and global UI to mimic modern fashion brands (Zara, Pull&Bear, Castro): full-bleed imagery, ultra-minimalist typography, elegant whitespace, lookbook feel. Core UI black, white, gray; dynamic accent only on hover (per-jersey theme). Cart remains side-drawer; mobile-first unchanged.

---

### [FILE] `components/LookbookBlock.tsx` created
- **Path:** `components/LookbookBlock.tsx`
- **Action:** Created. Full-bleed editorial block per jersey (min-h 85vh), jersey theme gradient, minimal caption bottom-left. Hover: scale 1.02 + box-shadow glow/border from `jersey.theme.primary`. Link to product page.

---

### [FILE] `components/LookbookHome.tsx` created
- **Path:** `components/LookbookHome.tsx`
- **Action:** Created. Hero (title + tagline, 60vh) then list of LookbookBlock; scroll-smooth; no grid.

---

### [FILE] `app/globals.css` updated
- **Path:** `app/globals.css`
- **Action:** Added `html { scroll-behavior: smooth }`, CSS vars `--editorial-bg`, `--editorial-text`, `--editorial-muted`.

---

### [FILE] `components/Header.tsx` updated
- **Path:** `components/Header.tsx`
- **Action:** Editorial header: black/90, border white/10, brand link uppercase tracking, minimal.

---

### [FILE] `components/CartTrigger.tsx` updated
- **Path:** `components/CartTrigger.tsx`
- **Action:** Minimal cart button: transparent, white/20 border, white badge; matches header.

---

### [FILE] `app/layout.tsx` updated
- **Path:** `app/layout.tsx`
- **Action:** Body `bg-black` for editorial dark theme.

---

### [FILE] `app/page.tsx` updated
- **Path:** `app/page.tsx`
- **Action:** Home renders only `LookbookHome`; removed timeline and grid showcase for lookbook-only flow.

---

## Usability & sticky navbar (fashion + seamless shopping)

### [SCOPE] Interactive nav, data file, spacious layout, filter/sort
- **Decision:** Add sticky navbar (transparent at top, solid on scroll), clear nav links (Home, Leagues, Retro, Search), cart icon; add `data.json` with 4–5 jerseys; keep fashion aesthetic with spacious layout; add filtering/sorting and micro-interactions (hover, Add to Cart animation) for seamless shopping.

---

### [FILE] `data.json` created
- **Path:** `data.json` (project root)
- **Action:** Created.
- **Contents (summary):** JSON array of 5 jerseys. Each item: id, title, club, league, era, decade, story, theme (primary, secondary, bgStart, bgEnd), imageUrl (placehold.co URLs), price. Used as dummy/reference data; app continues to use `lib/mock-jerseys.ts` for catalog.

---

### [FILE] `components/Navbar.tsx` created
- **Path:** `components/Navbar.tsx`
- **Action:** Created.
- **Contents (summary):** Sticky navbar (fixed, z-30). Scroll state: transparent at top (backgroundColor rgba 0), solid (black 0.94) when scrollY > 24px; border and backdrop-blur. Links: Home (/), Leagues (/#leagues), Retro (/#retro), Search (/#search). Cart via `CartTrigger`. Desktop: all links visible; mobile: hamburger toggles `AnimatePresence` dropdown with same links. Framer Motion for background/border transition.

---

### [FILE] `components/ProductCard.tsx` created
- **Path:** `components/ProductCard.tsx`
- **Action:** Created.
- **Contents (summary):** Product card with hover micro-interactions. Large aspect ratio image area (team gradient), hover scale 1.02; dynamic accent glow via box-shadow from `jersey.theme.primary`. Caption: club, title, price. “Add to Cart” button (visible on hover) calls `addItem` + `openCart`; shows “Added ✓” for 1.2s. Link to product page. Spacious padding.

---

### [FILE] `components/CatalogSection.tsx` created
- **Path:** `components/CatalogSection.tsx`
- **Action:** Created.
- **Contents (summary):** Catalog block with filter and sort. Props: jerseys, id, title, subtitle, optional defaultFilter. Filter: All | Retro (80s–90s). Sort: Price low–high, high–low, Name A–Z. Renders responsive grid of `ProductCard`. Accessible select labels (sr-only).

---

### [FILE] `components/LookbookHome.tsx` updated
- **Path:** `components/LookbookHome.tsx`
- **Action:** Updated.
- **Contents (summary):** Hero made more spacious (70vh min, larger padding). Added section id="leagues" with `CatalogSection` (Leagues); section id="retro" with `CatalogSection` defaultFilter="retro"; section id="search" with search input placeholder. Lookbook limited to first 4 jerseys for balance. Removed duplicate navbar spacer (layout provides pt-16).

---

### [FILE] `app/layout.tsx` updated
- **Path:** `app/layout.tsx`
- **Action:** Replaced `Header` with `Navbar`. Wrapped children in `<div className="min-h-screen pt-16">` so all pages sit below fixed navbar.

---

## League navigation & massive inventory (10–12 jerseys, mega-menu)

### [SCOPE] Leagues mega-menu, data by league, league pages, smart filters
- **Decision:** Organize site by football leagues. Navbar “Leagues” opens a mega-menu/drawer (Premier League, La Liga, Serie A, Rest of World, Retro). Expand data to 10–12 jerseys with explicit league; add league pages with unobtrusive filter (team, size, era) hidden until “Filter” is clicked. Keep fashion lookbook vibe and mobile-first.

---

### [FILE] `types/jersey.ts` updated
- **Path:** `types/jersey.ts`
- **Action:** Added required `league: string` to `Jersey`. Added optional `sizes?: string[]` for size filter.

---

### [FILE] `lib/leagues.ts` created
- **Path:** `lib/leagues.ts`
- **Action:** Created. `LEAGUES` array: Premier League, La Liga, Serie A, Rest of World, Retro (slug + label + optional description). `getLeagueBySlug(slug)`.

---

### [FILE] `lib/mock-jerseys.ts` updated
- **Path:** `lib/mock-jerseys.ts`
- **Action:** Expanded to 12 jerseys; added `league` and `sizes` to each. Leagues: La Liga (Barcelona, Real, Atlético), Premier League (Man City, Liverpool, Chelsea), Serie A (Milan, Juve, Inter), Rest of World (Bayern, Ajax, Dortmund). Added `getJerseysByLeagueSlug(slug)`: “retro” → decade 80s/90s; else filters by league label.

---

### [FILE] `data.json` updated
- **Path:** `data.json`
- **Action:** Expanded to 12 jerseys; each has `league`, `sizes` (S,M,L,XL). Same structure as mock-jerseys (La Liga, Premier League, Serie A, Rest of World). Placehold.co image URLs.

---

### [FILE] `components/LeaguesDropdown.tsx` created
- **Path:** `components/LeaguesDropdown.tsx`
- **Action:** Created. Desktop: hover/click “Leagues” opens full-width mega-menu (fixed below nav, max-w-7xl content), 5 league links in grid; click outside or mouse leave closes. Mobile: `inline` prop renders league list inside mobile menu; `onLeagueClick` closes menu. Links to `/leagues/[slug]`.

---

### [FILE] `components/Navbar.tsx` updated
- **Path:** `components/Navbar.tsx`
- **Action:** Replaced “Leagues” link with `LeaguesDropdown`. Desktop: Home, Leagues (dropdown), Retro, Search, Cart. Mobile: same links + inline `LeaguesDropdown` with league sub-links; `onLeagueClick` closes mobile menu.

---

### [FILE] `components/LeagueCatalog.tsx` created
- **Path:** `components/LeagueCatalog.tsx`
- **Action:** Created. League page content: title, description, “Filter” button (toggles panel). Filter panel (AnimatePresence): Team, Size, Era dropdowns; badge shows active filter count. Sort: Price asc/desc, Name A–Z. Product grid; empty state when no results. Keeps lookbook vibe with filters hidden until needed.

---

### [FILE] `app/leagues/[slug]/page.tsx` created
- **Path:** `app/leagues/[slug]/page.tsx`
- **Action:** Created. Fetches league by `getLeagueBySlug(slug)`, jerseys by `getJerseysByLeagueSlug(slug)`. Renders `LeagueCatalog` with league label/description. 404-style message if league not found.

---

## Premium E-commerce Grid (replace editorial lookbook)

### [SCOPE] Design change: full-bleed → premium grid + Top Teams
- **Decision:** Replace the editorial lookbook (massive full-screen blocks) with a **Premium E-commerce Grid** similar to Nike/Adidas. Rationale: full-bleed was too large and not practical for browsing many items; users need to see multiple products at once. Add **Top Teams** quick navigation (horizontal row of club pills) above the main grid; clicking filters the grid by that team. Keep premium feel: clean typography, whitespace, subtle theme-based hover effects.

---

### [FILE] `lib/top-teams.ts` created
- **Path:** `lib/top-teams.ts`
- **Action:** Created.
- **Contents (summary):** `TOP_TEAMS` array: Barcelona, Real Madrid, Man City, AC Milan, Liverpool, Juventus. Each has `id`, `label`, `clubName` (matches `Jersey.club` for filtering). Used by Top Teams section and supports data-driven quick nav.

---

### [FILE] `components/TopTeamsSection.tsx` created
- **Path:** `components/TopTeamsSection.tsx`
- **Action:** Created.
- **Contents (summary):** "Top Teams" section: horizontal scrollable row of pills (All + one per TOP_TEAMS). Selected state highlights pill (white bg); click toggles filter. Uses `selectedClub` and `onSelectClub(clubName | null)` to filter the home grid. Touch-friendly; scrollbar hidden via `.scrollbar-hide`. Framer Motion for tap feedback.

---

### [FILE] `app/globals.css` updated
- **Path:** `app/globals.css`
- **Action:** Added `.scrollbar-hide::-webkit-scrollbar { display: none }` for horizontal scroll in Top Teams.

---

### [FILE] `components/ProductCard.tsx` updated
- **Path:** `components/ProductCard.tsx`
- **Action:** Redesigned for premium grid: smaller, well-proportioned cards.
- **Changes:** Removed `min-h-[280px]` / `min-h-[320px]` so card height is driven only by aspect ratio (3/4), allowing multiple items per view. Reduced padding (p-4), smaller type (text-sm, line-clamp-2 on title). Hover: subtle **dynamic shadow** from `jersey.theme.primary` (inset border + soft outer shadow) instead of only glow; scale 1.03. Card container uses `rounded-xl` and default shadow; hover adds theme-colored shadow. Add to Cart button smaller (py-2, text-xs). Rationale: Nike/Adidas-style compact cards with theme-based hover accent.

---

### [FILE] `components/LookbookHome.tsx` updated
- **Path:** `components/LookbookHome.tsx`
- **Action:** Replaced editorial lookbook with premium grid layout.
- **Changes:** Removed all `LookbookBlock` usage (no more full-bleed sections). Hero shortened (min-h 40vh / 35vh). Added **Top Teams** above main grid via `TopTeamsSection`; state `selectedClub` filters `filteredJerseys`. Main content: **product grid** with `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`, gap-4/6/8, plenty of padding (py-10–16). Grid shows all jerseys or only selected team’s jerseys; empty state when none. Kept Leagues, Retro, Search sections below (CatalogSection + search input) for nav anchors. Rationale: single main grid for browsing; Top Teams for quick filter; no massive squares.

---

### [FILE] `data.json` updated
- **Path:** `data.json`
- **Action:** Added root-level `topTeams` array matching `lib/top-teams.ts` (id, label, clubName) so mock data explicitly supports Top Teams; app uses `lib/top-teams.ts` for the section.

---

### [NOTE] LookbookBlock no longer used on home
- **Path:** `components/LookbookBlock.tsx`
- **Action:** Unchanged; still present in codebase but no longer rendered on the home page. Can be removed in a future cleanup or reused on a dedicated “Editorial” page if desired.

---

### [VERIFICATION] Build after premium grid redesign
- **Command:** `npm run build`
- **Result:** Success. All routes compile; home page uses new grid and Top Teams.

---

## High-conversion pivot (jerseyniho-inspired, premium)

### [SCOPE] Layout and structural shift
- **Decision:** Pivot design to resemble high-conversion soccer jersey stores (reference: jerseyniho.com), but more premium and modern. Changes: (1) Top announcement bar with promo text; (2) Classic e-commerce navbar with Leagues, Retro, Kids, Mystery Box, prominent Search and Cart; (3) Hero promotional banner with CTA; (4) Category circles (Shopify-style) replacing Top Teams pills; (5) High-conversion product cards on light bg with visible Add to Cart; (6) Site-wide color palette shift to white/off-white so jerseys pop.

---

### [FILE] `components/AnnouncementBar.tsx` created
- **Path:** `components/AnnouncementBar.tsx`
- **Action:** Created.
- **Contents (summary):** Thin banner above navbar. Text: "Free Shipping Nationwide | Free Name & Number Printing". Scrolling marquee (animate-marquee) for motion; dark bg (gray-900), white text, border-b. Renders at very top of page.

---

### [FILE] `tailwind.config.ts` updated
- **Path:** `tailwind.config.ts`
- **Action:** Added `keyframes.marquee` (translateX 0 → -33.333%) and `animation.marquee` (20s linear infinite) for announcement bar marquee.

---

### [FILE] `lib/categories.ts` created
- **Path:** `lib/categories.ts`
- **Action:** Created.
- **Contents (summary):** `CATEGORIES` array for circular quick-nav: Premier League, La Liga, Serie A, Retro, Mystery Box, Kids. Each has id, label, href (/leagues/[slug] or /mystery-box, /kids), accent (hex for circle color). Supports CategoryCircles and future Mystery Box/Kids data.

---

### [FILE] `components/HeroBanner.tsx` created
- **Path:** `components/HeroBanner.tsx`
- **Action:** Created.
- **Contents (summary):** Classic e-commerce hero promo. "Mundial Collection" / "New Arrivals" headline, subtitle, CTA button "Shop Now" linking to #leagues. Dark gradient bg (gray-800/900) with subtle purple radial gradient; min-h 280–360px responsive. Replaces previous text-only hero.

---

### [FILE] `components/CategoryCircles.tsx` created
- **Path:** `components/CategoryCircles.tsx`
- **Action:** Created.
- **Contents (summary):** Row of circular category cards (Shopify-style). Uses CATEGORIES; each item is a circle (first letter or accent bg) + label. Links to /leagues/premier-league, /leagues/la-liga, /leagues/retro, /mystery-box, /kids. Horizontal scroll on mobile; flex-wrap on md. Replaces Top Teams pills on home.

---

### [FILE] `components/Navbar.tsx` updated
- **Path:** `components/Navbar.tsx`
- **Action:** Redesigned for classic e-commerce + light theme.
- **Changes:** Position `top-9` (below AnnouncementBar). Background white/98, border gray-200. Links: Home, Leagues (dropdown), Retro, Kids, Mystery Box. **Prominent Search bar** in nav (max-w-md, rounded-lg, gray-50 bg) on desktop; mobile menu includes search input at top. Cart trigger right-aligned. Leagues dropdown and mobile menu styled for light theme (gray text, white panel). Removed old dark (black) styling.

---

### [FILE] `components/LeaguesDropdown.tsx` updated
- **Path:** `components/LeaguesDropdown.tsx`
- **Action:** Light theme. Dropdown panel: white bg, gray-200 border, gray-900 text; hover bg-gray-50. Button: gray-600 text. Fixed top set to 6.25rem (below announcement + nav). Inline (mobile): gray text, hover:bg-gray-100.

---

### [FILE] `components/CartTrigger.tsx` updated
- **Path:** `components/CartTrigger.tsx`
- **Action:** Light theme. Border gray-200, bg gray-50, text gray-700; hover border-gray-300, bg-gray-100. Badge: gray-900 bg, white text.

---

### [FILE] `components/ProductCard.tsx` updated
- **Path:** `components/ProductCard.tsx`
- **Action:** High-conversion card (jerseyniho-inspired, premium).
- **Changes:** Card container `bg-gray-50`, rounded-xl; image area aspect 3/4 on gray-100. **Clear "Add to Cart" button** always visible on card (below price), not only on hover; uses jersey theme primary as bg with subtle shadow. Title and price bold; club uppercase small. **Dynamic colored hover shadow** retained (theme primary inset + outer shadow) for premium advantage. Text colors gray-900/gray-500 for light background.

---

### [FILE] `components/LookbookHome.tsx` updated
- **Path:** `components/LookbookHome.tsx`
- **Action:** New structure and light palette.
- **Changes:** Replaced hero with `<HeroBanner />`. Replaced Top Teams with `<CategoryCircles />`. Main grid unchanged (2/3/4 cols) but section bg white, text gray-900. By League, Retro, Search sections: bg white or gray-50, gray borders, gray text. Removed selectedClub/filteredJerseys (simplified to all jerseys in main grid).

---

### [FILE] `app/layout.tsx` updated
- **Path:** `app/layout.tsx`
- **Action:** AnnouncementBar added above Navbar. Body bg `bg-gray-50`, text `text-gray-900`. Content wrapper `pt-[6.25rem]` (announcement h-9 + nav h-16) so content sits below fixed header.

---

### [FILE] `components/CatalogSection.tsx` updated
- **Path:** `components/CatalogSection.tsx`
- **Action:** Light theme. Headings text-gray-900; subtitle text-gray-500. Filter/sort selects: white bg, gray-200 border, gray-900 text.

---

### [FILE] `components/CartDrawer.tsx` updated
- **Path:** `components/CartDrawer.tsx`
- **Action:** Light theme. Drawer bg white; header "Your Cart", gray-900 text, gray-200 border. Line items: gray-50 bg, gray-200 border, gray-900 text. Checkout button gray-900 bg. Overlay unchanged (dark).

---

### [FILE] `app/globals.css` updated
- **Path:** `app/globals.css`
- **Action:** :root palette shifted to light: --background #f9fafb, --foreground #111827, --locker-panel #f3f4f6, --locker-border #e5e7eb. Removed editorial dark vars.

---

### [FILE] `app/kids/page.tsx` created
- **Path:** `app/kids/page.tsx`
- **Action:** Created. Placeholder page for Kids nav link; "Kids Jerseys" + "Youth sizes coming soon" + back link.

---

### [FILE] `app/mystery-box/page.tsx` created
- **Path:** `app/mystery-box/page.tsx`
- **Action:** Created. Placeholder page for Mystery Box nav link; "Mystery Box" + "Surprise jersey drops coming soon" + back link.

---

### [NOTE] Data and categories
- **Path:** `data.json` / `lib/categories.ts`
- **Action:** categories.ts defines Mystery Box and Kids with hrefs /mystery-box and /kids. No dummy jersey data added for Mystery Box yet; placeholder pages allow nav and CategoryCircles to function. Can add mystery-box or kids product lists later.

---

### [VERIFICATION] Build after high-conversion pivot
- **Command:** `npm run build`
- **Result:** Success. Routes: `/`, `/checkout`, `/kids`, `/mystery-box`, `/leagues/[slug]`, `/products/[id]`.

---

*End of initial log. Further entries will be appended below.*

---

### [FEATURE] Product detail page upgrade — high-converting two-column layout
- **Date:** 2025-03-08 (session)
- **Scope:** `app/products/[id]/page.tsx`, `types/cart.ts`, `contexts/CartContext.tsx`, `components/CartDrawer.tsx`
- **Rationale:** Align product page with light, modern theme; add size selector, personalization, and story/shipping accordion; support size and custom name/number in cart for correct line-item handling.

---

### [FILE] `types/cart.ts` updated
- **Path:** `types/cart.ts`
- **Action:** Extended `CartLineItem` with optional `size?: string`, `customName?: string`, `customNumber?: string` so cart can store selected size and personalization per line. Same jersey with different size or customization is treated as a separate line.

---

### [FILE] `contexts/CartContext.tsx` updated
- **Path:** `contexts/CartContext.tsx`
- **Action:** (1) `addItem(jersey, quantity?, options?)` — third parameter `options?: { size?, customName?, customNumber? }`; matching existing line by jersey id + size + customName + customNumber; new lines get these fields. (2) `removeItemAt(index: number)` and `updateQuantityAt(index: number, quantity: number)` added so drawer can remove/update a specific line when multiple lines share the same jersey (e.g. different sizes). (3) Interface updated with new `addItem` signature and `removeItemAt` / `updateQuantityAt`.

---

### [FILE] `app/products/[id]/page.tsx` rewritten
- **Path:** `app/products/[id]/page.tsx`
- **Action:** Full product page overhaul. **Layout:** Two-column grid on desktop (lg:grid-cols-2): left = image area, right = details + actions. **Left column:** Large aspect-[3/4] area; background uses `jersey.theme.bgStart`/`bgEnd` gradient (or primary gradient); if `jersey.imageUrl` exists, image displayed with gradient behind. **Right column:** Era badge (theme primary), title, club, price; **Size selector:** Pills for S/M/L/XL/XXL (or `jersey.sizes` when defined), `selectedSize` state, active pill styled with `jersey.theme.primary` (border + bg tint). **Personalization:** Checkbox "Add Custom Name & Number (Free)"; when checked, two inputs (Name, Number) with AnimatePresence. **Add to Cart:** Full-width CTA button with theme primary and shadow; calls `addItem(jersey, 1, { size, customName, customNumber })` (defaults size to first option if none selected), then `openCart()`. **Story & Shipping:** Accordion sections "Jersey Story" (jersey.story) and "Shipping & Returns" (static copy); open/close state per section. **Theming:** Light page bg (bg-gray-50), all interactive accents (era badge, size active state, CTA) use `jersey.theme.primary`. Not-found state uses light theme and link back to store.

---

### [FILE] `components/CartDrawer.tsx` updated
- **Path:** `components/CartDrawer.tsx`
- **Action:** (1) Use `removeItemAt(index)` and `updateQuantityAt(index, quantity)` instead of `removeItem(jersey.id)` / `updateQuantity(jersey.id, …)` so each cart line is updated independently (required when same jersey appears with different size/custom). (2) List key: composite of jersey.id, index, size, customName, customNumber for stability. (3) For each item display size and personalization when present: "Size M" and "Name #10" (or just name/number) in a small gray line below club.

---

### [NOTE] Product page — default size and cart key
- **Path:** `app/products/[id]/page.tsx` / `contexts/CartContext.tsx`
- **Action:** If user clicks Add to Cart without selecting a size, the page passes `selectedSize ?? sizes[0]` so the first size is used. Cart merge logic matches on jersey id + size + customName + customNumber so identical configurations merge quantity; different configurations create separate lines.

---

### [FEATURE] Interactive image gallery on product page
- **Date:** 2025-03-08 (session)
- **Scope:** `types/jersey.ts`, `lib/mock-jerseys.ts`, `data.json`, `components/ProductGallery.tsx`, `app/products/[id]/page.tsx`
- **Rationale:** Support multiple product images (front, back, detail) with a gallery: main image + thumbnails, theme-colored active state, fade transition on change.

---

### [FILE] `types/jersey.ts` updated
- **Path:** `types/jersey.ts`
- **Action:** Added optional `images?: string[]` to `Jersey` interface. Comment: multiple images for gallery; prioritised over `imageUrl`. Kept `imageUrl` as single-image fallback.

---

### [FILE] `lib/mock-jerseys.ts` updated
- **Path:** `lib/mock-jerseys.ts`
- **Action:** Added `images` array (3–4 URLs) to four jerseys: barca-08-09 (Front, Back, Detail, Fit), real-01-02 (Front, Back, Detail), man-city-21-22 (Front, Back, Detail, Side), liverpool-18-19 (Front, Back, Detail). URLs use placehold.co with team colours for gallery testing.

---

### [FILE] `data.json` updated
- **Path:** `data.json`
- **Action:** Added `images` array to same four jerseys (barca-08-09, real-01-02, man-city-21-22, liverpool-18-19) with matching placehold.co URLs for consistency with mock-jerseys.

---

### [FILE] `components/ProductGallery.tsx` created
- **Path:** `components/ProductGallery.tsx`
- **Action:** New client component. **Props:** `jersey: Jersey`. **Image source:** `imageList = jersey.images?.length ? jersey.images : (jersey.imageUrl ? [jersey.imageUrl] : [])`. **State:** `selectedImageIndex` (default 0). **Main image:** aspect-[3/4], rounded-2xl, gradient background from theme (bgStart/bgEnd or primary); AnimatePresence + motion.img with key=selectedImageIndex for fade on change. **Thumbnails:** Rendered only when `imageList.length > 1`; horizontal scroll (scrollbar-hide); each thumbnail is a button with border-2, active uses `jersey.theme.primary`, inactive opacity 0.7; click sets selectedImageIndex. Accessibility: aria-label and aria-pressed on thumbnail buttons.

---

### [FILE] `app/products/[id]/page.tsx` updated
- **Path:** `app/products/[id]/page.tsx`
- **Action:** Replaced inline left-column image block with `<ProductGallery jersey={jersey} />`. Removed unused `gradient` and `bgGradient` variables (moved into ProductGallery).

---

### [FEATURE] Mystery Box page — full experience and cart integration
- **Date:** 2025-03-08 (session)
- **Scope:** `types/cart.ts`, `contexts/CartContext.tsx`, `components/CartDrawer.tsx`, `components/MysteryBoxConfig.tsx`, `app/mystery-box/page.tsx`
- **Rationale:** Build a high-converting Mystery Box page with hero, size/tier/exclusions config, and cart support so boxes with different options don’t merge and drawer shows tier and exclusions.

---

### [FILE] `types/cart.ts` updated
- **Path:** `types/cart.ts`
- **Action:** Added optional `tier?: string` (e.g. Classic Box, Retro Box) and `exclusions?: string` (teams/leagues to avoid) to `CartLineItem` for Mystery Box line items.

---

### [FILE] `contexts/CartContext.tsx` updated
- **Path:** `contexts/CartContext.tsx`
- **Action:** Extended `addItem` options with `tier?: string` and `exclusions?: string`. Merge logic now matches on `tier` and `exclusions` so identical jersey+size+custom+tier+exclusions merge; different tier or exclusions create separate lines.

---

### [FILE] `components/CartDrawer.tsx` updated
- **Path:** `components/CartDrawer.tsx`
- **Action:** (1) List item key extended with `tier` and `exclusions`. (2) Line details: when `tier` or `exclusions` exist, show " · {tier}" and "Excl: {exclusions}" (exclusions truncated to 20 chars + "…"); `line-clamp-2` on the details line. Size/custom/tier/exclusions all shown in one small gray line.

---

### [FILE] `components/MysteryBoxConfig.tsx` created
- **Path:** `components/MysteryBoxConfig.tsx`
- **Action:** Client component for the Mystery Box configuration and CTA. **Hero:** Section with premium gradient (purple/indigo from #1e1b4b to #4c1d95); Framer Motion floating animation on a box graphic (emoji 📦 in a gradient rounded square) with `animate={{ y: [0, -6, 0] }}` 3s infinite; title "Mystery Box", short subtitle. **Form:** Size selector pills (S–XXL) styled like product page, active state uses theme primary #6B21A8. **Tier:** Two radio-style cards "Classic Box" (€79.99, current/standard) and "Retro Box" (€99.99, classic eras); selected card has purple border and tint. **Exclusions:** Textarea "Teams/Leagues to Avoid (Optional)" with placeholder "e.g., No Real Madrid, no Premier League teams...". **CTA:** Price display updates with tier; large "Add to Cart" button (theme primary, shadow). **Cart:** Builds dummy `Jersey` with id "mystery-box", title "Mystery Box", theme purple/gold; price set from tier (CLASSIC_PRICE / RETRO_PRICE); `addItem(jersey, 1, { size, tier: "Classic Box"|"Retro Box", exclusions })`. Config area has subtle gradient background (lavender to white). Back to home link at bottom.

---

### [FILE] `app/mystery-box/page.tsx` updated
- **Path:** `app/mystery-box/page.tsx`
- **Action:** Replaced placeholder with layout: "Back to store" link, then `<MysteryBoxConfig />`. Page remains server component; all interactive state lives in MysteryBoxConfig client component. Light theme (bg-gray-50).

---

### [FEATURE] Quick-nav categories — lookbook-style blocks (replacing circles)
- **Date:** 2025-03-08 (session)
- **Scope:** `lib/categories.ts`, `data.json`, `components/CategoryCircles.tsx`
- **Rationale:** Replace simple letter-in-circle quick nav with premium lookbook-style photo blocks: rounded squares, model/jersey imagery per category, labels below, accent hover. Shift from identifier-only (P, L, S, R, M, K) to image-based navigation.

---

### [FILE] `lib/categories.ts` updated
- **Path:** `lib/categories.ts`
- **Action:** Extended `CategoryItem` with required `imageUrl: string` for lookbook-style asset per category. Added `imageUrl` to all six entries: Premier League (English team jersey placeholder), La Liga (Spanish), Serie A (Italian), Retro (classic/historical), Mystery Box (unbox theme), Kids (youth jersey). All use placehold.co 400×500 portrait URLs with descriptive text. Comment updated: "lookbook-style blocks" and "hover border / depth".

---

### [FILE] `data.json` updated
- **Path:** `data.json`
- **Action:** Added root-level `categories` array with six objects mirroring `lib/categories.ts`: `id`, `label`, `href`, `accent`, `imageUrl`. Supports the new image-based category config for reference and future API use.

---

### [FILE] `components/CategoryCircles.tsx` updated
- **Path:** `components/CategoryCircles.tsx`
- **Action:** **Design:** Replaced circles with rounded-square blocks (rounded-2xl, aspect 4/5). **Content:** Removed single-letter labels (P, L, S, R, M, K); each block now shows `cat.imageUrl` as full-bleed image (object-cover). **Layout:** Horizontal row of 6; on mobile/tablet flex + overflow-x-auto; on lg grid grid-cols-6 for even six-column layout. **Typography:** Category label remains below block, same clean font (text-xs/sm, font-medium, gray-700, hover gray-900). **Hover:** motion.div whileHover: accent-colored border (borderColor: cat.accent), soft depth via boxShadow using cat.accent at 30% opacity plus neutral shadow; whileTap scale 0.98. **Spacing:** Section padding py-10 / py-12, gap-4/5/6; whitespace preserved. Component remains client for Framer Motion hover/tap. File and export name unchanged (CategoryCircles) to avoid call-site changes.

---

### [FEATURE] Home restructure — jerseyniho.com-style vertical flow
- **Date:** 2025-03-08 (session)
- **Scope:** `lib/mock-jerseys.ts`, `components/ProductCarousel.tsx`, `components/TrustBadges.tsx`, `components/ShopByTeam.tsx`, `components/ReviewsGallery.tsx`, `components/LookbookHome.tsx`
- **Rationale:** Scrap Nike/Adidas tech layout; revert to classic high-converting e-commerce flow: announcement bar, navbar, hero, category blocks (rounded squares with model images), horizontal product carousels, shop by team, trust badges, customer gallery. Product cards keep image + title + price + visible Add to Cart.

---

### [FILE] `lib/mock-jerseys.ts` updated
- **Path:** `lib/mock-jerseys.ts`
- **Action:** Added `getNewSeasonJerseys()` (slice 0–8), `getWorldCupJerseys()` (slice 2–10), `getBestSellersJerseys()` (trending or slice 4–12) for home page carousels.

---

### [FILE] `components/ProductCarousel.tsx` created
- **Path:** `components/ProductCarousel.tsx`
- **Action:** Reusable horizontal product carousel. Props: `title`, `jerseys` (Jersey[]), optional `ariaLabel`. Renders section with heading + horizontally scrollable row of ProductCards (fixed width 160/180/200px per card). Uses `overflow-x-auto` and `scrollbar-hide` for swipe/scroll on mobile and desktop. No grid; single row of cards.

---

### [FILE] `components/TrustBadges.tsx` created
- **Path:** `components/TrustBadges.tsx`
- **Action:** Trust badges section: 4 items (תשלום מאובטח, משלוח חינם, תמיכה מהירה, החזרות קלות) with emoji icons in a responsive grid (2 cols mobile, 4 desktop). Border-t, bg-gray-50, centered text.

---

### [FILE] `components/ShopByTeam.tsx` created
- **Path:** `components/ShopByTeam.tsx`
- **Action:** “Shop by Team” section using TOP_TEAMS. Maps team id to league slug (barcelona/real-madrid → la-liga, man-city/liverpool → premier-league, etc.). Renders heading “קניה לפי קבוצה” + flex-wrap of pill links to `/leagues/[slug]`. Border-t, bg-white.

---

### [FILE] `components/ReviewsGallery.tsx` created
- **Path:** `components/ReviewsGallery.tsx`
- **Action:** Customer reviews/gallery: heading “לובשים אצלנו” + grid of 6 square placeholder images (placehold.co), aspect-square, rounded-lg. 2 cols mobile, 3 desktop. bg-gray-50, border-t. Instagram-style social proof.

---

### [FILE] `components/LookbookHome.tsx` restructured
- **Path:** `components/LookbookHome.tsx`
- **Action:** Replaced previous grid + CatalogSection layout with jerseyniho vertical flow: (1) HeroBanner (2) CategoryCircles — rounded squares with model images, horizontal scroll (3) ProductCarousel “עונה 25/26” with getNewSeasonJerseys() (4) ProductCarousel “מונדיאל 2026” with getWorldCupJerseys() (5) ProductCarousel “נמכרים ביותר” with getBestSellersJerseys() (6) ShopByTeam (7) TrustBadges (8) ReviewsGallery. Removed “חולצות פופולריות” grid and “לפי ליגה” / “רטרו” CatalogSection from home. Main bg-white. Announcement bar and Navbar remain in layout; ProductCard unchanged (image, title, price, Add to Cart visible).

---

## Session: עדכונים נוספים (בית, ליגות, תמונות, עברית, UI)

### [FEATURE] דרופדאון ליגות מחובר ל-Navbar + לוגואים במקום שמות
- **Scope:** `lib/leagues.ts`, `components/LeaguesDropdown.tsx`, `components/Navbar.tsx`
- **Changes:** הוספת `logoUrl` ל-LeagueItem ב-leagues.ts (נתיבי /img/ לליגות עם לוגו). LeaguesDropdown: מצב controlled (isOpen, onOpenChange), ייצוא LeaguesDropdownPanelContent (גריד לוגואים עגולים 56x56 או fallback לאות) ו-LeaguesDropdownPanel. Navbar: state isLeaguesOpen, עטיפת nav+panel ב-div עם onMouseLeave ו-ref ל-click-outside, רינדור הפאנל כ-sibling של ה-nav — הפאנל מחובר ל-navbar ללא רווח. התמונות נטענות יחד עם גלילה למטה (ללא עיכוב).

### [FEATURE] הסרת כפתור "בית" מה-Navbar
- **Path:** `components/Navbar.tsx`
- **Action:** הסרת הלינק "בית" מדסקטופ ומובייל. הכניסה לבית נשארת דרך הלוגו TheFootyKits.

### [FEATURE] Hero — רקע מתמונה, כיתוב מימין
- **Scope:** `components/HeroBanner.tsx`, `public/img/`
- **Action:** רקע הבאנר מתמונה: `/img/Gemini_Generated_Image_uqppo7uqppo7uqpp.png` (שלושת השחקנים במגרש). כיתוב (חדש במלאי, קולקציית מונדיאל, תיאור, לקנות עכשיו) מיושר לימין (flex justify-start + text-end, בלוק עם ms-auto). גרדיאנט עדין מעל הרקע לקריאות.

### [FEATURE] תמונות חולצות מ-img_jer — רק חולצות עם תמונה
- **Scope:** `public/img/jerseys/`, `lib/mock-jerseys.ts`, `components/ProductCard.tsx`, `types/jersey.ts`
- **Action:** העתקת כל קבצי img_jer ל-public/img/jerseys/. בניית MOCK_JERSEYS מחדש — רק 13 חולצות שיש להן תמונה (מילאן, ארגנטינה, ארסנל, ברצלונה, באיירן חוץ/בית, אינטר, מנצ'סטר סיטי שלישית+בית, יונייטד, PSG, ריאל מדריד, ספרד). חלק עם 2–3 תמונות למערך images. פונקציה hasJerseyImage; כל ה-getters מסננים לפי hasJerseyImage. ProductCard מציג תמונת חולצה (Image) כשיש imageUrl או images[0].

### [FEATURE] רקע לבן לכרטיסי חולצות
- **Path:** `components/ProductCard.tsx`
- **Action:** הסרת גרדיאנט/צבע לפי theme מהכרטיס. רקע לבן אחיד (bg-white, border-gray-100), אזור תמונה bg-white, צל hover אפור נייטרלי. כפתור "הוסף לעגלה" נשאר עם צבע החולצה (עדכון נפרד לריאל מדריד).

### [FEATURE] הגדלת ריבועי תמונות בדף בית + רקע לבן בדף מוצר
- **Scope:** `components/ProductCarousel.tsx`, `app/products/[id]/page.tsx`, `components/ProductGallery.tsx`
- **Action:** ProductCarousel: רוחב כרטיסים 180/210/260px (במקום 160/180/200). דף מוצר: bg-white, הסרת setTheme(jersey.theme). ProductGallery: רקע אזור תמונה לבן (bg-white border-gray-100), הסרת גרדיאנט; מיניאטורות מסגרת אפורה אחידה.

### [FEATURE] תמונות קטנות יותר בתוך הריבועים (דף בית)
- **Path:** `components/ProductCard.tsx`
- **Action:** אזור התמונה: ריווח פנימי inset-3/inset-4, object-contain — התמונה נראית קטנה יותר עם שוליים לבנים באותו ריבוע.

### [FEATURE] כפתור "הוסף לעגלה" נראה כשצבע החולצה לבן (ריאל מדריד)
- **Scope:** `lib/theme-utils.ts`, `components/ProductCard.tsx`, `app/products/[id]/page.tsx`
- **Action:** קובץ חדש theme-utils.ts: isLightColor(hex), getButtonTheme(theme), getAccentColor(theme). ProductCard וכפתור CTA בדף מוצר משתמשים ב-getButtonTheme; תגית עידן, מידה, צ'קבוקס ב-getAccentColor.

### [FEATURE] כל החולצות 2025/26 + שמות בעברית
- **Path:** `lib/mock-jerseys.ts`
- **Action:** עדכון title לכל החולצות ל-2025/26. תרגום שמות לעברית (מילאן בית, ארגנטינה בית, ארסנל בית, ברצלונה בית, באיירן מינכן חוץ/בית, אינטר מילאן בית, מנצ'סטר סיטי שלישית/בית, מנצ'סטר יונייטד בית, פריז סן-ז'רמן בית, ריאל מדריד בית, ספרד בית 2025/26).

### [FIX] תיקון חיתוך כרטיסים בדף בית
- **Path:** `components/ProductCard.tsx`, `components/ProductCarousel.tsx`
- **Action:** ProductCard: overflow-visible על המעטפת, overflow-hidden רק על אזור התמונה (rounded-t-xl), pb-5. ProductCarousel: overflow-y-visible על container הגלילה.

### [FEATURE] פרימייר ליג בעברית
- **Path:** `lib/leagues.ts`, `lib/categories.ts`, `lib/mock-jerseys.ts`, `data.json`
- **Action:** החלפת "Premier League" ב-"פרימייר ליג" בכל המקומות (label, league).

### [FEATURE] חצים להעברת קרוסלה בדף בית
- **Path:** `components/ProductCarousel.tsx`
- **Action:** שני כפתורים עגולים (חץ שמאלה, ימינה) ליד כותרת כל קרוסלה. scrollRef + scrollBy עם behavior smooth. כיוון החצים ומיקום הכפתורים הוחלפו לפי בקשת המשתמש.

### [FEATURE] מונדיאל 2026 — רק נבחרות
- **Scope:** `types/jersey.ts`, `lib/mock-jerseys.ts`
- **Action:** שדה isNationalTeam?: boolean ב-Jersey. ארגנטינה וספרד מסומנות isNationalTeam: true. getWorldCupJerseys() מחזירה רק חולצות עם תמונה ו-isNationalTeam === true.

---

## [DATABASE] Migration to MongoDB Atlas

### Overview
- **Goal:** Use MongoDB Atlas as the primary database for jersey data. Static `MOCK_JERSEYS` remains in code for initial seeding only; all reads go through Mongoose.
- **Environment:** Connection string via `MONGODB_URI` in `.env.local`.

### 1. Dependencies
- **Action:** `npm install mongoose`
- **Path:** `package.json`

### 2. Database connection utility
- **Path:** `lib/mongodb.ts` (new)
- **Details:**
  - Singleton pattern: `global.mongoose` caches `conn` and `promise` to avoid multiple connections in Next.js dev (fast refresh).
  - `connectDB()`: returns existing connection if present; otherwise creates one and caches it. Throws if `MONGODB_URI` is missing (check done inside `connectDB()` so build can run without `.env.local`).
  - Uses `bufferCommands: false` for serverless-friendly behavior.

### 3. Mongoose model
- **Path:** `models/Jersey.ts` (new)
- **Details:**
  - Schema aligned with `Jersey` in `types/jersey.ts`: `id` (String, required, unique), `title`, `club`, `league`, `era`, `decade`, `story`, `theme` (Schema.Types.Mixed), `imageUrl`, `images` ([String]), `price`, `sizes` ([String]), `trending`, `isNationalTeam`.
  - Collection name: `jerseys`.
  - Export: `JerseyModel` with `mongoose.models.Jersey ?? mongoose.model(...)` for hot-reload safety.

### 4. Async data layer (lib/mock-jerseys.ts)
- **Imports added:** `connectDB` from `./mongodb`, `JerseyModel` from `@/models/Jersey`.
- **Functions made async and switched to MongoDB:**
  - `getJerseyById(id)`: `Promise<Jersey | null>` — `JerseyModel.findOne({ id }).lean()`.
  - `getTrendingJerseys()`: `Promise<Jersey[]>` — find `{ trending: true }`, then filter by `hasJerseyImage`.
  - `getNewSeasonJerseys()`: `Promise<Jersey[]>` — find all, filter by `hasJerseyImage`, slice(0, 8).
  - `getWorldCupJerseys()`: `Promise<Jersey[]>` — find `{ isNationalTeam: true }`, filter by `hasJerseyImage`.
  - `getBestSellersJerseys()`: `Promise<Jersey[]>` — if `getTrendingJerseys()` length ≥ 4 return it; else find all, filter, slice(4, 12).
  - `getJerseysByDecade(decade)`: `Promise<Jersey[]>` — find `{ decade }`, filter by `hasJerseyImage`.
  - `getJerseysByLeagueSlug(slug)`: `Promise<Jersey[]>` — for `retro`: find `{ decade: { $in: ["80s","90s"] } }`; else find by `league` from `slugToLeagueName(slug)`; then filter by `hasJerseyImage`.
- **Fallback when `MONGODB_URI` is unset:** `isMongoConfigured()` returns `!!process.env.MONGODB_URI`. When false, all getters use `MOCK_JERSEYS` in-memory (same logic as before) so `next build` and dev without DB still work.
- **Unchanged:** `MOCK_JERSEYS` array and `hasJerseyImage()` (used for in-memory filtering and for seed data). `slugToLeagueName` remains sync.

### 5. Seed API route
- **Path:** `app/api/seed/route.ts` (new)
- **Details:**
  - GET and POST handlers call shared `runSeed()`.
  - `runSeed()`: `connectDB()`, `JerseyModel.deleteMany({})`, `JerseyModel.insertMany(MOCK_JERSEYS)`.
  - Returns JSON `{ ok, message, count }` on success, or `{ ok: false, error }` with status 500 on failure.
  - **Usage:** Call `GET /api/seed` or `POST /api/seed` once to populate the `jerseys` collection from current static data.

### 6. Server components updated to await
- **app/page.tsx:** Default export is `async function Home()`. Awaits `getNewSeasonJerseys()`, `getWorldCupJerseys()`, `getBestSellersJerseys()` via `Promise.all`, passes results as props `newSeasonJerseys`, `worldCupJerseys`, `bestSellersJerseys` to `LookbookHome`.
- **components/LookbookHome.tsx:** Now accepts props `newSeasonJerseys`, `worldCupJerseys`, `bestSellersJerseys` (each `Jersey[]`) instead of calling getters (client component; data provided by server).
- **app/products/[id]/page.tsx:** Converted to async server component. Awaits `params`, then `getJerseyById(id)`; renders `ProductPageClient` with `jersey={jersey}` (nullable). Client UI moved to `ProductPageClient`.
- **components/ProductPageClient.tsx** (new): Client component containing all product page UI (gallery, size, personalization, add to cart, accordions). Receives `jersey: Jersey | null` as prop.
- **app/leagues/[slug]/page.tsx:** Default export is `async function LeaguePage()`. Awaits `params`, then `getJerseysByLeagueSlug(slug)`. Uses awaited `jerseys` for `LeagueCatalog`.

### Environment
- **Variable:** `MONGODB_URI` in `.env.local` (not committed). Example: `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`.

---

## [UI/UX] Navbar, Header, Leagues, Cart (post–DB)

### Logo in Navbar
- **Path:** `components/Navbar.tsx`, `public/img/TheFootyKits.png` (later `.jpg` → `.png`).
- **Action:** Replaced text "TheFootyKits" with logo image via `next/image`. Logo size increased (e.g. `h-24 sm:h-28 md:h-32 lg:h-36`) with `overflow-visible` so it can extend beyond navbar height; navbar height kept at `h-16`. Added `flex-nowrap` and `shrink-0` so logo + links stay on one row.

### Header: one row (AnnouncementBar + Navbar)
- **Path:** `app/layout.tsx`, `components/AnnouncementBar.tsx`, `components/Navbar.tsx`.
- **Action:** Header made a single row: `flex flex-row h-16`. AnnouncementBar and Navbar are siblings; AnnouncementBar uses `flex-1 h-full`, Navbar uses `flex-1`. Order: Navbar then AnnouncementBar (RTL: nav right, blue bar left). Body padding updated to `pt-16`. AnnouncementBar no longer full-width; it shares the row.

### CTA, Retro link, Kids removed
- **Paths:** `components/HeroBanner.tsx`, `components/LookbookHome.tsx`, `components/Navbar.tsx`.
- **Action:** "לקנות עכשיו" link set to `/#mundial`. Section "מונדיאל 2026" wrapped in `<section id="mundial" className="scroll-mt-20">` for scroll target; `scroll-behavior: smooth` in globals. "רטרו" in navbar (desktop + mobile) changed from `/#retro` to `/leagues/retro`. "ילדים" link removed from navbar (desktop + mobile).

### New retro jerseys from img_jer
- **Paths:** `lib/mock-jerseys.ts`, `public/img/jerseys/`.
- **Action:** New images copied from `img_jer` to `public/img/jerseys/` (ברצלונה, מילאן גמר, מנצסטר יונייטד, ניימאר, ריאל-מדריד-16-17-גמר). Five new entries in `MOCK_JERSEYS` with `league: "Retro"`, `decade: "90s"`: `barca-retro`, `milan-final-retro`, `man-united-retro`, `neymar-retro`, `real-madrid-16-17-final`. Paths with spaces use `encodeURI()` in URLs. After code changes, user must run `/api/seed` once if using MongoDB.

### Dropdown: only leagues with logo
- **Path:** `components/LeaguesDropdown.tsx`.
- **Action:** `LEAGUES_WITH_LOGO = LEAGUES.filter((l) => l.logoUrl)`. Panel grid uses `LEAGUES_WITH_LOGO` so only leagues with `logoUrl` are shown (no "R" placeholders). Grid cols set to `grid-cols-3 sm:grid-cols-4 md:grid-cols-5`.

### Rest of World removed; Bayern → Bundesliga; נבחרות
- **Paths:** `lib/leagues.ts`, `lib/mock-jerseys.ts`.
- **Action:** "Rest of World" removed from `LEAGUES`. Both Bayern Munich jerseys set to `league: "Bundesliga"`. Argentina and Spain set to `league: "נבחרות"`. New league added: `{ slug: "national-teams", label: "נבחרות", description: "National teams" }`.

### Navbar: "נבחרות" link
- **Path:** `components/Navbar.tsx`.
- **Action:** Link "נבחרות" added (desktop + mobile) pointing to `/leagues/national-teams`.

### Cart drawer: show jersey images
- **Path:** `components/CartDrawer.tsx`.
- **Action:** Replaced gradient placeholder with actual jersey image: `next/image` using `jersey.images?.[0] ?? jersey.imageUrl` in a 64×64 container with `object-contain`, white background, and border. Fallback to theme gradient when no image.

---

## [CHECKOUT] Checkout page and orders

### Overview
- **Goal:** Full checkout flow: order summary from cart, customer form, shipping and payment options, save order to MongoDB, redirect to thank-you; optional WhatsApp link for "Pay via WhatsApp/Bit".
- **RTL/Hebrew:** Layout and labels in Hebrew; form and summary are RTL-friendly.

### 1. Order types and model
- **Path:** `types/order.ts` (new).
- **Details:** `OrderLineItem` (jerseyId, title, quantity, size, customName, customNumber, price, imageUrl), `OrderCustomer` (name, phone, email, city, address), `ShippingMethod` ("home-delivery" | "self-collection"), `PaymentMethod` ("credit-card" | "whatsapp-bit"), `OrderPayload`, `Order`.
- **Path:** `models/Order.ts` (new).
- **Details:** Mongoose schema for orders collection: items (array of subdocuments), customer (subdocument), shippingMethod, paymentMethod, subtotal, orderId (unique string). Timestamps enabled. `OrderModel` export with hot-reload guard.

### 2. API route POST /api/orders
- **Path:** `app/api/orders/route.ts` (new).
- **Details:** Accepts JSON body `OrderPayload`. Validates items length and customer.phone. Generates unique `orderId` (e.g. TFK-xxx-xxx). Connects via `connectDB()`, creates document with `OrderModel.create()`. Returns `{ ok: true, orderId }` or 400/500 with error message.

### 3. Checkout page
- **Path:** `app/checkout/page.tsx` (replaced).
- **Details:** Client component using `useCart()`. Empty cart: message + link back to shop. Otherwise: two-column layout (lg). **Left column:** (1) Customer form: name, phone (required), email, city, address. (2) Shipping: radio "משלוח לבית" / "איסוף עצמי". (3) Payment: radio "כרטיס אשראי" / "תשלום בוואטסאפ / Bit". **Right column:** Order summary (sticky): list of items with image (`next/image`), title, size, personalization, price, quantity; subtotal in ₪; "השלם הזמנה" button; link back to shop. On submit: validate phone, POST to `/api/orders` with payload built from cart + form; on success, if payment is "whatsapp-bit" open `https://wa.me/{NEXT_PUBLIC_WHATSAPP_PHONE}?text=...` with encoded order summary; then `clearCart()` and redirect to `/checkout/thank-you?orderId=...`. Errors shown under button. Environment: `NEXT_PUBLIC_WHATSAPP_PHONE` (default 972501234567) for WhatsApp link.

### 4. Thank-you page
- **Path:** `app/checkout/thank-you/page.tsx` (new).
- **Details:** Client component. Reads `orderId` from `useSearchParams()`. Displays "תודה שהזמנת!", short message, order number (if present), and "חזרה לחנות" button. Clean centered card layout.

### 5. CartContext: clearCart
- **Path:** `contexts/CartContext.tsx`.
- **Action:** Added `clearCart: () => void` to context interface and implementation (`setItems([])`). Exposed in provider value. Checkout page calls `clearCart()` after successful order before redirect.

---

## [CHECKOUT] Bit payment, shipping form, success modal with QR

### Overview
- **Goal:** Checkout form for shipping only (Name, Phone, City, Address); order summary from cart; payment options: "Credit Card (Coming Soon)" (disabled) and "Bit / WhatsApp". On "Place Order" with Bit: save order to MongoDB with status "Pending Payment", show success modal with Bit QR image and "Confirm Payment via WhatsApp" button.

### 1. Order status (types + model + API)
- **Path:** `types/order.ts`. **Action:** Added `OrderStatus = "pending-payment" | "paid" | "completed"`; `OrderPayload.status?` and `Order.status?`.
- **Path:** `models/Order.ts`. **Action:** Schema field `status` with enum and default `"pending-payment"`.
- **Path:** `app/api/orders/route.ts`. **Action:** Accepts optional `status` in body; when payment is Bit, order is saved with `status: "pending-payment"`.

### 2. Checkout page (form, payment, Bit modal)
- **Path:** `app/checkout/page.tsx`.
- **Form:** Section "פרטי משלוח" with required fields: Name, Phone, City, Address (email kept in state for API but not in main form labels). Shipping method fixed to delivery (no UI).
- **Payment:** Two options: "כרטיס אשראי (בקרוב)" — disabled, not selectable; "Bit / WhatsApp" — selected by default and only submittable option.
- **Flow:** On submit (Bit only): validate name + phone; POST to `/api/orders` with payload including `status: "pending-payment"`. On success: do not redirect; set `successModal` state with `{ orderId, payload }`.
- **Success modal:** Shown when `successModal` is set. Title "ההזמנה נשמרה", text "סרוק את קוד ה-QR לתשלום ב-Bit". QR image: `next/image` with `src="/img/Bit.jpeg"` (Bit QR placeholder; user can replace with their own). Button "אישור תשלום בוואטסאפ" opens WhatsApp with order details and customer name to `NEXT_PUBLIC_WHATSAPP_PHONE` (only rendered if env is set). Button "סיום" calls `clearCart()`, clears modal, redirects to `/checkout/thank-you?orderId=...`.

### 3. Bit QR image
- **Path:** `public/img/Bit.jpeg`. **Action:** Copied from project asset (Bit QR placeholder). Used in checkout success modal; user can replace with their own Bit QR image later.

### 4. "סיום" without paying — pending payment on thank-you page
- **Problem:** If the user closes the modal with "סיום" without paying, the order is still "pending-payment" and they have no way to send payment details later.
- **Path:** `app/checkout/page.tsx`. **Action:** When success modal is shown (Bit order), store WhatsApp link in `sessionStorage` under key `pendingOrder_${orderId}`. When user clicks "סיום", redirect to thank-you with `?orderId=...&pending=1`.
- **Path:** `app/checkout/thank-you/page.tsx`. **Action:** If `pending=1` and `orderId`, read `sessionStorage` for `pendingOrder_${orderId}`. If present, show text "עדיין לא שילמת? שלח את פרטי ההזמנה בוואטסאפ..." and a green button "שלח פרטי תשלום בוואטסאפ" that opens the stored WhatsApp URL. Message for pending orders: "ההזמנה נשמרה במערכת. נצור איתך קשר לאחר קבלת התשלום."

---

## [ADMIN] How we know if the customer paid — mark order as paid

- **Context:** Bit/WhatsApp payments are manual: the store owner sees the payment in Bit and then needs a way to mark the order as "paid" in the system (no Bit webhook).
- **Solution:** Admin-only API and a simple admin page where the owner can list orders and mark them as paid.

### 1. Admin auth
- **Path:** `lib/admin-auth.ts` (new). **Action:** `isAdminRequest(request)` checks `Authorization: Bearer <token>` against `process.env.ADMIN_SECRET`. Used by GET /api/orders and PATCH /api/orders/[orderId].
- **Env:** Set `ADMIN_SECRET` in `.env.local` (e.g. a long random string). This value is the "admin password" for the orders page.

### 2. GET /api/orders (admin)
- **Path:** `app/api/orders/route.ts`. **Action:** Added GET handler. Requires `Authorization: Bearer <ADMIN_SECRET>`. Query `?status=pending-payment` to filter. Returns `{ ok: true, orders }` (sorted by createdAt desc). 401 if not authorized.

### 3. PATCH /api/orders/[orderId] (admin)
- **Path:** `app/api/orders/[orderId]/route.ts` (new). **Action:** PATCH body `{ status: "paid" | "completed" }`. Updates the order by `orderId`. Requires same Bearer token. Returns `{ ok: true, orderId, status }` or 404 if order not found.

### 4. Admin orders page
- **Path:** `app/admin/orders/page.tsx` (new). **Action:** Client page at `/admin/orders`. First visit: form "סיסמת ניהול" (the value is `ADMIN_SECRET`). On submit, calls GET /api/orders with `Authorization: Bearer <password>`; if 200, stores token in sessionStorage and shows orders list. List shows orderId, customer name, phone, city/address, subtotal, status badge (מחכה לתשלום / שולם / הושלם). Filter toggle: "מחכות לתשלום" (default) vs "הכל". For each order with status "pending-payment", button "סומן שולם" that calls PATCH with the stored token to set status to "paid". "יציאה" clears session and returns to login. No server-side session; auth is the secret in sessionStorage and sent as Bearer on each request.

### 5. Payment webhook for automatic "paid" (e.g. Bit API)
- **Context:** With a static Bit QR there is no automatic confirmation (Bit doesn’t know which order the payment is for). If the store later integrates with Bit’s payment API (developer.bitpay.co.il) and creates a payment per order with a notification URL, Bit can call our webhook to mark the order paid.
- **Path:** `lib/admin-auth.ts`. **Action:** Added `isPaymentWebhookRequest(request)` — checks header `X-Webhook-Secret` or `Authorization: Bearer <token>` against `process.env.PAYMENT_WEBHOOK_SECRET`.
- **Path:** `app/api/orders/[orderId]/pay-webhook/route.ts` (new). **Action:** POST handler. If `PAYMENT_WEBHOOK_SECRET` is set and request secret matches, sets order `status` to `"paid"` and returns `{ ok: true, orderId, status: "paid" }`. If secret not set, returns 503. Use this URL as the notification/callback when integrating with Bit (or another provider) so they can confirm payment automatically.

---

## [FEATURE] Patch options, navbar search, retro & national teams

### Overview
- **Goal:** Product page patch selection (Champions League / jersey’s league / none) with +10₪ for paid patches; working navbar search; special rules for retro (only UCL + none) and national teams (no UCL, only league + none).

### 1. Cart & order types for patches
- **Path:** `types/cart.ts`. **Action:** `PatchId = "champions-league" | "league" | "none"`. `PATCH_PRICE = 10`. `CartLineItem.patch?: PatchId`. Comment: "league" = patch of the jersey’s league (dynamic label + logo).
- **Path:** `types/order.ts`. **Action:** `OrderLineItem.patch?`, `patchLabel?` (for display when patch is "league", stores jersey.league).

### 2. CartContext & CartDrawer
- **Path:** `contexts/CartContext.tsx`. **Action:** `addItem` accepts `patch?: PatchId`; match and subtotal treat "champions-league" and "league" as +PATCH_PRICE per item.
- **Path:** `components/CartDrawer.tsx`. **Action:** Line item shows patch label (when patch === "league" use `jersey.league`, else `PATCH_LABELS[patch]`). Line total and subtotal include patch +10₪.

### 3. Product page patches (ProductPageClient)
- **Path:** `components/ProductPageClient.tsx`. **Action:** Section "פאצ׳ים" with options by product type:
  - **Default (club jerseys):** ליגת האלופות + 10₪, [jersey.league] + 10₪, ללא פאצ'. Default selection: "none". League option uses `LEAGUE_PATCH_IMAGES[jersey.league]` for logo.
  - **Retro** (`jersey.decade === "80s" | "90s"`): only ליגת האלופות + 10₪ and ללא פאצ'. Order: UCL then none. Default: none. Message: "חולצות רטרו — ליגת האלופות או בלי פאצ׳".
  - **National teams** (`jersey.isNationalTeam === true`): only [jersey.league] + 10₪ and ללא פאצ'. No Champions League. Order: league then none. Default: none. Message: "נבחרות — ליגה או בלי פאצ׳". If user had "champions-league" selected and opens a national-team product, selection resets to "none".
- **Path:** `components/ProductPageClient.tsx`. **Action:** `LEAGUE_PATCH_IMAGES` maps league names (e.g. "La Liga", "פרימייר ליג", "Serie A", "Ligue 1", "Bundesliga", "נבחרות", "Retro") to image paths under `/img/patches/` or `/img/`. Patch images rendered in buttons; `onError` hides image if missing.

### 4. Checkout
- **Path:** `app/checkout/page.tsx`. **Action:** `buildOrderPayload` includes `patch`, `patchLabel` (when patch === "league"); line price and subtotal add PATCH_PRICE for "champions-league" and "league". WhatsApp message and order summary show patch label (patchLabel or PATCH_LABELS). Checkout list shows patch and correct line total.

### 5. Navbar search
- **Path:** `components/Navbar.tsx`. **Action:** Desktop and mobile search inputs wrapped in `<form action="/search" method="GET">` with `name="q"`. Shared state `searchQuery`; on submit browser navigates to `/search?q=...`. When pathname is `/search`, search input synced from URL via `useSearchParams().get("q")`.
- **Path:** `lib/mock-jerseys.ts`. **Action:** `getAllJerseys()` returns all jerseys with image (Mongo or MOCK_JERSEYS). `searchJerseys(query)` filters by query (trim, toLowerCase) on `title`, `club`, `league`, `era`.
- **Path:** `app/search/page.tsx` (new). **Action:** Server page reads `searchParams.q`, calls `searchJerseys(q)`, renders title "תוצאות חיפוש עבור ..." / "חיפוש חולצות", count, and grid of `ProductCard` for results. Empty state when no results; link back to shop.

### 6. Patch images
- **Path:** `public/img/patches/`. **Action:** Patch assets: `champions-league.png`, `la-liga.png`, `premier-league.png`, `serie-a.png`, `ligue-1.png`, `bundesliga.webp`. Optional: `national-teams.png`, `retro.png`. Source folder `patch/` at project root can be copied into `public/img/patches/` (e.g. `Leauge 1.png` → `ligue-1.png`, `bundesliga.webp`).
- **Path:** `components/ProductPageClient.tsx`. **Action:** `LEAGUE_PATCH_IMAGES` updated to use `/img/patches/ligue-1.png`, `/img/patches/bundesliga.webp` and other league keys as needed.

---
