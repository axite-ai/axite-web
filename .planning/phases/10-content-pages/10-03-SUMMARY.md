---
phase: 10-content-pages
plan: 03
subsystem: ui
tags: [pricing, react, nextjs, axite]

# Dependency graph
requires:
  - phase: 09-navigation-cleanup
    provides: Navigation with Axite branding
provides:
  - Two-tier pricing model (Sandbox/Enterprise)
  - Axite pricing data structure
  - Simplified pricing page layout
affects: [faq-update, homepage, cta-components]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Two-tier pricing with Sandbox (free) and Enterprise (custom)
    - Rate-limited free tier with full feature access

key-files:
  modified:
    - lib/shared-data/plans.ts
    - apps/www/pages/pricing.tsx
    - apps/www/components/Pricing/PricingPlans.tsx

key-decisions:
  - "Sandbox tier: Free with all features, rate-limited (1k requests/day, 7-day trace retention)"
  - "Enterprise tier: Custom pricing with deployment options (Managed/Private/Customer-Managed)"
  - "CTAs: 'Try the sandbox' and 'Book a security review' match Axite's sales motion"
  - "Removed Pro/Team tiers - not applicable to Axite's B2B model"
  - "2-column layout for pricing cards (was 4-column for Supabase's 4 tiers)"

patterns-established:
  - "Pricing page simplified for two-tier model"
  - "PricingPlans component refactored for Sandbox/Enterprise only"

# Metrics
duration: 19min
completed: 2026-01-23
---

# Phase 10 Plan 03: Pricing Page Summary

**Two-tier Axite pricing: Sandbox (free, rate-limited) and Enterprise (custom, deployment options) with simplified UI**

## Performance

- **Duration:** 19 min
- **Started:** 2026-01-24T01:03:01Z
- **Completed:** 2026-01-24T01:22:12Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Replaced Supabase's 4-tier pricing (Free/Pro/Team/Enterprise) with Axite's 2-tier model
- Sandbox tier shows full feature access with rate limits (policy engine, RBAC, audit trails, MCP gateway)
- Enterprise tier highlights deployment options (Managed Cloud, Private, Customer-Managed)
- Updated page headline to "Simple pricing for agent governance"
- Removed unused pricing sections (compute, disk, addons, comparison table)

## Task Commits

Each task was committed atomically:

1. **Task 1: Update pricing plans data for Axite** - `f32d91b` (feat)
2. **Task 2: Update pricing page for Axite** - `21ca392` (feat)

## Files Created/Modified

- `lib/shared-data/plans.ts` - Axite pricing tier definitions (Sandbox/Enterprise)
- `apps/www/pages/pricing.tsx` - Simplified pricing page for Axite
- `apps/www/components/Pricing/PricingPlans.tsx` - 2-column layout, removed Pro/Team logic

## Decisions Made

- **Sandbox features:** Full policy engine, Identity & RBAC, audit trails, MCP gateway proxy - all rate-limited
- **Sandbox limits:** 1,000 requests/day, 7-day decision trace retention
- **Enterprise features:** Unlimited API, extended retention, dedicated support, SSO, SLAs
- **Deployment options:** Managed Cloud (available now), Private (by request), Customer-Managed (design partner)
- **CTAs match sales motion:** "Try the sandbox" drives self-service, "Book a security review" for enterprise

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Updated PricingPlans component for 2-tier layout**
- **Found during:** Task 2 (Pricing page update)
- **Issue:** PricingPlans.tsx used 4-column grid and Pro/Team specific logic that would break with only 2 plans
- **Fix:** Changed to 2-column layout, removed organizations/UpgradePlan dependencies, updated Sandbox plan highlighting
- **Files modified:** apps/www/components/Pricing/PricingPlans.tsx
- **Verification:** TypeScript check passes for pricing files
- **Committed in:** 21ca392 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (blocking layout issue)
**Impact on plan:** Essential for correct visual layout with 2 tiers. No scope creep.

## Issues Encountered

None - plan executed smoothly with one expected component update.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Pricing page complete with Axite tiers
- FAQs section still shows Supabase content (future plan will update)
- CTABanner may need update to match pricing CTAs

---
*Phase: 10-content-pages*
*Plan: 03*
*Completed: 2026-01-23*
