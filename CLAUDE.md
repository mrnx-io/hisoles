# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mandatory: Proactive Skill Usage

**Before responding to ANY user request, you MUST:**

1. Mentally scan available Superpowers skills
2. If ANY skill has even 1% relevance → Use the `Skill` tool to read it
3. Announce: "I'm using [skill name] for this task"
4. Follow the skill's workflow exactly

**This is automated behavior, not optional.** Do not rationalize skipping skills with thoughts like "this is simple" or "I'll just do it quickly."

Key skills to check:
- `superpowers:brainstorm` - Before implementing features or making design decisions
- `superpowers:write-plan` - For multi-step implementation tasks
- `superpowers:execute-plan` - When executing approved plans
- `superpowers:code-reviewer` - After writing significant code

## Commands

```bash
npm run dev      # Start dev server (Turbopack enabled)
npm run build    # Production build
npm run lint     # ESLint
```

## Tech Stack

- Next.js 16 (App Router, React Compiler enabled)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4 (v4 syntax with `@theme` directive)
- Motion (framer-motion successor) for animations
- OKLCH color system

## Architecture

Single-page product landing site with scroll-driven animations.

### Component Structure

```
src/
├── app/           # App Router pages, layout, metadata
├── components/
│   ├── layout/    # Providers, Header, Footer, UI elements
│   └── sections/  # Page sections (SectionVoid, SectionTension, etc.)
├── fonts/         # Local font files (General Sans, Switzer)
└── lib/           # Utilities
```

### State Management

Two React contexts wrap the page:
- **CartProvider** (`useCart`) - Shopping cart state, drawer open/close
- **SpineProvider** (`useSpine`) - Coordinates traveling dot animation with logo position

### Design System

Colors defined in `globals.css` using OKLCH with HEX fallbacks:
- `washi` - warm off-white (#FAF9F6)
- `sumi` - ink black (#1A1A1A)
- `persimmon` - orange accent (#E85D04)
- `stone` / `charcoal` - grays

Fonts (via CSS variables):
- `--font-display` (General Sans) - headings
- `--font-body` (Switzer) - body text
- `--font-mono` (Space Mono) - monospace

### Animation Pattern

Sections use scroll-linked animations via Motion:
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: [...] });
const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
```

### Import Alias

Use `@/` for src imports: `import { useCart } from "@/components/layout/CartProvider"`
