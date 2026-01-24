---
phase: 13-header-hero
plan: 02
subsystem: ui
tags: [hero, marketing, copy, cta, next.js]

# Dependency graph
requires:
  - phase: 13-01
    provides: cleared navigation data for fresh start
provides:
  - outcome-focused hero headline and subhead
  - "Book Security Review" primary CTA linking to /contact/sales
  - "View Docs" secondary CTA linking to /docs
affects: [14-footer, 15-features, homepage]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - apps/www/components/Hero/Hero.tsx

key-decisions:
  - "Headline: 'Complete visibility and control over every agent action' - outcome-focused"
  - "Subhead: 'The agent governance platform for enterprises' - identifies audience"
  - "Primary CTA 'Book Security Review' links to /contact/sales (Calendly placeholder)"
  - "Secondary CTA 'View Docs' links to /docs"

patterns-established:
  - "Outcome-first messaging: communicate what users GET, not what product IS"

# Metrics
duration: 5min
completed: 2026-01-24
---

# Phase 13 Plan 02: Hero Messaging Summary

**Outcome-focused hero with "Complete visibility and control over every agent action" headline and Book Security Review / View Docs CTAs**

## Performance

- **Duration:** 5 min
- **Started:** 2026-01-24T17:39:28Z
- **Completed:** 2026-01-24T17:44:50Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Updated hero headline to outcome-focused messaging ("Complete visibility and control over every agent action")
- Updated subhead to identify target audience ("The agent governance platform for enterprises")
- Replaced CTAs: "Book Security Review" (primary, /contact/sales) and "View Docs" (secondary, /docs)
- Preserved existing visual layout and styling patterns

## Task Commits

Each task was committed atomically:

1. **Task 1: Update hero headline and subhead** - `d5f7feb` (feat)
2. **Task 2: Update hero CTAs** - `36e22a7` (feat)

## Files Created/Modified

- `apps/www/components/Hero/Hero.tsx` - Updated headline, subhead, and CTA buttons with outcome-focused messaging

## Decisions Made

- Used suggested headline "Complete visibility and control / over every agent action" - communicates outcome (visibility, control) rather than features
- Subhead follows brand voice: calm, precise, identifies what Axite is in one line
- Primary CTA is "Book Security Review" (sales-focused) over "Try sandbox" (self-serve)
- Secondary CTA "View Docs" provides path for technical evaluation

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Initial build failure due to cached artifacts (pre-existing issue unrelated to Hero changes)
- Resolved by clearing .next cache directory; build succeeded with all pages generated

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Hero section complete with:
- Outcome-focused messaging following brand voice
- CTAs linking to /contact/sales and /docs
- Visual layout preserved from Supabase foundation

Ready for remaining Phase 13 plans (header) when scheduled.

---
*Phase: 13-header-hero*
*Completed: 2026-01-24*
