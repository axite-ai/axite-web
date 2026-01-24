# Phase 14: Proof & Trust - Context

**Gathered:** 2026-01-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Landing page demonstrates product capability through a visual demo and establishes trust with SOC2 indicator and Trust Center link. This is SHOWING how the product works, not telling.

</domain>

<decisions>
## Implementation Decisions

### Demo Interaction
- Static mockup (no JavaScript interactivity)
- Side-by-side comparison layout: Allowed action on left, Blocked action on right
- Detailed decision trace showing: policy name, matched rule, identity context, timestamp
- Product window frame styling (looks like a screenshot of actual product dashboard)

### Trust Indicators
- SOC2 Type II styled like Supabase does it
- Just SOC2 + Trust Center link (keep minimal and credible)
- Placement: take inspiration from Supabase demo layouts

### Visual Treatment
- Background and layout: follow existing Supabase page patterns
- Section heading/intro: follow Supabase patterns for similar sections

### Content Specifics
- Demo scenario type: Data access
- Allowed example: Agent reading customer data (within policy)
- Blocked example: Agent trying to access sensitive data outside scope
- Trace shows specific policy/rule names (e.g., "sales-team-read-only", "pii-protection")

### Claude's Discretion
- Demo component width (contained vs full-width) — based on Supabase patterns
- Status colors for Allowed/Blocked states
- Trust Center link treatment (text link vs secondary button)

</decisions>

<specifics>
## Specific Ideas

- "Take inspiration from Supabase demos" — look at existing Supabase demo components and page layouts
- SOC2 indicator should match how Supabase displays their compliance badges
- Product window frame should make the demo feel like an actual product screenshot

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 14-proof-trust*
*Context gathered: 2026-01-24*
