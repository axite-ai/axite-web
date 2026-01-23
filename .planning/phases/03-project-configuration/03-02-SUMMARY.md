---
phase: 03-project-configuration
plan: 02
subsystem: infra
tags: [tailwindcss, postcss, css-variables, design-tokens]

# Dependency graph
requires:
  - phase: 02-package-inlining
    provides: lib/ directory structure with copied packages
provides:
  - Tailwind config that loads without build artifacts
  - PostCSS config self-contained with tailwindcss and autoprefixer
  - Content paths pointing to lib/ instead of packages/
  - Workspace configuration including lib/*
affects: [04-build-verification, css-styling, component-development]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - CSS variable stub pattern for design token replacement
    - Inline color token configuration

key-files:
  created: []
  modified:
    - lib/config/tailwind.config.js
    - apps/www/tailwind.config.js
    - apps/www/postcss.config.js
    - apps/www/package.json
    - pnpm-workspace.yaml

key-decisions:
  - "Replace build artifact dependency with inline color stub using CSS variables"
  - "Use relative paths from apps/www to lib/config"
  - "Inline PostCSS config instead of external require"
  - "Add lib/* to pnpm workspace for dependency resolution"
  - "Remove non-existent package dependencies (ai-commands, eslint-config-supabase)"

patterns-established:
  - "CSS variable stub pattern: { 'color-name': { cssVariable: 'var(--color-name)' } }"
  - "Relative path pattern: ../../lib/config/ from apps/www"

# Metrics
duration: 5min
completed: 2026-01-23
---

# Phase 3 Plan 2: Tailwind CSS Configuration Fix Summary

**Tailwind config with inline color token stub replacing missing design token build artifacts, plus workspace restructuring for lib/ packages**

## Performance

- **Duration:** 5 min (292 seconds)
- **Started:** 2026-01-23T03:43:36Z
- **Completed:** 2026-01-23T03:48:28Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Removed dependency on missing `lib/ui/build/css/tw-extend/color` build artifact
- Created inline color token stub with CSS variable references
- Updated Tailwind content paths from packages/ to lib/
- Made PostCSS configuration self-contained
- Fixed pnpm workspace to include lib/* packages
- Updated apps/www package.json file: paths to point to lib/

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove design token build dependency** - `5750869` (fix)
2. **Task 2: Update Tailwind content paths and inline PostCSS** - `d9de33f` (chore)

**Deviation fix:** `3ed53f8` (fix: workspace and package dependencies)

## Files Created/Modified

- `lib/config/tailwind.config.js` - Replaced build artifact require with inline color stub
- `apps/www/tailwind.config.js` - Updated require path and content paths to lib/
- `apps/www/postcss.config.js` - Inlined config with tailwindcss and autoprefixer
- `apps/www/package.json` - Changed file: paths from packages/ to lib/
- `pnpm-workspace.yaml` - Added lib/* to workspace packages
- `pnpm-lock.yaml` - Updated lockfile for new dependency resolution

## Decisions Made

1. **Inline color stub over rebuild**: Instead of regenerating the design token build process (which requires Figma tokens and Style Dictionary), created an inline stub that provides the same interface using CSS variable references.

2. **Relative paths over module aliases**: Changed `require('config/tailwind.config')` to `require('../../lib/config/tailwind.config')` for clearer dependency resolution without relying on pnpm workspace linking.

3. **Workspace restructuring**: Added `lib/*` to pnpm-workspace.yaml to enable proper dependency installation for lib/config package.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Updated pnpm workspace to include lib/**
- **Found during:** Task 2 verification (pnpm install)
- **Issue:** lib/config dependencies (deepmerge, @radix-ui/colors, etc.) weren't being installed because lib/* wasn't in pnpm workspace
- **Fix:** Changed pnpm-workspace.yaml to include `lib/*` instead of `packages/*`
- **Files modified:** pnpm-workspace.yaml, pnpm-lock.yaml
- **Verification:** pnpm install succeeds, Tailwind config loads
- **Committed in:** 3ed53f8

**2. [Rule 3 - Blocking] Updated apps/www package.json file: dependencies**
- **Found during:** Task 2 verification (pnpm install)
- **Issue:** file: dependencies still pointed to packages/ which was removed in Phase 2
- **Fix:** Changed all file:../../packages/ to file:../../lib/
- **Files modified:** apps/www/package.json
- **Verification:** pnpm install succeeds
- **Committed in:** 3ed53f8

**3. [Rule 3 - Blocking] Removed non-existent package dependencies**
- **Found during:** Task 2 verification (pnpm install)
- **Issue:** ai-commands and eslint-config-supabase were never copied to lib/ (intentionally excluded in Phase 2)
- **Fix:** Removed these dependencies from apps/www/package.json
- **Files modified:** apps/www/package.json
- **Verification:** pnpm install succeeds
- **Committed in:** 3ed53f8

---

**Total deviations:** 3 auto-fixed (all blocking issues)
**Impact on plan:** All fixes necessary to enable Tailwind config loading. These were dependency resolution issues from Phase 2's packages/ to lib/ migration that weren't fully addressed.

## Issues Encountered

- **CSS variables not validated**: The color stub references CSS variables (--foreground-default, --background-default, etc.) that must be defined in the app's global CSS. These variable definitions come from build artifacts that don't exist yet. This will need to be addressed in a future plan to provide fallback values or generate the CSS variables.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Tailwind and PostCSS configs load successfully
- Ready for build verification (next plan)
- **Note**: apps/www/styles/index.css still imports from `packages/ui/build/css/` which will fail at build time. This should be addressed in subsequent configuration fixes.

---
*Phase: 03-project-configuration*
*Plan: 02*
*Completed: 2026-01-23*
