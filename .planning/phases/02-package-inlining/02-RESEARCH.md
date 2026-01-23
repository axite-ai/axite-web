# Phase 2: Package Inlining - Research

**Researched:** 2026-01-22
**Domain:** Monorepo package extraction, TypeScript path aliases, file copying
**Confidence:** HIGH

## Summary

This phase involves copying packages from the Supabase monorepo into a standalone project structure and configuring TypeScript to resolve imports without modifying existing source code. The research confirms that **path aliases in tsconfig.json** are the correct approach for import resolution, and **rsync with exclude patterns** is the standard tool for selective file copying.

Key findings:
1. The dependency graph requires **7 packages** to be inlined, not 6 (api-types is required by common and ui-patterns)
2. Path alias configuration in Next.js is straightforward - it natively supports tsconfig paths
3. The icons package contains pre-built TypeScript components, no build step needed
4. Cross-package dependencies form a clear hierarchy that can be resolved via path aliases

**Primary recommendation:** Copy packages to `lib/` using rsync with exclusion patterns, then configure tsconfig.json paths to map bare imports (`'ui'`, `'common'`, etc.) to their new locations.

## Standard Stack

### Core Tools
| Tool | Purpose | Why Standard |
|------|---------|--------------|
| rsync | File copying with exclusions | Built-in, handles exclude patterns efficiently |
| tsconfig.json paths | Import resolution | Native TypeScript/Next.js support, no runtime overhead |
| baseUrl + paths | Module aliasing | Official TS approach, IDE support included |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| find + xargs | Batch file operations | For listing files matching patterns |
| cp -r | Simple directory copy | When no exclusions needed |
| git check-ignore | Verify .gitignore patterns | When excluding built artifacts |

### Not Needed
| Instead of | Don't Use | Why |
|------------|-----------|-----|
| Runtime path resolution | tsconfig-paths, module-alias | Next.js handles paths at build time |
| Webpack alias config | next.config.js aliases | tsconfig.json paths work automatically |
| Package bundling | tsc, esbuild for packages | Source files work directly with Next.js |

## Architecture Patterns

### Target Project Structure
```
lib/
├── ui/              # UI components (from packages/ui)
├── common/          # Shared utilities (from packages/common)
├── shared-data/     # Data constants (from packages/shared-data)
├── config/          # Tailwind/PostCSS config (from packages/config)
├── icons/           # Icon components (from packages/icons)
├── ui-patterns/     # Higher-level patterns (from packages/ui-patterns)
└── api-types/       # Type definitions (from packages/api-types)
```

### Package Dependency Hierarchy (Must Copy Order)
```
Level 0 (no internal deps):
├── config/          # No file: deps
├── icons/           # No file: deps (build-icons is dev only)
├── api-types/       # No file: deps
└── tsconfig/        # Inline to root (not copied as package)

Level 1 (depends on Level 0):
├── shared-data/     # Depends on: tsconfig (inline)
└── common/          # Depends on: api-types, config

Level 2 (depends on Level 1):
├── ui/              # Depends on: common, config
└── ui-patterns/     # Depends on: common, icons, ui, api-types
```

### tsconfig.json Path Configuration Pattern
```json
{
  "compilerOptions": {
    "baseUrl": ".",
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
}
```

### Anti-Patterns to Avoid
- **Modifying source imports:** Don't rewrite `import from 'ui'` to `import from './lib/ui'` - use tsconfig paths
- **Flattening package internals:** Keep each package's internal structure intact
- **Removing package.json files:** Keep them for internal module resolution hints
- **Building packages before copying:** Next.js compiles TypeScript directly

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| File copying with exclusions | Custom bash loop | rsync --exclude | Handles edge cases, faster |
| Import path rewriting | sed/awk scripts | tsconfig paths | IDE support, type checking |
| Package dependency analysis | Manual inspection | grep for `file:` deps | Already done in research |
| TypeScript compilation for packages | tsc builds | Next.js direct import | Next.js handles .tsx files |

**Key insight:** The monorepo already uses bare package names for imports (`from 'ui'`, `from 'common'`). TypeScript path aliases can redirect these without any code changes.

## Common Pitfalls

### Pitfall 1: Missing api-types Package
**What goes wrong:** Build fails with "Cannot find module 'api-types'"
**Why it happens:** api-types is listed as excluded but common and ui-patterns depend on it
**How to avoid:** Include api-types in inlined packages (updated from CONTEXT.md decision)
**Warning signs:** TypeScript errors mentioning `components` type from api-types

### Pitfall 2: Circular Path Alias Resolution
**What goes wrong:** TypeScript infinite loop or "maximum call stack" errors
**Why it happens:** Package A imports from B which imports from A via aliases
**How to avoid:** Verify dependency hierarchy is acyclic (it is - see hierarchy above)
**Warning signs:** Slow TypeScript compilation, IDE hanging

### Pitfall 3: Config Package Path Reference
**What goes wrong:** tailwind.config.js can't find `./ui.config.js` or color files
**Why it happens:** tailwind.config.js references `require('./../ui/build/css/tw-extend/color')`
**How to avoid:** Update relative paths in config files after copying, or preserve relative structure
**Warning signs:** Tailwind build fails, missing CSS variables

### Pitfall 4: Package Entry Points Mismatch
**What goes wrong:** `import { Button } from 'ui'` can't find Button
**Why it happens:** Package uses `"main": "./index.tsx"` but path alias points to directory
**How to avoid:** Ensure path aliases include both `"ui"` and `"ui/*"` patterns
**Warning signs:** "Module has no exported member" errors

### Pitfall 5: icons Package Runtime Dependency on build-icons
**What goes wrong:** Build fails looking for @supabase/build-icons
**Why it happens:** icons/package.json lists build-icons as dependency
**How to avoid:** Remove build-icons from icons/package.json after copying (it's dev-only tooling)
**Warning signs:** pnpm install fails with missing package

### Pitfall 6: tsconfig Inheritance Breakage
**What goes wrong:** TypeScript errors about missing compiler options
**Why it happens:** Packages use `"extends": "tsconfig/react-library.json"`
**How to avoid:** Inline tsconfig base configurations into root tsconfig.json
**Warning signs:** "Unknown compiler option" errors

## Code Examples

### rsync Copy with Exclusions
```bash
# Source: Standard rsync pattern for selective copying
rsync -av --progress \
  --exclude='node_modules' \
  --exclude='*.test.ts' \
  --exclude='*.test.tsx' \
  --exclude='*.spec.ts' \
  --exclude='__tests__' \
  --exclude='__mocks__' \
  --exclude='coverage' \
  --exclude='.turbo' \
  --exclude='dist' \
  --exclude='build' \
  packages/ui/ lib/ui/
```

### Complete tsconfig.json with Inlined Base
```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
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
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Verifying Import Resolution
```bash
# After copying, verify TypeScript can resolve all imports
npx tsc --noEmit

# Check for unresolved modules
npx tsc --noEmit 2>&1 | grep "Cannot find module"
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `"moduleResolution": "node"` | `"moduleResolution": "bundler"` | TypeScript 5.0 | Better ESM support |
| tsconfig-paths runtime | Native bundler support | Next.js 12+ | No runtime overhead |
| Custom webpack aliases | tsconfig paths | Next.js 13+ | Single source of truth |

**Current best practice:** Use `"moduleResolution": "bundler"` with tsconfig paths. Next.js automatically resolves paths at build time without additional configuration.

## Open Questions

1. **Tailwind config path updates**
   - What we know: config/tailwind.config.js references `require('./../ui/build/css/tw-extend/color')`
   - What's unclear: Whether this file is generated or hand-written, exact update needed
   - Recommendation: Audit path references in config package, update after copying

2. **ui-patterns subpath exports**
   - What we know: ui-patterns has extensive subpath exports in package.json
   - What's unclear: Whether these work with tsconfig paths or need additional handling
   - Recommendation: Test subpath imports like `from 'ui-patterns/CommandMenu'` after setup

3. **package.json main fields**
   - What we know: Each package has `"main": "./index.tsx"` or similar
   - What's unclear: Whether tsconfig paths use package.json main or just directory resolution
   - Recommendation: Include both patterns (`"ui"` and `"ui/*"`) to cover both cases

## Sources

### Primary (HIGH confidence)
- Monorepo source analysis - Direct inspection of packages/*/package.json
- TypeScript documentation - https://www.typescriptlang.org/tsconfig/#paths
- Next.js documentation - https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases

### Secondary (MEDIUM confidence)
- rsync documentation - https://linuxize.com/post/how-to-exclude-files-and-directories-with-rsync/
- TypeScript path aliases patterns - https://dev.to/larswaechter/path-aliases-with-typescript-in-nodejs-4353

### Package Dependency Analysis (HIGH confidence)
Directly extracted from package.json files:
- `ui` depends on: common, config, tsconfig
- `common` depends on: api-types, config, tsconfig
- `shared-data` depends on: tsconfig
- `config` depends on: (none)
- `icons` depends on: build-icons (dev only, can remove)
- `ui-patterns` depends on: common, icons, ui, api-types, tsconfig
- `api-types` depends on: (none)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Native TypeScript/Next.js features, well-documented
- Architecture: HIGH - Direct source analysis of existing packages
- Pitfalls: HIGH - Identified from dependency analysis and known patterns

**Research date:** 2026-01-22
**Valid until:** Stable - no external dependencies that change frequently

**Critical Update from Research:**
The CONTEXT.md lists api-types as excluded, but dependency analysis shows it's required by both `common` and `ui-patterns`. The package list should be updated to include 7 packages, not 6.
