# hisoles

> The art of standing — Engineered calm for those who cannot stop.

A premium insole brand storefront built as an immersive single-page scroll experience inspired by Japanese aesthetics.

## Tech Stack

- **Next.js 16** with App Router and React Compiler
- **Tailwind CSS 4** with custom design tokens
- **Motion** for scroll-linked animations
- **Bun** runtime

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run lint         # Run Biome linter
bun run lint:fix     # Auto-fix lint issues
bun run format       # Format with Prettier
bun run check        # Run all checks
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx         # Main scroll experience
│   ├── layout.tsx       # Root layout with fonts
│   └── globals.css      # Design tokens & global styles
├── components/
│   ├── layout/          # Structural components (Header, Footer, Providers)
│   ├── sections/        # Page sections (SectionVoid, SectionTension, etc.)
│   └── media/           # Media components
└── lib/                 # Utilities and hooks
```

## Design System

The visual language draws from Japanese craft traditions:

- **Washi** — Warm cream paper background
- **Sumi** — Ink black typography
- **Persimmon** — Orange accent color
- **Kakemono** — Vertical scroll narrative structure
- **Ma** — Intentional pause in animation timing

## Deploy

Deploy on [Vercel](https://vercel.com) for optimal Next.js performance.
