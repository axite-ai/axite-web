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

### Active

- [ ] Visual rebrand — Axite logo, colors, typography, imagery (replacing all Supabase visuals)
- [ ] Content rebrand — Homepage, product pages, pricing, navigation with Axite messaging
- [ ] Keep blog structure — Blog posts remain as-is (SEO/content strategy is future milestone)
- [ ] Deploy to axite.ai — Get rebranded site live

### Out of Scope

- Full content replacement — future milestone
- Theme/color customization — future milestone
- New features beyond what Supabase www provides — not the goal
- Maintaining compatibility with Supabase upstream — flattening makes this impractical

## Current Milestone: v1.1 Axite Rebrand

**Goal:** Transform the extracted Supabase site into a fully branded Axite marketing presence with proper identity, messaging, and deployment.

**Target features:**
- Complete visual identity swap (logo, colors, typography, imagery)
- Content replacement with Axite positioning (homepage, product, pricing — not blog)
- Deploy to axite.ai

**Brand identity:** Agent Governance Platform — control plane for agent actions with policy, identity, and audit across every tool call. Voice: calm, precise, mechanism-first, evidence-first.

## Context

**Current state (v1.0 shipped):** Standalone Next.js 15.5.9 application with:
- 23,672 lines of TypeScript/JavaScript
- 7 inlined packages from Supabase monorepo
- Working dev server with hot reload
- Blog/MDX system with Code Hike syntax highlighting
- Full page structure with navigation and theme switching
- Production build verified

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
- **Deployment**: Must deploy to axite.ai domain
- **Scope**: Production build ready, branding deferred to next milestone

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
| Defer branding to v1.1 | Ship working build first, customize later | — Pending |

---
*Last updated: 2026-01-23 after starting v1.1 milestone*
