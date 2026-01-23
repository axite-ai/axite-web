# Phase 3 Context: Project Configuration

**Phase Goal:** Standalone Next.js 15.5.9 project with working Tailwind and TypeScript configuration

**Created:** 2025-01-23

---

## Decisions

### TypeScript Configuration

| Decision | Choice |
|----------|--------|
| Strictness level | Match Supabase's existing tsconfig settings |
| Error tolerance | Zero errors by phase end; can quarantine temporarily during work |
| Handling issues | Use `// @ts-ignore` comments where needed for stubbed code |

### Supabase Import Handling

| Decision | Choice |
|----------|--------|
| Strategy | Stub problematic code (no-op implementations) |
| Preserve | Page structure, routing, UI layout, function signatures, data shapes/types |
| Remove | Supabase internal module paths, monorepo utilities, infrastructure-specific helpers |
| UI components with branding | Leave for Phase 8 (Minimal Branding) |
| Data fetching | Use static fixtures |

**What to preserve (high signal):**
- Public-facing flows: page structure, routing, UI layout, copy
- Function signatures/boundaries: `getUser()`, `getPricing()`, `listPosts()`, `trackEvent()`
- Data shapes: types/interfaces for what the UI expects

**What to remove (low signal / toxic):**
- Supabase internal module paths, tooling, service clients
- Bespoke monorepo utilities
- Helper layers that only exist because of their infrastructure

### Environment Variables

| Decision | Choice |
|----------|--------|
| Required vars (next.config.js, static gen) | Fail fast at build time |
| Optional/runtime vars | Fallback defaults + warn (don't block `next dev`) |
| `.env.example` | Create with all discovered vars |
| Unused `NEXT_PUBLIC_*` vars | Remove them |
| Pre-wire Axite vars | No — leave for later phases |

**Key principle:** Don't block `next dev` from running. Only fail fast for vars that are truly required to build.

### Tailwind Configuration

| Decision | Choice |
|----------|--------|
| Content scanning | Precise — explicitly list directories |
| lib/ packages | Scan all that can contain JSX/TSX |
| Plugins | Keep for Phase 3 unless they break build |
| Dark mode | Keep Supabase's approach |

**Content paths to include:**
- `app/` (pages and layouts)
- `components/` (if exists at root)
- `lib/ui/` and `lib/ui-patterns/` (component packages)
- Any other lib/ dirs containing JSX/TSX

---

## Scope Boundaries

**In scope for Phase 3:**
- next.config.mjs cleanup (remove transpilePackages for external workspaces)
- Tailwind config with correct content paths
- TypeScript path aliases resolving correctly
- TypeScript compilation with no path resolution errors

**Out of scope (future phases):**
- Actually running `next dev` (Phase 4)
- Content/MDX system (Phase 5)
- Branding swaps (Phase 8)

---

## Notes for Researcher/Planner

1. **Audit current configs first** — Check what Supabase's next.config.mjs, tailwind.config.js, and tsconfig.json actually contain before modifying

2. **Identify all env var references** — Grep for `process.env` and `NEXT_PUBLIC_` to build the .env.example

3. **Map import aliases** — Document which @aliases exist and where they should resolve to in the new structure

4. **Stubbing pattern** — When stubbing Supabase-specific imports, preserve the function signature and return type, just make the implementation a no-op or return static data
