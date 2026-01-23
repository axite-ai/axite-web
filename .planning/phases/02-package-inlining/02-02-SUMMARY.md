---
phase: 02
plan: 02
subsystem: build-config
tags: [typescript, module-resolution, path-aliases, package-cleanup]

dependency-graph:
  requires: ["02-01"]
  provides: ["tsconfig-path-aliases", "clean-package-deps"]
  affects: ["03-01"]

tech-stack:
  added: []
  patterns: ["TypeScript path aliases for monorepo-to-monolith conversion"]

key-files:
  created: []
  modified:
    - tsconfig.json
    - lib/icons/package.json
    - lib/common/package.json
    - lib/shared-data/package.json
    - lib/ui/package.json
    - lib/ui-patterns/package.json

decisions:
  - id: moduleResolution-bundler
    choice: "Use moduleResolution: bundler"
    reason: "Modern Next.js 13+ standard, better ESM support"
  - id: dual-path-patterns
    choice: "Both bare and subpath patterns for each package"
    reason: "Supports both 'ui' and 'ui/Button' import styles"
  - id: remove-all-file-deps
    choice: "Remove all file: dependencies, not just icons"
    reason: "TypeScript path aliases handle resolution; file: deps reference non-existent monorepo paths"

metrics:
  duration: 4 min
  completed: 2026-01-23
---

# Phase 2 Plan 2: Configure tsconfig.json Path Aliases Summary

TypeScript path aliases configured for all 7 inlined packages; monorepo file: dependencies removed from lib/ package.json files.

## What Was Done

### Task 1: Configure tsconfig.json with Path Aliases
- Replaced minimal tsconfig.json with complete configuration
- Inlined settings from packages/tsconfig/base.json and nextjs.json
- Added path aliases for all 7 packages (ui, common, icons, config, shared-data, ui-patterns, api-types)
- Each package has both bare import (`"ui"`) and subpath (`"ui/*"`) patterns
- Uses `moduleResolution: "bundler"` (modern Next.js standard)
- Excludes packages/ directory since we use lib/ now

### Task 2: Remove file: Protocol Dependencies
- Found file: dependencies in 5 packages (not just icons as expected)
- Removed from icons: `@supabase/build-icons: file:../build-icons`
- Removed from common: `api-types`, `config`, `tsconfig` (all file:)
- Removed from shared-data: `tsconfig` (file:)
- Removed from ui: `common`, `config`, `tsconfig` (all file:)
- Removed from ui-patterns: `common`, `icons`, `tsconfig`, `ui`, `api-types` (all file:)

### Task 3: Verify TypeScript Resolution
- Ran TypeScript compiler in noEmit mode
- Confirmed 0 "Cannot find module" errors for the 7 inlined packages
- Other errors exist (Supabase-specific paths like `lib/posts`, `~/lib/constants`) - expected

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Additional file: dependencies in multiple packages**
- **Found during:** Task 2
- **Issue:** Plan only mentioned icons/package.json, but 5 packages had file: deps
- **Fix:** Cleaned all file: dependencies from common, shared-data, ui, ui-patterns
- **Files modified:** lib/common/package.json, lib/shared-data/package.json, lib/ui/package.json, lib/ui-patterns/package.json
- **Commits:** ed61acf

## Verification Results

```
All packages exist in lib/: PASS (7/7 directories)
Path aliases in tsconfig.json: PASS (7 aliases)
No file: dependencies: PASS (0 remaining)
TypeScript resolves packages: PASS (0 module errors)
```

## Key Artifacts

### tsconfig.json Path Configuration
```json
{
  "paths": {
    "ui": ["./lib/ui"],
    "ui/*": ["./lib/ui/*"],
    "common": ["./lib/common"],
    "common/*": ["./lib/common/*"],
    "shared-data": ["./lib/shared-data"],
    "shared-data/*": ["./lib/shared-data/*"],
    "config": ["./lib/config"],
    "config/*": ["./lib/config/*"],
    "icons": ["./lib/icons"],
    "icons/*": ["./lib/icons/*"],
    "ui-patterns": ["./lib/ui-patterns"],
    "ui-patterns/*": ["./lib/ui-patterns/*"],
    "api-types": ["./lib/api-types"],
    "api-types/*": ["./lib/api-types/*"],
    "@/*": ["./*"]
  }
}
```

## Next Phase Readiness

Phase 2 (Package Inlining) is now complete:
- Plan 02-01: Copied 613 source files to lib/
- Plan 02-02: Configured path aliases and cleaned dependencies

Ready for Phase 3: Content Transformation
- TypeScript can resolve all inlined package imports
- No monorepo-specific dependencies remain
- Supabase-specific code still exists (expected - Phase 3 will address)
