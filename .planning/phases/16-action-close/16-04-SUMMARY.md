---
phase: 16-action-close
plan: 04
subsystem: www-footer
tags: [footer, layout, cleanup, branding]

dependency-graph:
  requires:
    - 12-cleanup (solutions removal)
    - 15-value-proposition (SecuritySection now has compliance badges)
  provides:
    - Minimal footer with essential links only
    - Removed Supabase branding from footer
  affects:
    - All www pages (footer appears on every page)

tech-stack:
  patterns:
    - Flat link rendering instead of multi-column grid
    - Horizontal layout on desktop, stacked on mobile

file-tracking:
  key-files:
    modified:
      - apps/www/data/Footer.ts
      - apps/www/components/Footer/index.tsx

decisions:
  - name: footer-links
    choice: Docs, Trust, Terms, Privacy, Contact only
    reason: Minimal conversion-focused footer per LP-22 requirements

metrics:
  duration: 9m 4s
  completed: 2026-01-26
---

# Phase 16 Plan 04: Simplify Footer Summary

Minimal footer with only essential links, removing Supabase social links and security badge strip.

## What Was Done

### Task 1: Update Footer.ts data

Simplified footer data from 3 categories with 9 items to 3 categories with 5 items:

**Removed:**
- Blog link (keep only conversion-focused links)
- Security link (redundant with Trust Center)
- DPA link (legal team can be contacted directly)
- Privacy Settings component (simplify)

**Kept (per LP-22 requirements):**
- Documentation (/docs)
- Trust Center (/trust)
- Terms of Service (/terms)
- Privacy Policy (/privacy)
- Contact email (hello@axite.ai)

### Task 2: Simplify Footer component

Dramatically reduced Footer component from 192 lines to 58 lines:

**Removed:**
- Supabase social links (Twitter, GitHub, Discord, YouTube)
- Security badge strip (SOC2/HIPAA badges now in SecuritySection)
- Multi-column navigation grid
- Launch week specific styling/logic
- Supabase logo images
- Realtime channel subscription

**Kept:**
- SectionContainer for consistent padding
- Copyright line (Axite Inc)
- ThemeToggle for user preference
- Simple link rendering from footerData

**New layout:**
- Horizontal links row on desktop
- Theme toggle aligned right
- Copyright below with separator

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 6713b72 | chore | Simplify footer data to essential links |
| a262d4d | feat | Simplify footer to minimal design |

## Verification Results

1. Footer.ts contains only: Docs, Trust, Terms, Privacy, Contact email
2. Footer component does NOT have Supabase social links
3. Footer component does NOT have security badge strip
4. Copyright shows "Axite Inc"
5. No Footer-related TypeScript errors

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

Footer is now minimal and conversion-focused. Remaining Phase 16 plans can proceed:
- 16-05: Full responsive test
- 16-06: Sitemap cleanup
