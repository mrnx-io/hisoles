# hisoles

Next.js App Router marketing + checkout flow for Stepprs Comfort Insoles.

## Core commands

- Dev server: `bun run dev`
- Lint: `bun run lint` (fix: `bun run lint:fix`)
- Format: `bun run format` (check: `bun run format:check`)
- Typecheck: `bun run typecheck`
- CI-style checks (no writes): `bun run check` (lint + format + typecheck)
- Production build: `bun run build`
- Start production: `bun run start`

## Project layout

- Routes: `src/app/`
  - `/` → `src/app/page.tsx`
  - `/offer` → `src/app/offer/page.tsx`
  - `/checkout` → `src/app/checkout/page.tsx`
  - `/checkout/complete` → `src/app/checkout/complete/page.tsx`
- UI components: `src/components/` (`layout/`, `sections/`, `offer/`, `checkout/`)
- State: `src/stores/` (Zustand cart store in `src/stores/cart-store.ts`)
- Shared utils: `src/lib/` (`animation.ts`, `usePrefersReducedMotion.ts`, `colors.ts`, `utils.ts`)
- Static assets: `public/`
- Factory config: `.factory/` (treat as internal; may contain secrets)

## Architecture & UX flow

- Home (`/`) is the scroll experience.
  - Provider hierarchy: `OverlayProvider` → `SpineProvider` (source: `src/app/page.tsx`).
  - Chapters (in order): `void` → `tension` → `decay` → `artifact` → `echo` → `altar`.
- Offer (`/offer`) is the conversion landing page.
- Checkout (`/checkout`) embeds Whop Checkout.
  - Query param `add=trial|rotation` selects the plan (defaults to `rotation`) (source: `src/app/checkout/page.tsx`).
- Complete (`/checkout/complete`) reads `status=success` to show confirmation (source: `src/app/checkout/complete/page.tsx`).

## State, motion, and styling

- Cart state uses Zustand (`useCartStore`). The drawer UI is `CheckoutDrawer` (source: `src/components/layout/CheckoutDrawer.tsx`).
- Animations use `motion/react`; always respect reduced motion via `usePrefersReducedMotion()` (source: `src/lib/usePrefersReducedMotion.ts`).
- Spring presets live in `src/lib/animation.ts` (standard: `damping: 50, stiffness: 400`).
- Tailwind CSS 4; design tokens live in `src/app/globals.css` (`@theme`).
- JS color mirror must stay in sync: `src/lib/colors.ts` ↔ `src/app/globals.css`.
- `cn()` helper: `src/lib/utils.ts`.

## Conventions

- Formatting/lint: Biome lints, Prettier formats (Biome formatter is disabled).
- Code style: no semicolons, use double quotes, trailing commas (ES5).
- Prefer `import type` for type-only imports (Biome enforces this).

## External integrations

- Whop checkout embed: `@whop/checkout/react` (source: `src/app/checkout/page.tsx`).
- Meta Pixel scripts live on the offer page (source: `src/app/offer/page.tsx`).

## Security guardrails

- Never commit API keys, tokens, or credentials. Prefer environment variables.
- If editing `.factory/*`, assume it may include secrets and review diffs carefully before committing.
