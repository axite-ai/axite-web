# Phase 11: Blog Compatibility - Context

**Gathered:** 2026-01-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace Supabase blog content with Axite placeholder posts and update all blog metadata. The blog infrastructure stays intact — we're swapping content, not rebuilding the system.

</domain>

<decisions>
## Implementation Decisions

### Content replacement
- Delete all 387 Supabase blog posts from `apps/www/_blog/`
- Create 10 mock Axite blog posts as placeholders
- Posts should use existing MDX features (code blocks, images, formatting) so real posts can reuse the patterns

### Post topics (Claude's discretion)
- Mix of product announcements, technical guides, and use cases
- Cover the three pillars: Policy enforcement, Identity/RBAC, Audit trails
- Typical B2B SaaS blog structure for an agent governance platform

### Post metadata
- Update blog page titles, descriptions, OG images to reference Axite
- Update tag/category page metadata to reference Axite
- Screen reader text should say "Axite blog" not "Supabase blog"

### Authors
- Use "Axite Team" as generic attribution
- Can include individual placeholder names if posts need author variety

### Claude's Discretion
- Specific post titles and content
- Post dates (recent dates to look active)
- Category/tag structure
- Post length and detail level
- Whether to include code examples in technical posts

</decisions>

<specifics>
## Specific Ideas

- Reuse Supabase post structure as templates — same MDX features, just Axite topics
- Posts are placeholders to be replaced with real valuable content later
- Should demonstrate the blog works with Axite branding end-to-end

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 11-blog-compatibility*
*Context gathered: 2026-01-24*
