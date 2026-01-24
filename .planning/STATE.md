# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-23)

**Core value:** Get a professional, working marketing website deployed to axite.ai using battle-tested code instead of AI-generated slop.
**Current focus:** v1.1 Axite Rebrand - Phase 10 in progress

## Current Position

Milestone: v1.1 Axite Rebrand
Phase: 10 of 12 (Content Pages)
Plan: 6 of 7 complete (10-01, 10-02, 10-03, 10-04, 10-05, 10-06)
Status: In progress
Last activity: 2026-01-24 - Completed 10-05-PLAN.md (Product Page)

Progress: [################....] 80% (10/12 phases in progress)

## Performance Metrics

**Velocity:**
- Total plans completed: 32 (15 v1.0 + 17 v1.1)
- Average duration: ~26 min
- Total execution time: ~13.6 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1-7 (v1.0) | 15 | ~11h | ~45 min |
| 8 (v1.1) | 6 | ~12 min | ~2 min |
| 9 (v1.1) | 5 | ~42 min | ~8 min |
| 10 (v1.1) | 6 | ~59 min | ~10 min |

*Updated after each plan completion*

## Accumulated Context

### Decisions

Key decisions logged in PROJECT.md Key Decisions table.
Full v1.0 decisions archived in .planning/milestones/v1.0-ROADMAP.md

Recent v1.1 decisions:
- Defer logo replacement to future milestone (user providing assets separately)
- Keep Supabase blog content unchanged (SEO considerations)
- Brand voice: calm, precise, mechanism-first, evidence-first
- Inter font chosen as primary geometric sans-serif (open source, UI-optimized)
- Font-weight 600 (semibold) for headings - confident but not heavy
- Selection color #93b4ff (light navy) for brand consistency
- Navy-to-teal gradient for hero text (maintains visual interest)
- Consistent navy (#3B63F3) for all SVG fills
- Keep social links as placeholders until Axite accounts available
- Simplified dropdown to two columns (Platform + Resources)
- Contact sales CTA replaces Sign in (no auth system yet)
- Mobile CTAs consistent with desktop: Contact sales + Get started
- ProductDropdown uses inline Axite data instead of MainProducts
- MainProducts kept as Supabase structure (homepage depends on those keys)
- Two-tier pricing: Sandbox (free, rate-limited) and Enterprise (custom)
- Sandbox: 1k requests/day, 7-day trace retention, community support
- Enterprise: Unlimited, extended retention, dedicated support, SSO, SLAs
- Deployment options: Managed Cloud, Private Deployment, Customer-Managed

### Brand Identity

**Product:** Agent Governance Platform - control plane for agent actions
**Voice:** Calm, precise, mechanism-first, evidence-first
**Messaging pillars:**
1. Enforceable Policy - allow/deny/approve at the gateway
2. Identity + Least Privilege - RBAC for agents, tools, and actions
3. Audit-Grade Evidence - logs + decision traces

**Colors:**
- Primary Navy: #3B63F3
- Accent Teal: #00B3A4

**Typography:**
- Font: Inter (geometric sans-serif)
- Headings: Semibold (600)

### Phase 10 Progress

**Plan 01 complete (Homepage Hero):**
- Hero.tsx: "Ship agents your security team can approve" headline
- MCP gateway, policy, RBAC, audit-grade logs in subheadline
- CTAs: "Try the sandbox" -> /docs/quickstart, "Book a security review" -> /contact/sales
- content.tsx: Updated heroSection and twitterSocialSection

**Plan 02 complete (Homepage Products):**
- ProductModules.tsx: Three governance pillars (Policy, Identity, Audit)
- Products/index.tsx: Agent Governance Platform overview card
- MCP Gateway card with policy routing description
- Removed all Supabase product cards and visuals
- New tagline: "One platform. Policy, identity, and audit..."

**Plan 03 complete (Pricing Page):**
- Two-tier pricing: Sandbox (free) and Enterprise (custom)
- Sandbox features: policy engine, RBAC, audit trails, MCP gateway (rate-limited)
- Enterprise features: unlimited API, SSO, SLAs, deployment options
- Simplified PricingPlans component for 2-column layout
- Removed compute/disk/addons sections (Supabase-specific)

**Plan 04 complete (Enterprise Page):**
- Enterprise page with Axite agent governance messaging
- Three deployment tiers: Managed Cloud, Private Deployment, Customer-Managed
- Customer-Managed shows design partner program messaging
- Honest SOC 2 status: "SOC 2 Type II (In Progress)"
- Security features: policy-as-code, audit logs, secrets protection, RBAC
- CTA: "Book a security review"

**Plan 05 complete (Product Page):**
- Product overview page at /product route
- Hero: "The control plane for AI agents" with navy-to-teal gradient
- How it works: 4-step flow (Agent -> Axite -> Tool -> Log)
- Three feature sections: Policy Enforcement, Identity & RBAC, Audit Trails
- MCP Gateway section highlighting native support
- CTAs: "Try the sandbox" and "Book a security review"

**Plan 06 complete (Trust & Security Page):**
- Trust center at /trust with Axite-branded security content
- SOC 2 Type II status: honest "In Progress" for enterprise transparency
- Eight security sections: SOC 2, encryption, logging, secrets, RBAC, infrastructure, vulnerability management, data handling
- Deployment options table matching pricing page structure
- Security contact: security@axite.ai for responsible disclosure

**Remaining plans:**
- 10-07: Phase verification

### Pending Todos

None

### Blockers/Concerns

- Logo and brand assets needed from user before visual rebrand phase
- FAQs section still shows Supabase content (future plan will update)

## Session Continuity

Last session: 2026-01-24
Stopped at: Completed 10-05-PLAN.md (Product Page)
Resume: Run `/gsd:execute-phase 10` to continue with 10-07 verification
