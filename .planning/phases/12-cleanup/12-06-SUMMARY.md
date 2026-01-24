---
phase: 12-cleanup
plan: 06
subsystem: infra
tags: [redirects, nextjs, routing, 307]

# Dependency graph
requires:
  - phase: 12-cleanup
    provides: removed pages (product, pricing, enterprise, blog, solutions)
provides:
  - 307 redirects from removed page paths to homepage
  - catch-all redirects for /product/*, /blog/*, /solutions/*
affects: [future-pages, seo, analytics]

# Tech tracking
tech-stack:
  added: []
  patterns: [307-temporary-redirects-for-removed-pages]

key-files:
  created: []
  modified:
    - apps/www/lib/redirects.js

key-decisions:
  - "Use permanent: false (307) to allow pages to return in future"
  - "Add redirects at beginning of array to take precedence"

patterns-established:
  - "Temporary redirect pattern: use 307 for pages that may return"

# Metrics
duration: 1min
completed: 2026-01-24
---

# Phase 12 Plan 06: Add Redirects Summary

**307 redirects from removed pages (/product, /pricing, /enterprise, /blog, /solutions) to homepage using temporary redirects for flexibility**

## Performance

- **Duration:** 1 min
- **Started:** 2026-01-24T00:00:00Z
- **Completed:** 2026-01-24T00:01:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Added 7 redirect rules covering all removed page paths
- Used permanent: false (307) for future flexibility
- Catch-all patterns for nested paths (/product/*, /blog/*, /solutions/*)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add redirects for removed pages** - `27ca51c` (feat)

## Files Created/Modified

- `apps/www/lib/redirects.js` - Added 7 new redirects at beginning of array

## Decisions Made

- Used `permanent: false` (307 redirect) instead of permanent (308/301) because these pages may return in the future
- Added redirects at beginning of the existing array so they take precedence over any existing redirects

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All removed pages now redirect to homepage
- Ready for navigation cleanup (12-07)

---
*Phase: 12-cleanup*
*Completed: 2026-01-24*
