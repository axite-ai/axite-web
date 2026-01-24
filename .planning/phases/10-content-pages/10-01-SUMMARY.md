---
phase: 10
plan: 01
subsystem: homepage
tags: [hero, content, messaging, CTAs]
dependency-graph:
  requires: [09-navigation]
  provides: [homepage-hero, axite-value-prop]
  affects: [10-02, 10-03, 10-04]
tech-stack:
  added: []
  patterns: [component-messaging, content-data-separation]
key-files:
  created: []
  modified:
    - apps/www/components/Hero/Hero.tsx
    - apps/www/data/home/content.tsx
decisions: []
metrics:
  duration: ~5 min
  completed: 2026-01-24
---

# Phase 10 Plan 01: Homepage Hero Update Summary

**One-liner:** Axite hero with governance value prop - "Ship agents your security team can approve" headline, MCP/RBAC/audit subheadline, sandbox and sales CTAs.

## What Was Done

### Task 1: Update Hero Component with Axite Messaging
- **Commit:** `b8a7f72`
- **Files:** `apps/www/components/Hero/Hero.tsx`
- **Changes:**
  - Headline: "Ship agents your security team can approve" (outcome-first messaging)
  - Subheadline: Agent governance control plane with MCP gateway, policy, RBAC, audit-grade logs
  - Primary CTA: "Try the sandbox" linking to /docs/quickstart
  - Secondary CTA: "Book a security review" linking to /contact/sales
  - Preserved navy-to-teal gradient on second headline line
  - Removed Supabase dashboard links and `as` prop from Link components

### Task 2: Update Home Content Data for Axite
- **Commit:** `e59d8dd`
- **Files:** `apps/www/data/home/content.tsx`
- **Changes:**
  - Updated heroSection heading to match Hero component
  - Updated heroSection subheading with Axite governance description
  - CTA label: "Try the sandbox" with /docs/quickstart link
  - Secondary CTA: "Book a security review" with /contact/sales link
  - Twitter section: Changed subheading to "Discover what developers are saying about Axite."

## Technical Details

### Hero Component Structure
```tsx
<h1>
  <span>Ship agents your</span>
  <span className="...gradient...">security team can approve</span>
</h1>
<p>
  Axite is the agent governance control plane.
  Start your deployment with an MCP gateway, centralized policy (allow/deny/approve),
  RBAC, approvals, and audit-grade logs with decision traces.
</p>
<Button>Try the sandbox</Button>
<Button type="default">Book a security review</Button>
```

### Content Data Structure
The `content.tsx` file provides data for homepage sections that may be consumed by components other than the direct Hero component. Both files were updated to maintain consistency.

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

| Check | Result |
|-------|--------|
| "Ship agents" in Hero | Pass |
| "MCP gateway" in Hero | Pass |
| "Try the sandbox" CTA | Pass |
| "Book a security review" CTA | Pass |
| No Supabase references in Hero | Pass (0 matches) |
| Content data updated | Pass |

## What This Enables

- Homepage now displays Axite value proposition
- Clear call-to-action path: sandbox trial or sales conversation
- Foundation for remaining content page updates (pricing, product sections)
- Consistent messaging with navigation (Phase 9)

## Next Steps

- 10-02: Product sections update (features below hero)
- 10-03: Pricing page update
- 10-04: Additional content pages
