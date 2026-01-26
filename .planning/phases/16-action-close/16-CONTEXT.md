# Phase 16: Action & Close - Context

**Gathered:** 2026-01-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Guide users through "How It Works" workflow explanation and close with conversion-focused CTAs. Includes Security section and minimal footer. This phase completes the landing page content before final verification.

</domain>

<decisions>
## Implementation Decisions

### How It Works Presentation
- Use existing Supabase component patterns for layout and visual style
- Steps: Connect, Define, Monitor (three-step flow)
- Claude's discretion on: layout orientation, visual treatment per step, description length, section header
- Match Supabase design language throughout

### CTA Placement & Copy
- Primary CTA label: "Book Security Review" (consistent with hero)
- 2 CTA placements total: Hero + Final CTA section only
- No CTA after How It Works section
- Final CTA section: primary button only, no secondary action (no "View Docs" link)

### Security Section
- Full security posture coverage: SOC2, encryption, data residency, retention, access controls
- Prominent "View Trust Center" link (button or standalone link)
- Claude's discretion on: visual format (icons, cards, etc.), section headline

### Footer
- Not discussed in detail (user skipped)
- Follow requirements: Docs, Trust Center, Terms/Privacy, contact email
- Claude's discretion on exact layout and formatting

### Claude's Discretion
- How It Works: layout, visual treatment, description detail, section header presence
- Security section: visual format, headline copy
- Footer: exact structure and styling
- Final CTA section: whether to include outcome restatement headline

</decisions>

<specifics>
## Specific Ideas

- "Use Supabase style and design" - explicit instruction to search and adapt existing Supabase components rather than creating new patterns
- Keep CTAs focused - only 2 total on page, primary action only in final CTA

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 16-action-close*
*Context gathered: 2026-01-26*
