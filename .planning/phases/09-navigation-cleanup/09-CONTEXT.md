# Phase 9: Navigation & Cleanup - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Update site navigation to reflect Axite structure and remove Supabase-specific pages from navigation. Header shows Axite nav items, footer shows Axite branding, mobile menu works correctly. Old Supabase product URLs return 404. No "Supabase" text visible in navigation or UI chrome (blog content excluded).

</domain>

<decisions>
## Implementation Decisions

### Navigation structure
- Primary nav items: Product, Pricing, Enterprise, Blog, Trust
- Product has dropdown menu, other items are direct links
- Product dropdown includes: Overview + Features (Policy, Identity, Audit) + key ContextForge integrations
- Note: Axite uses mcp-context-forge (https://ibm.github.io/mcp-context-forge/) as underlying MCP gateway — include relevant ContextForge features in Product dropdown
- CTA button placement: keep where Supabase currently has it

### Page removal strategy
- Old Supabase product URLs (/auth, /database, /storage, etc.) return hard 404
- Keep Supabase page files in repo, just unlink from navigation — easier to reference later
- Use existing Supabase 404 page (already restyled with Axite colors in Phase 8)
- Create a removed-pages list document in .planning to track what was removed

### Mobile navigation
- Keep existing Supabase mobile menu behavior (accordion/slide pattern)
- Mobile nav items match Supabase's current approach
- Mobile CTA placement matches Supabase pattern
- Keep existing Supabase breakpoints

### Footer content
- Keep Supabase footer structure, update content for Axite
- Keep Supabase social links temporarily until Axite accounts exist
- Keep newsletter signup if Supabase has one (placeholder/disable form if needed)
- Keep existing legal links (Privacy, Terms, etc.) — update content in future phase

### Claude's Discretion
- Exact Product dropdown sub-items and organization
- How to handle any edge cases in navigation components
- Specific wording of 404 page text

</decisions>

<specifics>
## Specific Ideas

- Underlying platform is mcp-context-forge — Product dropdown should highlight both Axite governance features AND key ContextForge capabilities (prebuilt MCP servers, integrations)
- General approach: mirror Supabase patterns/structure, just update content and links for Axite

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 09-navigation-cleanup*
*Context gathered: 2026-01-23*
