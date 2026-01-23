---
phase: 07-production-build
plan: 01
subsystem: build
tags: [mdx, tailwind, dependencies, production-build]

# Dependency graph
requires:
  - phase: 06-visual-qa
    provides: working dev environment
provides:
  - "@mdx-js/loader dependency installed"
  - "Valid Tailwind CSS gradient classes"
affects: [07-02, 07-03, production-build]

# Tech tracking
tech-stack:
  added: ["@mdx-js/loader ^2.3.0"]
  patterns: []

key-files:
  created: []
  modified:
    - apps/www/package.json
    - apps/www/styles/career.module.css

key-decisions:
  - "Use @mdx-js/loader ^2.3.0 to match existing @mdx-js/react version"
  - "Use background-alternative-default color token (full name) for gradients"

patterns-established: []

# Metrics
duration: 4min
completed: 2026-01-23
---

# Phase 7 Plan 1: Fix Missing Dependency and Invalid CSS Summary

**Added @mdx-js/loader dependency and corrected Tailwind gradient class to resolve two specific build blockers**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-23
- **Completed:** 2026-01-23
- **Tasks:** 2
- **Files modified:** 3 (package.json, pnpm-lock.yaml, career.module.css)

## Accomplishments
- Installed @mdx-js/loader ^2.3.0 required by @next/mdx
- Fixed invalid Tailwind CSS class from-background-alternative to from-background-alternative-default
- Both targeted build errors resolved (verified via pnpm build)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add missing @mdx-js/loader dependency** - `d1d57b0` (chore)
2. **Task 2: Fix invalid Tailwind gradient class** - `7fb1d45` (fix)

## Files Created/Modified
- `apps/www/package.json` - Added @mdx-js/loader dependency
- `pnpm-lock.yaml` - Updated lockfile after pnpm install
- `apps/www/styles/career.module.css` - Fixed gradient class names

## Decisions Made
- Used @mdx-js/loader ^2.3.0 to match existing @mdx-js/react version in dependencies
- Used full color token name `background-alternative-default` for gradient from/to classes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - both fixes applied cleanly and verified via build.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Build still fails with ai-commands/edge module error
- Plan 02 will address remaining module resolution errors
- Two targeted errors from this plan confirmed resolved

---
*Phase: 07-production-build*
*Completed: 2026-01-23*
