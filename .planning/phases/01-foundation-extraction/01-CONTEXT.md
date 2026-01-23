# Phase 1: Foundation & Extraction - Context

**Gathered:** 2026-01-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Clone Supabase repository and extract /apps/www with resolved dependency protocols. This phase establishes the standalone project structure with all workspace:* and catalog: references converted to working forms. Dev server startup is Phase 4.

</domain>

<decisions>
## Implementation Decisions

### Extraction Scope
- Clone full supabase/supabase repo, then copy out /apps/www
- Copy /packages directory alongside www initially (inline in Phase 2)
- Keep apps/www structure in axite-new (mirror Supabase layout temporarily)
- Copy essential root configs: pnpm-workspace.yaml, turbo.json, root tsconfig

### Protocol Resolution
- Convert workspace:* references to file: protocol (e.g., file:../packages/ui)
- Extract catalog: versions from pnpm-workspace.yaml and substitute actual semver
- Write a script to automate protocol conversion across all package.json files
- Delete conversion script after use (one-time operation)

### Verification Approach
- Success requires both: pnpm install succeeds AND TypeScript compiles
- Defer non-critical warnings — focus on errors only
- Commit after each sub-step (clone, copy, resolve) for checkpoints
- Skip Supabase-specific scripts (static-content.mjs, etc.) for now

### Claude's Discretion
- Git history: Start fresh (user didn't select this area)
- Exact script implementation for protocol conversion
- Order of operations within each sub-step
- How to handle any unexpected edge cases in package.json files

</decisions>

<specifics>
## Specific Ideas

- Structure should mirror Supabase temporarily: axite-new/apps/www/ + axite-new/packages/
- This preserves import paths until we flatten in later phases
- Checkpoint commits enable easy rollback if something breaks

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-extraction*
*Context gathered: 2026-01-22*
