# Phase 15: Value Proposition - Context

**Gathered:** 2026-01-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Landing page sections that communicate the problem-to-solution transformation and the three core pillars (Enforceable Policy, Identity/Least Privilege, Audit Evidence). Transformation blocks show pain → outcome. Pillar sections explain the mechanisms that deliver those outcomes.

</domain>

<decisions>
## Implementation Decisions

### Transformation Blocks
- 2 blocks total (focused, not exhaustive)
- Lead with business outcomes, not technical features
- Use specific examples ("Agent tried to delete production DB") not abstract language
- Mention compliance frameworks (SOC2, HIPAA) where relevant but don't hard-commit everywhere

### Pillar Visuals
- **Enforceable Policy:** Mini policy demo (similar to ProofSection — show allow/deny in action) — FEATURED, larger than others
- **Identity/Least Privilege:** Permission matrix (grid showing agent/tool/action permissions)
- **Audit Evidence:** Report preview (mock audit report or compliance dashboard)
- Policy pillar gets more visual weight; Identity and Audit are more compact

### Design Approach
- Follow Supabase's visual patterns exactly
- Copy and adapt their SVGs for Axite use cases
- Match their component styling and section layouts
- Do not create new visual styles — reuse what exists

### Section Ordering
- Transformation blocks come first (pain → transformation)
- Three pillars follow (explain HOW transformation is achieved)

### Content Depth
- No external "Learn more" links from pillars
- If detail needed, use expandable "View details" within the section
- Keep landing page self-contained

### Claude's Discretion
- Visual format for transformation blocks (two-column split vs card with arrow — pick from existing Supabase layouts)
- Copy tone for pain statements (follow brand voice: calm, diagnostic, mechanism-first)
- Pillar layout (three columns vs stacked vs feature+two smaller — reference Supabase patterns)
- Whether to add section header before pillars (reference Supabase pages)
- Visual separation between transformation and pillars (match Supabase's section transition patterns)
- Copy depth per pillar (match what Supabase uses in similar sections)

</decisions>

<specifics>
## Specific Ideas

- "Make sure you follow the design and theme of supabase. For example cp and edit their svgs to recreate similar style designs for my use case and use them similarly to how supabase does."
- Business outcomes examples: "Pass SOC2 audits without scrambling", "Know exactly what every agent can do"
- Specific scenario examples for transformation: concrete agent actions gone wrong → controlled

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 15-value-proposition*
*Context gathered: 2026-01-25*
