---
phase: 02-package-inlining
plan: 03
subsystem: config
tags: [typescript, tsconfig, path-aliases, module-resolution]

# Dependency graph
requires:
  - phase: 02-02
    provides: Root tsconfig.json with path aliases pointing to lib/
provides:
  - apps/www tsconfig.json with path aliases pointing to lib/ packages
affects: [03-content-cleanup, 04-homepage]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Relative path aliases from apps/www to lib/ (../../lib/*)"
    - "Both bare and subpath patterns for each package alias"

key-files:
  created: []
  modified:
    - apps/www/tsconfig.json

key-decisions:
  - "Keep contentlayer, ~/* and @/* aliases for backwards compatibility"
  - "Remove include of packages/ui type definitions (no longer needed)"
  - "Use ../../lib/ relative paths from apps/www to lib/"

patterns-established:
  - "apps/www path aliases mirror root tsconfig but with correct relative paths"

# Metrics
duration: 2min
completed: 2026-01-23
---

# Phase 2 Plan 3: Wire apps/www tsconfig to lib/ Summary

**apps/www tsconfig.json now resolves all 7 inlined packages from lib/ via TypeScript path aliases**

## Performance

- **Duration:** 2 min
- **Started:** 2026-01-23T02:35:03Z
- **Completed:** 2026-01-23T02:36:48Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Updated apps/www/tsconfig.json path aliases to point to lib/ instead of packages/
- Added path aliases for all 7 inlined packages (ui, common, icons, config, shared-data, ui-patterns, api-types)
- Verified TypeScript compiler resolves all inlined packages without "Cannot find module" errors
- Closed Gap 1 from 02-VERIFICATION.md

## Task Commits

Each task was committed atomically:

1. **Task 1: Update apps/www/tsconfig.json path aliases** - `3cc411e` (feat)
2. **Task 2: Verify TypeScript can resolve imports** - Verification only, no commit

**Plan metadata:** Pending (docs: complete plan)

## Files Created/Modified
- `apps/www/tsconfig.json` - Updated path aliases from packages/ to lib/

## Decisions Made
- Keep contentlayer, ~/* and @/* aliases for backwards compatibility with existing apps/www code
- Remove include of packages/ui type definitions (no longer needed since lib/ is local)
- Use ../../lib/ relative paths from apps/www directory to reach lib/ packages

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Gap 1 from 02-VERIFICATION.md is now closed
- apps/www TypeScript compilation resolves inlined packages from lib/
- Remaining TypeScript errors are expected (Supabase-specific code, old @ui/* patterns, missing npm dependencies in lib/)
- Ready for content cleanup phase to remove Supabase-specific code and update import patterns

---
*Phase: 02-package-inlining*
*Completed: 2026-01-23*
