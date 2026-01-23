# Phase 2: Package Inlining — Context

## Phase Goal

All required monorepo packages inlined into standalone project structure.

## Decisions

### Package Destination Structure

**Decision**: Preserve package identity with `lib/` prefix

- `packages/ui` → `lib/ui/`
- `packages/common` → `lib/common/`
- `packages/shared-data` → `lib/shared-data/`
- `packages/config` → `lib/config/`
- `packages/icons` → `lib/icons/`
- `packages/ui-patterns` → `lib/ui-patterns/`
- `packages/tsconfig` → inline into root `tsconfig.json`

**Rationale**: Using `lib/` keeps internal packages separate from app code while avoiding collision with `components/` (which is for app-level components). Preserving directory names simplifies import rewriting.

### Icons Strategy

**Decision**: Inline the icons package as-is (do not replace with lucide-react)

**Rationale**: The Supabase icons package contains custom icons specific to their design system. Replacing with lucide-react would require auditing every icon usage and finding equivalents. Inlining preserves functionality with less risk.

**Note**: The `build-icons` package is only needed for icon generation from SVG sources. We can inline the pre-built icon components and drop `build-icons` entirely.

### Import Rewriting Strategy

**Decision**: Use tsconfig path aliases to minimize code changes

- Keep existing import paths (e.g., `from 'ui'`, `from 'common'`)
- Update `tsconfig.json` to resolve these to `lib/*` directories
- Example: `"ui": ["./lib/ui"]`, `"ui/*": ["./lib/ui/*"]`

**Rationale**: 200+ files import from these packages. Path aliases let us change resolution once rather than rewriting every import.

### Package Dependency Handling

**Decision**: Preserve internal structure within each inlined package

- Keep each package as a self-contained directory
- Internal cross-package imports (e.g., `common` → `config`) become tsconfig aliases
- Do not flatten package internals

**Rationale**: Flattening risks breaking internal module resolution. Preserving structure is safer and reversible.

### Packages to Include

**Include** (used by www app):
- `ui` — core UI components
- `common` — shared utilities, hooks, types
- `shared-data` — pricing, products data
- `config` — Tailwind config, PostCSS
- `icons` — custom icon components
- `ui-patterns` — higher-level UI patterns

**Exclude** (not used by www app):
- `ai-commands` — Supabase-specific AI tooling
- `api-types` — Supabase API types (may pull in if common requires)
- `build-icons` — icon build tooling (not runtime)
- `eslint-config-supabase` — use standard eslint
- `generator` — docs generation tooling
- `pg-meta` — PostgreSQL metadata library

### Files to Exclude from Inlined Packages

- `node_modules/`
- `*.test.ts`, `*.test.tsx`, `*.spec.ts`
- `__tests__/`, `__mocks__/`
- `coverage/`
- `.turbo/`
- Build scripts only needed for monorepo context

## Constraints

- Do not modify the actual package code during inlining (changes come in Phase 3+)
- Preserve file structure within each package
- Must not break existing import statements in www app

## Deferred Ideas

None captured.

## Next Steps

Ready for: `/gsd:plan-phase 2`

---
*Created: 2026-01-22*
