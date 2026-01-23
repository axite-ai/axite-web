# Phase 8: Visual Foundation - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Site renders with Axite visual identity (colors, typography) instead of Supabase green. This phase updates the Tailwind config and CSS variables to establish navy/teal as the brand colors. Component structure, layouts, and interactions remain unchanged — only colors and typography settings are modified.

</domain>

<decisions>
## Implementation Decisions

### Color Application
- Primary Navy (#3B63F3) usage: Claude's discretion based on brand identity — apply to CTAs, links, and structural elements as appropriate
- Accent Teal (#00B3A4) role: Decorative only — illustrations, icons, dividers, not interactive elements
- Background colors: Claude's discretion, open to navy tints but avoid major changes to existing Supabase background structure
- Supabase green (#3ECF8E) elimination: Context-dependent — success states can remain green, brand elements become navy

### Typography Feel
- Font personality: Geometric sans-serif (clean, modern, technical) — Inter, Geist, or Satoshi family
- Heading weight: Semibold (600) — confident but not heavy-handed
- Heading size scale: Claude's discretion based on existing Supabase setup
- Code/monospace font: Keep existing Supabase monospace fonts

### Component Theming
- Button style: Keep existing Supabase button styling, just swap colors
- Card/panel style: Keep existing Supabase card styles, just update colors
- Border radius: Keep existing Supabase border radius values
- Form inputs: Keep existing Supabase form styling, minimal changes

### Dark Mode Handling
- Dark mode support: Match existing — if Supabase had dark mode, keep it; if not, skip it
- Color adaptation: Use lighter navy/teal variants on dark backgrounds for proper contrast
- Default theme: Match existing Supabase behavior
- Theme toggle: Keep existing toggle location/mechanism

### Claude's Discretion
- Specific font choice within geometric sans-serif family
- Exact navy application to CTAs vs structural elements
- Background tint decisions (preserve Supabase structure)
- Heading size scale (work with what exists)
- Any dark mode color adjustments (reference Supabase's approach)

</decisions>

<specifics>
## Specific Ideas

- **Preserve Supabase design decisions** — Avoid reinventing the wheel. The goal is a color/typography swap, not a full redesign.
- **Reference Supabase's dark mode logic** — When adjusting colors for dark mode, follow patterns Supabase already established for their green palette.
- **Minimal structural changes** — Component shapes, shadows, spacing, and layouts should remain intact.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-visual-foundation*
*Context gathered: 2026-01-23*
