# hisoles

Premium e-commerce scroll experience for engineered insoles. Japanese aesthetic: Kakemono (vertical scroll), Sumi-e (ink), Ma (intentional pauses), Washi (paper).

## Architecture

**Two-URL design**: `/` (scroll experience) + `/checkout` (transaction). Single product, single audience, linear narrative — no additional pages needed.

**Scroll chapters**: `void` → `tension` → `decay` → `artifact` → `echo` → `altar`

| State Type        | Tool            | Location                              |
| ----------------- | --------------- | ------------------------------------- |
| UI + persistence  | Zustand         | `src/stores/`                         |
| Page coordination | Context API     | `src/components/layout/*Provider.tsx` |
| Form state        | React Hook Form | Component-local                       |
| Server validation | Zod + Actions   | `src/lib/schemas/`, `actions.ts`      |

**Provider hierarchy**: `OverlayProvider` → `SpineProvider`. Cart via Zustand (`useCartStore`).

**Key components**: `MeridianSystem` (scroll spine), `ChapterRail` (kanji nav), `KakemonoSection` (section wrapper), `CheckoutDrawer`, `ShojiDrawer`

## Commands

```bash
bun run dev      # Dev server
bun run build    # Production build
bun run check    # Lint + format (run before commits)
```

## Stack

Next.js 16 (App Router, React Compiler) | Bun | Tailwind CSS 4 | Motion | Zustand | React Hook Form + Zod | Biome | Prettier

## Design Tokens

**Colors**: `washi` #FCFAF5 (bg), `sumi` #1A1A1A (text), `persimmon` #E85D04 (CTA), `stone` #4A4A4A, `charcoal` #222222

**Typography**: General Sans (display), Switzer (body), Space Mono (kickers)

**Timing**: `--duration-breath` 3600ms, `--duration-attention` 600ms, `--duration-whisper` 400ms, `--delay-ma` 80ms

## Code Conventions

- No semicolons, double quotes, trailing commas (ES5)
- `cn()` from `@/lib/utils` for conditional classes
- `import type` for type-only imports
- `usePrefersReducedMotion()` for motion respect
- Spring physics: `damping: 50, stiffness: 400`

## Brand System

The Universal Brand System lives in `docs/` with numbered layers:

| Layer | File                    | Purpose            |
| ----- | ----------------------- | ------------------ |
| Meta  | `00-orchestration.md`   | System protocol    |
| 0     | `01-manifesto.md`       | Philosophy & axiom |
| 1     | `02-covenant.md`        | Strategy & offers  |
| 2     | `03-sumi-breath.md`     | Visual doctrine    |
| 3     | `04-tradeoff-ladder.md` | Priority hierarchy |
| 4     | `05-canon.md`           | Voice & expression |
| 5     | `06-choreography.md`    | Experience moments |
| 6     | `07-storefront.md`      | Artifact spec      |

`docs/00-orchestration.md` is the entry point for the complete system.
