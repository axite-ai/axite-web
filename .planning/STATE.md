# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-24)

**Core value:** Get a professional, working marketing website deployed to axite.ai using battle-tested code instead of AI-generated slop.
**Current focus:** v1.2 Landing Page Refactor - Phase 15 In Progress

## Current Position

Milestone: v1.2 Landing Page Refactor
Phase: 15 of 17 (Value Proposition)
Plan: 2 of 3 complete
Status: In progress
Last activity: 2026-01-26 - Completed 15-02-PLAN.md (Pillars Section)

Progress: [##################..] 98% (54/~55 plans - v1.0+v1.1+phase 12-15 in progress)

## Performance Metrics

**Velocity:**
- Total plans completed: 52 (15 v1.0 + 24 v1.1 + 13 v1.2)
- Average duration: ~17 min
- Total execution time: ~14.7 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1-7 (v1.0) | 15 | ~11h | ~45 min |
| 8 (v1.1) | 6 | ~12 min | ~2 min |
| 9 (v1.1) | 5 | ~42 min | ~8 min |
| 10 (v1.1) | 7 | ~75 min | ~11 min |
| 11 (v1.1) | 6 | ~15 min | ~2.5 min |
| 12 (v1.2) | 8 | ~13 min | ~1.6 min |
| 13 (v1.2) | 3 | ~11 min | ~3.7 min |
| 14 (v1.2) | 2 | ~6 min | ~3 min |
| 15 (v1.2) | 2 | ~8 min | ~4 min |

*Updated after each plan completion*

## Accumulated Context

### Decisions

Key decisions logged in PROJECT.md Key Decisions table.

Recent v1.1 decisions (still relevant):
- Defer logo replacement to future milestone
- Brand voice: calm, precise, mechanism-first, evidence-first
- Navy (#3B63F3) primary, Teal (#00B3A4) accent
- Inter font, semibold (600) headings

v1.2 design constraint:
- For each section, search existing Supabase components first
- Evaluate and select best existing design to adapt
- No creative generation of new layouts/visuals

v1.2 cleanup decisions:
- KEEP blog system (user requested restoration)
- Remove solutions pages and data (Supabase-specific audience content)
- Remove Product, Pricing, Enterprise pages (redirect to /)

v1.2 phase 13 decisions:
- Header shows only logo + single CTA ("Book Security Review")
- No navigation links in header (pages still accessible via direct URL)
- Mobile hamburger removed (no items to show)
- Hero headline: "Complete visibility and control over every agent action" (outcome-first)
- Hero subhead: "The agent governance platform for enterprises" (audience-identifying)
- Hero CTAs: "Book Security Review" (primary, /contact/sales) + "View Docs" (secondary, /docs)

v1.2 phase 14 decisions:
- ProofSection placed after Hero, before Logos section

v1.2 phase 15 decisions:
- TransformationSection uses two-column grid (1 col mobile, 2 cols desktop)
- Before/After labels with horizontal separator for visual clarity
- Amber-500 for pain indicators, brand-500 for outcomes
- Policy pillar featured at full width (lg:col-span-2)
- Identity and Audit pillars compact side-by-side below Policy
- Mini policy demo shows 3 decisions with timestamps and badges
- Permission matrix shows 3 agents with 4 permission levels

### Phase 15 Verification Results

Plan 15-01 verified:
1. TransformationSection component created at apps/www/components/TransformationSection/index.tsx
2. Uses SectionContainer and SectionHeader
3. Contains 2 transformation blocks (Control Crisis, Compliance Scramble)
4. Each block has specific scenario pain statement and outcome statement
5. Build passes without errors

Plan 15-02 verified:
1. PolicyPillar.tsx exists with mini policy demo visual
2. IdentityPillar.tsx exists with permission matrix visual
3. AuditPillar.tsx exists with report preview visual
4. PillarsSection/index.tsx composes all three pillars
5. Policy pillar has more visual weight (full width on desktop)
6. TypeScript compiles without errors

### Phase 14 Verification Results

All success criteria verified:
1. Demo component shows Allowed/Blocked decisions with decision trace
2. SOC2 Type II status indicator visible (badge + "In Progress" text)
3. Link to Trust Center (/trust) present and functional

### Phase 13 Verification Results

All success criteria verified:
1. Header shows only Axite logo (no navigation links)
2. Header has single "Book Security Review" CTA button
3. Hero headline communicates outcome (what users get), not features
4. Hero subhead identifies target audience and what Axite does in one line
5. "Book Security Review" primary CTA and "View Docs" secondary link visible

### Phase 12 Verification Results

All success criteria verified:
- /product, /pricing, /enterprise redirect to / (307)
- /blog returns 200 (restored per user request)
- /trust, /terms, /privacy return 200
- Build succeeds with no broken imports

### Brand Identity

**Product:** Agent Governance Platform - control plane for agent actions
**Voice:** Calm, precise, mechanism-first, evidence-first
**Messaging pillars:**
1. Enforceable Policy - allow/deny/approve at the gateway
2. Identity + Least Privilege - RBAC for agents, tools, and actions
3. Audit-Grade Evidence - logs + decision traces

### Pending Todos

None

### Blockers/Concerns

- Logo and brand assets needed from user before visual rebrand phase

## Session Continuity

Last session: 2026-01-26
Stopped at: Completed 15-02-PLAN.md (Pillars Section)
Resume: `/gsd:execute-plan .planning/phases/15-value-proposition/15-03-PLAN.md` (Homepage Integration)
