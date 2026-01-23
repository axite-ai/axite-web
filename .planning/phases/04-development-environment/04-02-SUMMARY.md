---
phase: 04-development-environment
plan: 02
subsystem: common
tags: [instrumentation, sentry, no-op, stubs, common-package]

# Dependency graph
requires:
  - phase: 03-project-configuration
    provides: TypeScript and path aliases configured
provides:
  - Common package exports verified and documented
  - Sentry instrumentation removed and converted to no-op stubs
affects: [05-content-transformation, all-future-phases]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - No-op stub pattern for removed integrations

key-files:
  created: []
  modified:
    - apps/www/instrumentation.ts

key-decisions:
  - "Remove Sentry integration completely per Phase 3 decision"
  - "Preserve instrumentation function signatures for future error capture"
  - "Common package already exports all required utilities - no changes needed"

patterns-established:
  - "No-op stub pattern: Keep function signatures, add comments explaining removal reason"
  - "Future error capture setup: Install @sentry/nextjs and configure NEXT_PUBLIC_SENTRY_DSN"

# Metrics
duration: 3min
completed: 2026-01-23
---

# Phase 4 Plan 2: Common Package Stubs and Instrumentation Summary

**Verified common package exports complete; removed Sentry instrumentation with no-op stubs preserving function signatures**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-23T04:40:34Z
- **Completed:** 2026-01-23T04:43:23Z
- **Tasks:** 2
- **Files modified:** 3 (1 modified, 2 deleted)

## Accomplishments

- Verified all commonly imported utilities from 'common' package are already exported
- Removed Sentry integration completely (instrumentation.ts, sentry.server.config.ts, sentry.edge.config.ts)
- Preserved instrumentation function signatures with no-op implementations for future error capture

## Task Commits

Each task was committed atomically:

1. **Task 1: Ensure common package exports work or are stubbed** - No commit needed (exports already complete)
2. **Task 2: Clean up instrumentation file** - `d3bf71c` (chore)

## Files Created/Modified

- `apps/www/instrumentation.ts` - Converted to no-op stubs, removed Sentry imports
- `apps/www/sentry.server.config.ts` - DELETED
- `apps/www/sentry.edge.config.ts` - DELETED

## Verified Common Exports

All utilities imported by apps/www components are already exported from lib/common:

| Utility | Source File | Status |
|---------|-------------|--------|
| useBreakpoint | hooks/useBreakpoint.tsx | Exported |
| useFlag | feature-flags.tsx | Exported |
| useIsLoggedIn | auth.tsx | Exported |
| useIsUserLoading | auth.tsx | Exported |
| isBrowser | helpers.ts | Exported |
| detectBrowser | helpers.ts | Exported |
| useReducedMotion | helpers.ts | Exported |
| getAccessToken | auth.tsx | Exported |
| LOCAL_STORAGE_KEYS | constants/local-storage.ts | Exported |
| IS_PLATFORM | constants/environment.ts | Exported |
| AuthProvider | auth.tsx | Exported |
| FeatureFlagProvider | feature-flags.tsx | Exported |
| ThemeProvider | Providers.tsx | Exported |
| PageTelemetry | telemetry.tsx | Exported |
| TelemetryTagManager | telemetry.tsx | Exported |
| sendTelemetryEvent | telemetry.tsx | Exported |
| useThemeSandbox | hooks/useThemeSandbox.tsx | Exported |
| logOut | auth.tsx | Exported |

## Decisions Made

1. **No changes to common package** - All required utilities were already exported via barrel file (index.tsx) that re-exports from submodules
2. **Complete Sentry removal** - Per Phase 3 decision to "Remove Sentry integration entirely"
3. **Preserve function signatures** - Kept `register()` and `onRequestError()` as no-ops for potential future error capture

## Deviations from Plan

None - plan executed exactly as written.

Note: Task 1 required no code changes because verification showed all exports were already in place. The plan anticipated potentially needing to add stubs, but the common package was already correctly configured.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Common package exports verified complete
- Sentry removed cleanly with no lingering references
- Instrumentation ready for future error capture implementation
- Ready for Plan 03 (TypeScript build verification)

---
*Phase: 04-development-environment*
*Completed: 2026-01-23*
