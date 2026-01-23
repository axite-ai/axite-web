---
phase: 01-foundation-extraction
plan: 02
subsystem: infra
tags: [pnpm, workspace, monorepo, dependencies, npm]

# Dependency graph
requires:
  - phase: 01-01
    provides: Extracted Supabase www source with workspace:* and catalog: protocol references
provides:
  - Converted dependency declarations using file: protocol
  - Generated pnpm-lock.yaml proving successful install
  - Installable standalone monorepo workspace
affects:
  - 01-03 (package audit - can now run analysis tools)
  - 02-* (content transformation - can run Next.js build tools)
  - 03-* (component extraction - can run TypeScript tools)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - file: protocol for internal workspace dependencies
    - Explicit semver versions instead of catalog references

key-files:
  created:
    - pnpm-lock.yaml
  modified:
    - apps/www/package.json
    - packages/*/package.json (14 files)
    - package.json
    - pnpm-workspace.yaml

key-decisions:
  - "Convert all 19 catalog: entries to explicit semver versions"
  - "Use file: relative paths instead of workspace:* for all internal dependencies"
  - "Remove only-allow pnpm preinstall scripts to avoid package manager enforcement"

patterns-established:
  - "Protocol conversion pattern: one-time script to transform all package.json files"
  - "Dependency resolution: file:../../packages/name pattern for cross-package references"

# Metrics
duration: 4min
completed: 2026-01-22
---

# Phase 1 Plan 2: Protocol Conversion Summary

**Converted 14 package.json files from pnpm workspace/catalog protocols to standard file:/semver formats, enabling successful pnpm install with 1852 packages**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-23T01:37:10Z
- **Completed:** 2026-01-23T01:41:08Z
- **Tasks:** 2
- **Files modified:** 16 (14 package.json + pnpm-workspace.yaml + pnpm-lock.yaml)

## Accomplishments
- Converted all workspace:* and workspace: references to file: relative paths
- Converted all catalog: references to explicit semver versions from catalog section
- Removed preinstall scripts enforcing pnpm package manager
- Fixed catalog: references in pnpm-workspace.yaml overrides section
- Successfully ran pnpm install with 1852 packages resolved

## Task Commits

Each task was committed atomically:

1. **Task 1: Create and run protocol conversion script** - `8672553` (chore)
   - Converted 14 package.json files
   - Removed only-allow pnpm preinstall scripts
   - Deleted one-time conversion script after use

2. **Task 2: Run pnpm install and verify success** - `5c22d7e` (chore)
   - Fixed catalog: references in workspace overrides
   - Generated pnpm-lock.yaml (711KB)
   - Verified all 1852 packages installed successfully

## Files Created/Modified
- `apps/www/package.json` - Converted 20 protocol references to semver/file
- `packages/ui/package.json` - Converted 14 protocol references
- `packages/ui-patterns/package.json` - Converted 19 protocol references
- `packages/common/package.json` - Converted 15 protocol references
- `packages/ai-commands/package.json` - Converted 9 protocol references
- `packages/*/package.json` - All 14 packages updated
- `package.json` - Root workspace package updated (5 catalog references)
- `pnpm-workspace.yaml` - Fixed 3 catalog references in overrides section
- `pnpm-lock.yaml` - Generated lockfile with all dependencies resolved

## Decisions Made
- Used simple YAML string parsing instead of external YAML library (no pnpm available yet)
- Deleted conversion script after use per CONTEXT.md (one-time migration tool)
- Preserved catalog section in pnpm-workspace.yaml even though unused (informational)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed catalog: references in pnpm-workspace.yaml overrides**
- **Found during:** Task 2 (pnpm install)
- **Issue:** pnpm-workspace.yaml overrides section had 'catalog:' references that pnpm couldn't resolve
- **Fix:** Manually converted 3 catalog: references in overrides to ^7.1.11 (vite version)
- **Files modified:** pnpm-workspace.yaml
- **Verification:** pnpm install completed successfully
- **Committed in:** 5c22d7e (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Fix was necessary for pnpm install to complete. No scope creep.

## Issues Encountered
- TypeScript errors exist in the codebase (expected at this phase - module resolution for Supabase-specific paths)
- These are acceptable per plan - Phase 2 will address content transformation

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- pnpm install successful - all development tools available
- Ready for Plan 03: Package Audit to identify unused/needed packages
- TypeScript and Next.js build tools can now be invoked for analysis

---
*Phase: 01-foundation-extraction*
*Completed: 2026-01-22*
