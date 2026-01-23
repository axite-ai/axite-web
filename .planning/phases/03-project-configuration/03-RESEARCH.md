# Phase 3: Project Configuration - Research

**Researched:** 2026-01-22
**Domain:** Next.js 15 / TypeScript 5.9 / Tailwind CSS 3.4 configuration
**Confidence:** HIGH

## Summary

This phase focuses on configuring a standalone Next.js 15.5.9 project that was extracted from a Supabase monorepo. The main challenges are:

1. **TypeScript path aliases** - The codebase has 480+ imports using bare module names (`ui`, `common`, `icons`, etc.) that need to resolve to the inlined `lib/` packages
2. **Tailwind configuration** - The current config requires a generated `lib/ui/build/css/tw-extend/color` file that doesn't exist, and references old `packages/` paths
3. **next.config.mjs cleanup** - Remove `transpilePackages` for packages that are now local, and clean Supabase-specific config
4. **Shared tsconfig** - The lib packages extend `tsconfig/react-library.json` which doesn't exist

**Primary recommendation:** Create a shared tsconfig base in `lib/tsconfig/`, update all path aliases in `apps/www/tsconfig.json`, simplify Tailwind config to bypass the missing design token build, and clean next.config.mjs of transpilePackages for local packages.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.9 | React framework | Already in use |
| TypeScript | ~5.9.0 | Type checking | Already in use |
| Tailwind CSS | 3.4.1 | Utility CSS | Already in use, v3 per CONTEXT.md |
| PostCSS | ^8.5.3 | CSS processing | Required by Tailwind |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/typography | ^0.5.9 | Prose styling | MDX/blog content |
| @tailwindcss/forms | ^0.5.0 | Form styling | Form elements |
| tailwindcss-animate | ^1.0.6 | Animation utilities | UI animations |
| tailwindcss-radix | ^2.0.0 | Radix UI states | Radix component styling |
| @mertasan/tailwindcss-variables | ^2.2.3 | CSS variable utilities | Theme variables |
| @radix-ui/colors | ^0.1.8 | Color palette | Design system colors |

### No Alternatives Needed
These are locked per CONTEXT.md - no alternatives to research.

## Architecture Patterns

### Recommended tsconfig.json Structure for apps/www

The current `apps/www/tsconfig.json` needs updates to use `moduleResolution: "bundler"` (already set) and proper path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "moduleResolution": "bundler",
    "module": "esnext",
    "paths": {
      // Bare module imports (most common pattern in codebase)
      "ui": ["../../lib/ui/index.tsx"],
      "ui/*": ["../../lib/ui/*"],
      "common": ["../../lib/common/index.ts"],
      "common/*": ["../../lib/common/*"],
      "icons": ["../../lib/icons/index.ts"],
      "icons/*": ["../../lib/icons/*"],
      "shared-data": ["../../lib/shared-data/index.ts"],
      "shared-data/*": ["../../lib/shared-data/*"],
      "config": ["../../lib/config"],
      "config/*": ["../../lib/config/*"],
      "ui-patterns": ["../../lib/ui-patterns/index.tsx"],
      "ui-patterns/*": ["../../lib/ui-patterns/*"],
      "api-types": ["../../lib/api-types/index.ts"],
      "api-types/*": ["../../lib/api-types/*"],

      // @ prefixed imports (less common, but exist)
      "@ui": ["../../lib/ui/index.tsx"],
      "@ui/*": ["../../lib/ui/*"],

      // Backwards compatibility
      "contentlayer/generated": ["./.contentlayer/generated"],
      "~/*": ["./*"],
      "@/*": ["./*"]
    }
  }
}
```

### Shared tsconfig Base for lib/ Packages

Create `lib/tsconfig/react-library.json`:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "display": "React Library",
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["dom", "dom.iterable", "ES2021"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "noEmit": true,
    "isolatedModules": true
  }
}
```

### Tailwind Content Paths (Updated for lib/)

```javascript
content: [
  // App code
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{tsx,mdx}',
  './components/**/*.tsx',
  './data/**/*.tsx',
  './layouts/**/*.tsx',
  './lib/mdx/**/*.tsx',
  './_blog/*.mdx',

  // Inlined packages (updated from packages/ to lib/)
  '../../lib/ui/**/*.{tsx,ts,js}',
  '../../lib/ui-patterns/**/*.{tsx,ts,js}',
]
```

### Anti-Patterns to Avoid
- **Over-broad content paths:** Don't use `../../lib/**/*` - scan only directories with JSX/TSX
- **Missing shared tsconfig:** Don't leave lib packages extending non-existent config
- **transpilePackages for local code:** Remove local packages from transpilePackages

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Design token generation | Custom CSS variable system | Keep Supabase's existing token system but stub the build output | Complex design system, lots of edge cases |
| Color palette | Custom color scales | @radix-ui/colors already configured | Well-tested, accessible color scales |
| Path alias resolution | Manual relative paths everywhere | TypeScript path aliases + bundler resolution | Cleaner imports, easier refactoring |

**Key insight:** The Tailwind config depends on `lib/ui/build/css/tw-extend/color` which is generated by running `pnpm run generate-styles` in the ui package. For Phase 3, either run this build step OR stub the color import with Radix colors directly.

## Common Pitfalls

### Pitfall 1: Missing Design Token Build
**What goes wrong:** Tailwind config fails because `lib/ui/build/css/tw-extend/color` doesn't exist
**Why it happens:** The design tokens are generated from Figma JSON files that may not be present
**How to avoid:** Either:
  1. Run `pnpm run generate-styles` in lib/ui if tokens exist
  2. Stub the color import with a fallback (use @radix-ui/colors directly)
  3. Simplify tailwind.config.js to not require the generated file
**Warning signs:** Build error: "Cannot find module '../ui/build/css/tw-extend/color'"

### Pitfall 2: tsconfig Extends Resolution
**What goes wrong:** lib packages fail to compile because `tsconfig/react-library.json` doesn't resolve
**Why it happens:** The packages were extracted from monorepo without the shared config package
**How to avoid:** Create `lib/tsconfig/react-library.json` OR inline the config in each package
**Warning signs:** "File 'tsconfig/react-library.json' not found"

### Pitfall 3: Bare Module Imports vs Path Aliases
**What goes wrong:** Imports like `from 'ui'` fail even with path aliases configured
**Why it happens:** The codebase uses bare module names (`ui`) not prefixed aliases (`@ui`)
**How to avoid:** Ensure path aliases include BOTH the bare name and any prefixed variants
**Warning signs:** 480+ TypeScript errors about module not found

### Pitfall 4: transpilePackages Overhead
**What goes wrong:** Build is slow or fails with cryptic errors
**Why it happens:** transpilePackages is meant for node_modules packages, not local code
**How to avoid:** Remove local packages from transpilePackages - they're already in TypeScript
**Warning signs:** Unnecessary compilation, bundle size issues

### Pitfall 5: Environment Variables Blocking Dev
**What goes wrong:** `next dev` fails because env vars aren't set
**Why it happens:** next.config.mjs references Supabase-specific env vars
**How to avoid:** Per CONTEXT.md - only fail fast for truly required vars, use fallbacks for optional
**Warning signs:** "VERCEL_GIT_COMMIT_SHA" undefined errors

## Code Examples

### next.config.mjs Cleanup Pattern
```javascript
// Source: CONTEXT.md decisions
// BEFORE: transpilePackages for monorepo packages
transpilePackages: [
  'ui',
  'ui-patterns',
  'common',
  'shared-data',
  'icons',
  'api-types',
  // ... Supabase-specific
],

// AFTER: Remove local packages, keep only truly external
transpilePackages: [
  '@octokit/plugin-paginate-graphql', // external package that needs it
],
```

### Simplified Tailwind Config (Bypassing Token Build)
```javascript
// lib/config/tailwind.config.js - simplified version
const ui = require('./ui.config.js')
const deepMerge = require('deepmerge')
const plugin = require('tailwindcss/plugin')

// Instead of requiring generated tokens, use Radix colors directly
// This bypasses the lib/ui/build requirement
const brandColors = require('./default-colors')

// ... rest of config using brandColors instead of generated tokens
```

### TypeScript Path Alias Verification
```typescript
// Test file to verify all aliases resolve
// apps/www/tsconfig-test.ts (temporary, delete after verification)
import { Button } from 'ui'
import { cn } from 'common'
import { Realtime } from 'icons'
import { PRODUCT_NAMES } from 'shared-data/products'
import { GlassPanel } from 'ui-patterns/GlassPanel'

// If this compiles without errors, aliases are working
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `moduleResolution: "node"` | `moduleResolution: "bundler"` | TypeScript 5.0+ / Next.js 13+ | Better alignment with bundlers |
| `module: "commonjs"` | `module: "esnext"` | Modern bundlers | Tree-shaking, ESM support |
| transpilePackages for local | Direct TypeScript paths | Always best practice | Faster builds, clearer dependencies |
| packages/ directory | lib/ directory (inlined) | This migration | Standalone project |

**Deprecated/outdated:**
- `moduleResolution: "node"` - Still works but `"bundler"` is recommended for Next.js
- `file:` dependencies - Removed per Phase 2, TypeScript paths handle resolution

## Open Questions

Things that couldn't be fully resolved:

1. **Design Token Generation**
   - What we know: The lib/ui package has scripts to generate tokens from Figma JSON
   - What's unclear: Whether the source Figma tokens (tokens/core/, tokens/themes/) were extracted
   - Recommendation: Check if tokens exist; if not, stub with Radix colors

2. **Exact Color Variable Names**
   - What we know: Tailwind config uses `hsl(var(--foreground-default))` etc.
   - What's unclear: Full list of required CSS variables
   - Recommendation: Extract variable names from lib/config/tailwind.config.js during implementation

## Sources

### Primary (HIGH confidence)
- [Next.js TypeScript Documentation](https://nextjs.org/docs/app/api-reference/config/typescript) - tsconfig recommendations
- [Tailwind CSS v3 Next.js Guide](https://nextjs.org/docs/app/guides/tailwind-v3-css) - content path patterns
- Codebase analysis of existing configs (`apps/www/tsconfig.json`, `apps/www/tailwind.config.js`, `lib/config/`)

### Secondary (MEDIUM confidence)
- [@tsconfig/next package](https://www.npmjs.com/package/@tsconfig/next) - moduleResolution: bundler recommendation
- [TypeScript moduleResolution docs](https://www.typescriptlang.org/tsconfig/moduleResolution.html) - bundler mode details

### Tertiary (LOW confidence)
- None - all findings verified with codebase or official docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - versions confirmed from package.json files
- Architecture: HIGH - patterns derived from existing codebase analysis
- Pitfalls: HIGH - identified from actual config files and CONTEXT.md

**Research date:** 2026-01-22
**Valid until:** 30 days (stable technologies, clear requirements)

---

## Implementation Checklist for Planner

Based on research, the planner should create tasks for:

1. [ ] Create `lib/tsconfig/` directory with base configs
2. [ ] Update all lib/*/tsconfig.json to reference local base
3. [ ] Update `apps/www/tsconfig.json` with complete path aliases
4. [ ] Decide on design token strategy (run build OR stub)
5. [ ] Update `apps/www/tailwind.config.js` content paths
6. [ ] Clean `apps/www/next.config.mjs`:
   - Remove local packages from transpilePackages
   - Remove Sentry config (or stub)
   - Handle env var fallbacks
7. [ ] Update `apps/www/postcss.config.js` to not require external config
8. [ ] Create `.env.example` with discovered vars
9. [ ] Verify TypeScript compilation succeeds
10. [ ] Verify Tailwind builds without errors
