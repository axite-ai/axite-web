# Phase 14: Proof & Trust - Research

**Researched:** 2026-01-24
**Domain:** Landing page demo mockup and trust indicators
**Confidence:** HIGH

## Summary

Phase 14 implements a "Proof & Trust" section for the Axite landing page that demonstrates product capability through a static visual demo and establishes credibility with SOC2 indicators and Trust Center links.

Key findings:
- The codebase has excellent existing components for log-like visuals (QueryLogs, RealtimeLogs), window frames (CodeWindow, Panel), and badges (Badge from ui library)
- SOC2 Type II SVG badge already exists at `/public/images/security/soc2-type2.svg`
- Trust page exists at `/pages/trust.mdx` with Axite-specific content
- Layout patterns from Supabase sections (HighlightCards, TimedAccordionSection, FunctionsUsecases) provide solid foundations for side-by-side comparison layouts

**Primary recommendation:** Create a static demo component using Panel for window frame styling, inspired by QueryLogs for log-line layout patterns, with side-by-side Allowed/Blocked comparison using a simple two-column grid. Reuse the existing SOC2 badge SVG and Badge component for trust indicators.

## Standard Stack

### Core Components to Reuse

| Component | Path | Purpose | Why Standard |
|-----------|------|---------|--------------|
| Panel | `~/components/Panel` | Window-like frame with gradient border styling | Battle-tested, provides product screenshot aesthetic |
| Badge | `ui` library | Status indicators for Allowed/Blocked | Existing variants: success (green), destructive (red), warning |
| SectionContainer | `~/components/Layouts/SectionContainer` | Standard section padding/margins | Consistent with all other landing page sections |
| SectionHeader | `~/components/UI/SectionHeader` | Section titles with subtitle pattern | Consistent typography hierarchy |

### Supporting Assets

| Asset | Path | Purpose | Status |
|-------|------|---------|--------|
| SOC2 Type II badge | `/public/images/security/soc2-type2.svg` | Compliance indicator | Already exists, gray color scheme |
| Trust page | `/pages/trust.mdx` | Full trust center content | Exists with Axite content, in-progress status for SOC2 |

### Styling Utilities

| Utility | Source | Purpose |
|---------|--------|---------|
| cn | `ui` | Tailwind class merging |
| dayjs | installed | Timestamp formatting (if needed) |

**Installation:** No additional packages needed. All dependencies already installed.

## Architecture Patterns

### Recommended Component Structure

```
apps/www/components/
├── ProofSection/
│   ├── index.tsx          # Main section component (exports ProofSection)
│   ├── PolicyDemo.tsx     # Side-by-side demo mockup
│   └── TrustStrip.tsx     # SOC2 + Trust Center link row
```

### Pattern 1: Static Demo Panel

**What:** A visually rich but completely static component showing policy decisions
**When to use:** Marketing demos where interactivity is unnecessary and would add complexity
**Why static:** Per CONTEXT.md decisions - no JavaScript interactivity needed

```tsx
// Simplified pattern from existing codebase
import Panel from '~/components/Panel'
import { Badge } from 'ui'

// Static log line - no animation, no state
const DecisionRow = ({ timestamp, action, result, policy, rule }: Props) => (
  <div className="py-2 px-4 border-b font-mono text-xs flex gap-4 items-center">
    <span className="shrink-0 text-foreground-lighter">{timestamp}</span>
    <Badge variant={result === 'Allowed' ? 'success' : 'destructive'}>
      {result}
    </Badge>
    <span className="truncate text-foreground-light">{action}</span>
  </div>
)

// Panel provides the "product window" aesthetic
const DemoWindow = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Panel innerClassName="flex flex-col" outerClassName="h-full">
    <div className="px-4 py-3 border-b border-border">
      <span className="text-sm text-foreground">{title}</span>
    </div>
    <div className="flex-1 overflow-hidden">
      {children}
    </div>
  </Panel>
)
```

### Pattern 2: Side-by-Side Comparison Layout

**What:** Two equal-width columns for Allowed vs Blocked comparison
**When to use:** Showing contrast between two states/outcomes
**Source pattern:** FunctionsUsecases uses `grid grid-cols-12` with col-span divisions

```tsx
// Two-column comparison grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
  {/* Left: Allowed scenario */}
  <DemoWindow title="Allowed Action">
    <DecisionTrace
      action="Read customer profile"
      policy="sales-team-read-only"
      result="allowed"
    />
  </DemoWindow>

  {/* Right: Blocked scenario */}
  <DemoWindow title="Blocked Action">
    <DecisionTrace
      action="Access sensitive PII"
      policy="pii-protection"
      result="blocked"
    />
  </DemoWindow>
</div>
```

### Pattern 3: Decision Trace Display

**What:** Detailed breakdown of policy evaluation showing what was checked
**Derived from:** QueryLogs line format + log-viewer-example structure

```tsx
interface DecisionTrace {
  timestamp: string
  action: string
  result: 'Allowed' | 'Blocked'
  trace: {
    policy: string       // e.g., "sales-team-read-only"
    rule: string         // e.g., "allow-customer-read"
    identity: string     // e.g., "agent:support-bot"
    reason?: string      // e.g., "action outside permitted scope"
  }
}
```

### Pattern 4: Trust Strip Layout

**What:** Horizontal row with SOC2 badge and Trust Center link
**When to use:** Compact trust indicators below demo or as standalone section
**Reference:** Security.mdx shows inline SOC2 badge within content grid

```tsx
// Minimal trust strip pattern
const TrustStrip = () => (
  <div className="flex items-center justify-center gap-8 py-6">
    <div className="flex items-center gap-3">
      <img
        src="/images/security/soc2-type2.svg"
        alt="SOC2 Type II"
        className="h-10 w-auto"
      />
      <span className="text-sm text-foreground-light">SOC2 Type II In Progress</span>
    </div>
    <Link
      href="/trust"
      className="text-sm text-brand hover:text-brand-600 transition-colors"
    >
      View Trust Center
    </Link>
  </div>
)
```

### Anti-Patterns to Avoid

- **Animation overkill:** QueryLogs/RealtimeLogs use framer-motion extensively for real-time effects. This demo is STATIC - no useInterval, no AnimatePresence, no useInView animations for the demo content itself.
- **Over-engineering state:** No useState, no useEffect for the demo data. Hardcode the example scenarios.
- **Interactive elements:** No buttons, hover states that change content, or clickable rows in the demo.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Window frame with dots | Custom div with circles | Panel component | Has gradient border, shimmer effects, proper dark mode |
| Status badges | Custom span styling | Badge component from ui | Consistent variants, proper accessibility |
| Section spacing | Manual padding | SectionContainer | Matches all other landing sections |
| SOC2 badge | Create new graphic | `/images/security/soc2-type2.svg` | Already exists, proper formatting |

**Key insight:** The codebase already has all visual primitives needed. The task is composition, not creation.

## Common Pitfalls

### Pitfall 1: Making It Interactive

**What goes wrong:** Adding state, hover effects, or animations to the demo
**Why it happens:** The existing log components (QueryLogs, RealtimeLogs) ARE interactive, tempting copy-paste
**How to avoid:** Deliberately strip out all useState, useEffect, useInterval, motion components
**Warning signs:** Importing framer-motion, using useState in the demo component

### Pitfall 2: Overcomplicating the Trust Strip

**What goes wrong:** Adding multiple compliance badges, testimonials, or complex layouts
**Why it happens:** Natural desire to add credibility signals
**How to avoid:** CONTEXT.md specifies "Just SOC2 + Trust Center link (keep minimal and credible)"
**Warning signs:** Adding HIPAA badges, customer logos, or testimonial quotes

### Pitfall 3: Breaking the Visual Hierarchy

**What goes wrong:** Demo component doesn't look like a "product screenshot"
**Why it happens:** Missing the window frame aesthetic that Panel provides
**How to avoid:** Use Panel component with proper innerClassName/outerClassName
**Warning signs:** Demo looks like raw HTML table or unstyled list

### Pitfall 4: Wrong Colors for Allowed/Blocked

**What goes wrong:** Using arbitrary colors instead of semantic Badge variants
**Why it happens:** Thinking "green good, red bad" and hardcoding hex colors
**How to avoid:** Use Badge variant="success" for Allowed, variant="destructive" for Blocked
**Warning signs:** Hardcoded color classes like `bg-green-500` or `text-red-600`

## Code Examples

### Example 1: Static Decision Row (from QueryLogs pattern)

```tsx
// Source: QueryLogs.tsx line 125-156 (simplified for static use)
const DecisionRow = ({
  timestamp,
  action,
  result,
  policy
}: {
  timestamp: string
  action: string
  result: 'Allowed' | 'Blocked'
  policy: string
}) => (
  <div className="py-2 px-4 border-b hover:bg-selection/20 font-mono text-xs flex gap-4 items-center">
    <span className="shrink-0 text-foreground-lighter">{timestamp}</span>
    <Badge variant={result === 'Allowed' ? 'success' : 'destructive'}>
      {result}
    </Badge>
    <span className="truncate text-foreground-light flex-1">{action}</span>
    <span className="text-foreground-lighter text-right">{policy}</span>
  </div>
)
```

### Example 2: Panel Window Frame (existing component)

```tsx
// Source: apps/www/components/Panel/Panel.tsx
// Use directly - provides window frame aesthetic with border glow

import Panel from '~/components/Panel'

<Panel
  innerClassName="flex flex-col !bg-alternative"
  outerClassName="h-full"
>
  {/* Header */}
  <div className="px-4 py-3 border-b border-border flex items-center gap-2">
    <div className="w-2 h-2 bg-border rounded-full" />
    <div className="w-2 h-2 bg-border rounded-full" />
    <div className="w-2 h-2 bg-border rounded-full" />
    <span className="text-sm text-foreground ml-2">Policy Decisions</span>
  </div>
  {/* Content */}
  <div className="flex-1">
    {/* Decision rows here */}
  </div>
</Panel>
```

### Example 3: Badge Component Usage

```tsx
// Source: lib/ui/src/components/shadcn/ui/badge.tsx
import { Badge } from 'ui'

// Allowed state - green
<Badge variant="success">Allowed</Badge>

// Blocked state - red
<Badge variant="destructive">Blocked</Badge>

// Default state - neutral
<Badge variant="default">Pending</Badge>
```

### Example 4: SOC2 Badge Display (from security.mdx)

```tsx
// Source: apps/www/pages/security.mdx line 66-68
<div className="w-32">
  <img src="/images/security/soc2-type2.svg" alt="SOC2 Type II" />
</div>

// Alternative with responsive sizing
<img
  src="/images/security/soc2-type2.svg"
  alt="SOC2 Type II Certification"
  className="h-16 w-auto"
/>
```

### Example 5: Section Container Usage

```tsx
// Source: SectionContainer pattern
import SectionContainer from '~/components/Layouts/SectionContainer'
import SectionHeader from '~/components/UI/SectionHeader'

const ProofSection = () => (
  <SectionContainer>
    <SectionHeader
      subtitle="See it in action"
      title="Policy enforcement that explains itself"
    />
    {/* Demo and trust strip content */}
  </SectionContainer>
)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Animated marketing demos | Static visual mockups | v1.2 design constraint | Simpler, faster loading, no JS overhead |
| Multiple trust signals | Minimal (SOC2 + link) | User decision | Cleaner, more credible appearance |
| Custom badge styling | Badge component from ui | Already standard | Consistent with rest of app |

**Deprecated/outdated:**
- Interactive demos: Not applicable per CONTEXT.md decisions
- HIPAA/PCI badges: Not Axite's current compliance focus

## Open Questions

None critical. All implementation details are resolved:

1. **Demo content specifics** - Resolved by CONTEXT.md:
   - Scenario: Data access
   - Allowed: Agent reading customer data (within policy)
   - Blocked: Agent trying to access sensitive data outside scope
   - Trace shows: policy name, rule name, identity context, timestamp

2. **Trust strip placement** - Resolved: Below demo, follow Supabase patterns

3. **SOC2 status text** - Resolved by trust.mdx: "In Progress" status (not yet certified)

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `apps/www/components/Panel/Panel.tsx` - Window frame styling patterns
- Codebase analysis: `apps/www/components/Products/Functions/QueryLogs.tsx` - Log line patterns
- Codebase analysis: `lib/ui/src/components/shadcn/ui/badge.tsx` - Badge variants
- Codebase analysis: `apps/www/pages/security.mdx` - SOC2 badge display pattern
- Codebase analysis: `apps/www/pages/trust.mdx` - Existing trust page content

### Secondary (MEDIUM confidence)
- Phase 14 CONTEXT.md - User decisions on static demo, side-by-side layout, scenario content
- Phase 13 verification - Confirms header/hero implementation patterns for consistency

### Tertiary (LOW confidence)
- None - all patterns verified against codebase

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All components verified to exist in codebase
- Architecture: HIGH - Patterns directly derived from existing Supabase components
- Pitfalls: HIGH - Based on actual codebase patterns and CONTEXT.md constraints

**Research date:** 2026-01-24
**Valid until:** 30 days (stable domain, existing components)
