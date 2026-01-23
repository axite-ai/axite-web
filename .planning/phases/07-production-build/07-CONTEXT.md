# Phase 7: Production Build - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Achieve successful production build (`pnpm build`) and verify the output serves correctly (`pnpm start`). All pages must load without 404/500 errors, CSS must render correctly, and build size should be reasonable. This phase is about making the extracted codebase production-ready, not about adding features or changing functionality.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

User indicated "You decide" for all areas. Based on project context (extracting Supabase's battle-tested marketing site), the following approach applies:

**Error handling approach:**
- Fix blocking build errors (TypeScript, import resolution, missing modules)
- Stub or remove Supabase-specific features that require their infrastructure (e.g., auth, analytics, telemetry)
- Don't spend time fixing pages that won't be part of Axite's initial site (e.g., Supabase-specific product pages)
- Document any stubbed functionality for future consideration

**Page coverage scope:**
- Core routes must work: homepage, pricing, blog (index + posts)
- Other pages: fix if quick, stub/disable if complex Supabase dependencies
- Goal is deployable site, not feature-complete Supabase clone

**Build optimization:**
- Accept reasonable build sizes (Supabase site is feature-rich)
- Don't over-optimize at this stage — Phase 8 (branding) may remove unused code
- Flag obvious issues (e.g., massive bundle, missing tree-shaking) but don't deep-dive optimization

**General principle:**
- Minimal changes to get production build working
- Preserve original code structure where possible
- Log decisions for future reference

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

Project context from STATE.md informs decisions:
- Placeholder Supabase URL in use (expected)
- Some Supabase-specific content remains (handled in Phase 8)
- React hooks warning from @payloadcms/live-preview-react (non-blocking)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 07-production-build*
*Context gathered: 2026-01-23*
