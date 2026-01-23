# Phase 4: Development Environment - Context

**Gathered:** 2026-01-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Get local development server running and displaying content. Success means `pnpm dev` starts, homepage loads at localhost:3000, navigation doesn't crash, and hot reload works. This is about making it run, not about content quality or feature completeness.

</domain>

<decisions>
## Implementation Decisions

### Error Resolution Approach
- **Mix strategy**: Fix critical/core errors properly, stub Supabase-specific features we don't need
- **Supabase code**: Replace with no-ops (keep structure, make functions return null/empty)
- **Dead code**: Only remove if it's blocking — don't proactively clean up
- **Type errors**: Claude's discretion — judge based on effort vs. value for each case

### Content/Page Scope
- **Must-have pages**: Homepage (`/`) plus core marketing (`/pricing`, `/about`)
- **Blog/docs**: Get routes working (not crashing), actual content is Phase 5
- **Dynamic routes**: Stub with static/mock data so routes render
- **Supabase product pages**: Decide per-page — keep useful structures (pricing), remove others

### External Dependencies
- **Supabase SDK**: Keep the package installed, mock all API calls to return empty/mock data
- **Analytics (PostHog, Segment, etc.)**: No-op the calls — keep track() functions but make them do nothing
- **Environment variables**: Document which are required in .env.example. Let dev fail on truly needed ones.
- **CDN assets**: Keep Supabase CDN URLs for now — they're public and work. Replace in branding phase.

### Verification Criteria
- **"pnpm dev starts without errors"**: No fatal/blocking errors. Deprecation warnings and non-critical errors are acceptable.
- **"Navigation works"**: No crashes on navigate. 404 pages are acceptable.
- **"Hot reload works"**: Verify by editing a Tailwind class and seeing it update live
- **Browser console**: No critical errors. Hydration warnings and missing env warnings are OK.

### Claude's Discretion
- Type error handling: judge fix vs. suppress on case-by-case basis
- Per-page decisions on which Supabase product pages to keep vs. remove
- Implementation details for mocking/stubbing

</decisions>

<specifics>
## Specific Ideas

- Keep Supabase CDN image URLs working for now — public, will be replaced in Phase 8 (branding)
- No-op pattern preferred over removal for analytics — easier to add back if needed
- Mock data for dynamic routes should be minimal — just enough to not crash

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-development-environment*
*Context gathered: 2026-01-22*
