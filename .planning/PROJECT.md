# Axite Marketing Website

## What This Is

A standalone Next.js marketing website for Axite, extracted from Supabase's production-grade open-source www codebase. The site has a working production build and can be deployed to axite.ai, with Supabase branding still in place pending future customization.

## Core Value

Get a professional, working marketing website deployed to axite.ai using battle-tested code instead of AI-generated slop.

## Requirements

### Validated

- ✓ Extract Supabase's /apps/www into a standalone Next.js application — v1.0
- ✓ Inline required shared packages (ui, common, config, shared-data, icons, tsconfig) — v1.0
- ✓ Get the site running locally (pnpm dev works) — v1.0
- ✓ Production build works (pnpm build + pnpm start) — v1.0
- ✓ Visual rebrand — Axite colors (#3B63F3 navy, #00B3A4 teal), Inter typography — v1.1
- ✓ Navigation rebrand — Axite nav structure (Product, Pricing, Enterprise, Blog, Trust) — v1.1
- ✓ Content rebrand — Homepage, product pages, pricing, enterprise, trust pages with Axite messaging — v1.1
- ✓ Blog compatibility — 10 Axite blog posts, proper author/metadata — v1.1

### Active

(No active milestone — ready to define next)

### Out of Scope

- Logo replacement — user providing assets separately
- Imagery replacement — keep Supabase imagery for now
- Full blog content strategy — separate milestone
- Maintaining compatibility with Supabase upstream — flattening makes this impractical

## Brand Identity

**Product:** Agent Governance Platform — control plane for agent actions with policy, identity, and audit across every tool call.

**Voice:** Calm, precise, mechanism-first, evidence-first.

**Colors:**
- Primary Navy: #3B63F3
- Accent Teal: #00B3A4

**Typography:**
- Font: Inter (geometric sans-serif)
- Headings: Semibold (600)

## Context

**Current state (v1.1 shipped):** Fully branded Axite marketing site with:
- 23,672 lines of TypeScript/JavaScript
- 7 inlined packages from Supabase monorepo
- Working dev server with hot reload
- Blog/MDX system with Code Hike syntax highlighting
- Full page structure with navigation and theme switching
- Production build verified
- Axite visual identity (navy/teal colors, Inter font)
- Axite navigation and content pages (Homepage, Product, Enterprise, Pricing, Trust)
- 10 Axite blog posts with proper author/metadata

**Tech stack:**
- Next.js 15.5.9 (hybrid Pages + App Router)
- React 18.3.1
- Tailwind CSS 3.4.1
- Radix UI (30+ primitives)
- MDX with Code Hike for blog
- TypeScript 5.9

**Directory structure:**
```
axite/
├── axite-web/     # Old site (keep until ready to switch)
└── axite-new/     # This project - extracted Supabase www
    ├── apps/www/  # Main Next.js application
    └── lib/       # Inlined packages (ui, common, config, etc.)
```

## Constraints

- **Architecture**: Standalone Next.js app (no Turborepo) — extraction complete
- **Deployment**: axite.ai domain (manual deployment)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Supabase www as base | Battle-tested, professional UI vs. rebuilding from scratch | ✓ Good |
| Flatten to standalone app | Simpler maintenance, no monorepo complexity | ✓ Good |
| Keep current site until ready | No downtime, can compare side-by-side | ✓ Good |
| Shallow clone (depth 1) | Minimal download, source history not needed | ✓ Good |
| Copy all packages to lib/ | Simpler than selective, can audit usage later | ✓ Good |
| No-op storage adapter for SSR | Prevents server-side storage errors | ✓ Good |
| Stub CMS functions | Static MDX only, no failed API calls | ✓ Good |
| Defer branding to v1.1 | Ship working build first, customize later | ✓ Good |
| Manual deployment | User handles Vercel/domain setup outside GSD | ✓ Good |

---
*Last updated: 2026-01-24 after completing v1.1 milestone*
