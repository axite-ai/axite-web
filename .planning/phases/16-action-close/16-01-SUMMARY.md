---
phase: 16-action-close
plan: 01
subsystem: www-homepage
tags: [components, ui, how-it-works]

dependency_graph:
  requires: [15-value-proposition]
  provides: [HowItWorksSection-component]
  affects: [16-06-homepage-integration]

tech_stack:
  added: []
  patterns: [three-step-workflow, panel-cards]

key_files:
  created:
    - apps/www/components/HowItWorksSection/index.tsx
  modified: []

decisions:
  - id: no-cta-how-it-works
    choice: No CTA after How It Works section
    reason: User decision - only 2 CTAs total on page (Hero + Final CTA)

metrics:
  duration: 44s
  completed: 2026-01-26
---

# Phase 16 Plan 01: How It Works Section Summary

Three-step workflow component (Connect, Define, Monitor) using Panel cards with SectionContainer/SectionHeader patterns.

## What Was Done

### Task 1: Create HowItWorksSection component

Created `/apps/www/components/HowItWorksSection/index.tsx`:

- **Section header**: "Getting started" subtitle, "Three steps to governance" title
- **Three steps** in Panel cards:
  1. **Connect** - Connect tools and MCP servers to Axite's gateway
  2. **Define** - Set policies for what agents can do
  3. **Monitor** - Track every action with audit-grade logging
- **Responsive layout**: Single column on mobile, 3 columns on desktop (`grid-cols-1 lg:grid-cols-3`)
- **No CTA** per user decision (only 2 CTAs on page: Hero + Final CTA)

## Verification Results

All criteria verified:
- File exists at expected path
- Imports SectionContainer, SectionHeader, Panel
- Contains all three steps (Connect, Define, Monitor)
- Has `grid-cols-1 lg:grid-cols-3` responsive grid
- No Button or CTA elements present

## Deviations from Plan

None - plan executed exactly as written.

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 49ab638 | feat | Create HowItWorksSection component |

## Next Phase Readiness

- Component ready for homepage integration in 16-06
- No blockers
