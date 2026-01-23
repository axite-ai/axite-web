# Axite Marketing Website

## What This Is

A new marketing website for Axite built on Supabase's open-source www codebase. The site will replace the current AI-generated marketing site with a polished, production-tested foundation that can be gradually customized to match Axite's brand and messaging.

## Core Value

Get a professional, working marketing website deployed to axite.ai using battle-tested code instead of AI-generated slop.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Extract Supabase's /apps/www into a standalone Next.js application
- [ ] Inline required shared packages (ui, common, config, shared-data)
- [ ] Get the site running locally
- [ ] Deploy vanilla Supabase www to axite.ai
- [ ] Swap logo/basic branding (minimal changes for v1)

### Out of Scope

- Full content replacement — deferred to future milestone
- Theme/color customization — deferred to future milestone
- New features beyond what Supabase www provides — not the goal
- Maintaining compatibility with Supabase upstream — flattening makes this impractical

## Context

**Current state**: Axite has an existing marketing site at axite-web/ built with Next.js 16, but it was AI-generated and doesn't meet quality standards. The site uses Tailwind CSS v4, Radix UI, and has basic sections (hero, features, contact form, etc.).

**Why Supabase**: Supabase's marketing site is open-source, well-designed, and battle-tested. Using it as a foundation lets Axite benefit from professional UI work without starting from scratch.

**Source**: Supabase's website lives in their monorepo at github.com/supabase/supabase under /apps/www. It uses:
- Next.js (App Router)
- Turborepo (monorepo tooling)
- Shared packages under /packages/ (ui, common, config, shared-data)

**Directory structure**:
```
axite/
├── axite-web/     # Current site (keep until ready to switch)
└── axite-new/     # This project - new site based on Supabase
```

## Constraints

- **Architecture**: Flatten to standalone Next.js app (no Turborepo) — simpler to maintain
- **Deployment**: Must deploy to axite.ai domain
- **Scope**: v1 is vanilla Supabase with minimal branding — get it live first, customize later

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Supabase www as base | Battle-tested, professional UI vs. rebuilding from scratch | — Pending |
| Flatten to standalone app | Simpler maintenance, no monorepo complexity | — Pending |
| Keep current site until ready | No downtime, can compare side-by-side | — Pending |
| Deploy vanilla first | Ship fast, validate approach before investing in customization | — Pending |

---
*Last updated: 2026-01-22 after initialization*
