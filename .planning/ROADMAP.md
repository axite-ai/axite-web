# Roadmap: Axite Marketing Website

## Milestones

- [x] **v1.0 Supabase Extraction** - Phases 1-7 (shipped 2026-01-23)
- [x] **v1.1 Axite Rebrand** - Phases 8-11 (shipped 2026-01-24)
- [ ] **v1.2 Landing Page Refactor** - Phases 12-17 (in progress)

## Phases

<details>
<summary>v1.0 Supabase Extraction (Phases 1-7) - SHIPPED 2026-01-23</summary>

See `.planning/milestones/v1.0-ROADMAP.md` for full v1.0 roadmap archive.

</details>

<details>
<summary>v1.1 Axite Rebrand (Phases 8-11) - SHIPPED 2026-01-24</summary>

**Milestone Goal:** Transform the extracted Supabase site into a fully branded Axite marketing presence with proper identity and messaging.

- [x] **Phase 8: Visual Foundation** - Colors, typography, Tailwind config (completed 2026-01-23)
- [x] **Phase 9: Navigation & Cleanup** - Update nav structure, remove Supabase pages (completed 2026-01-23)
- [x] **Phase 10: Content Pages** - Homepage, Product, Enterprise, Pricing, Trust pages (completed 2026-01-24)
- [x] **Phase 11: Blog Compatibility** - Ensure blog works with new branding (completed 2026-01-24)

**Note:** Deployment (original Phase 12) handled manually outside GSD workflow.

</details>

### v1.2 Landing Page Refactor (In Progress)

**Milestone Goal:** Transform multi-page site into a focused single landing page following YC-style conversion patterns, optimized for enterprise security buyer journey.

**Design Constraint:** For each section, search existing Supabase components, layouts, SVGs, and page sections first. Evaluate and select the best existing design to adapt. No creative generation of new layouts/visuals.

- [x] **Phase 12: Cleanup** - Remove old pages for clean slate (completed 2026-01-24)
- [x] **Phase 13: Header & Hero** - Minimal header and outcome-first hero section (completed 2026-01-24)
- [x] **Phase 14: Proof & Trust** - Demo component and trust indicators (completed 2026-01-25)
- [x] **Phase 15: Value Proposition** - Problem/Transformation and Three Pillars sections (completed 2026-01-26)
- [x] **Phase 16: Action & Close** - How It Works, Security Detail, Final CTA, Footer (completed 2026-01-26)
- [ ] **Phase 17: Verification** - Final verification of landing page

## Phase Details

### Phase 12: Cleanup
**Goal**: Site has clean slate with old pages removed, only essential pages remain
**Depends on**: Phase 11 (v1.1 complete)
**Requirements**: CLEAN-06, CLEAN-07, CLEAN-08, CLEAN-09, CLEAN-10, KEEP-01, KEEP-02
**Success Criteria** (what must be TRUE):
  1. Navigating to /product returns 404 or redirects to homepage
  2. Navigating to /enterprise returns 404 or redirects to homepage
  3. Navigating to /pricing returns 404 or redirects to homepage
  4. /blog page loads correctly (blog system kept per user request)
  5. /trust page loads correctly with security information
  6. /terms and /privacy pages load correctly
**Plans**: 7 plans in 3 waves

Plans:
- [x] 12-01: Delete page files and data (wave 1)
- [x] 12-02: Delete blog system (wave 1) — REVERTED: blog kept per user request
- [x] 12-03: Delete Pricing and Enterprise components (wave 1)
- [x] 12-04: Update navigation (wave 2)
- [x] 12-05: Update footer (wave 2)
- [x] 12-06: Add redirects (wave 2)
- [x] 12-07: Verify build and routes (wave 3)

### Phase 13: Header & Hero
**Goal**: Landing page has minimal header and compelling outcome-first hero
**Depends on**: Phase 12
**Requirements**: LP-01, LP-02, LP-03, LP-04, LP-05, LP-06
**Success Criteria** (what must be TRUE):
  1. Header shows only Axite logo (no navigation links)
  2. Header has single "Book Security Review" CTA button
  3. Hero headline communicates outcome (what users get), not features
  4. Hero subhead identifies target audience and what Axite does in one line
  5. "Book Security Review" primary CTA and "View Docs" secondary link visible
**Plans**: 3 plans in 2 waves

Plans:
- [x] 13-01: Simplify header to logo + CTA (wave 1)
- [x] 13-02: Update hero copy and CTAs (wave 1)
- [x] 13-03: Verify phase success criteria (wave 2)

### Phase 14: Proof & Trust
**Goal**: Landing page demonstrates product capability and establishes trust
**Depends on**: Phase 13
**Requirements**: LP-07, LP-08, LP-09
**Success Criteria** (what must be TRUE):
  1. Demo component shows Allowed/Blocked decisions with decision trace
  2. SOC2 Type II status indicator visible (badge or text)
  3. Link to Trust Center (/trust) present and functional
**Plans**: 2 plans in 2 waves

Plans:
- [x] 14-01: Build ProofSection component (PolicyDemo + TrustStrip) (wave 1)
- [x] 14-02: Integration and verification (wave 2)

### Phase 15: Value Proposition
**Goal**: Landing page clearly communicates problem-to-solution transformation and core pillars
**Depends on**: Phase 14
**Requirements**: LP-10, LP-11, LP-12, LP-13
**Success Criteria** (what must be TRUE):
  1. 2-3 "current pain" to "what changes" transformation blocks visible
  2. Enforceable Policy pillar section with visual component present
  3. Identity/Least Privilege pillar section with visual component present
  4. Audit Evidence pillar section with visual component present
**Plans**: 3 plans in 2 waves

Plans:
- [x] 15-01: Create TransformationSection with 2 pain-to-outcome blocks (wave 1)
- [x] 15-02: Create PillarsSection with Policy (featured), Identity, Audit components (wave 1)
- [x] 15-03: Homepage integration and phase verification (wave 2)

### Phase 16: Action & Close
**Goal**: Landing page guides user through "how it works" and closes with clear CTAs
**Depends on**: Phase 15
**Requirements**: LP-14, LP-15, LP-16, LP-17, LP-18, LP-19, LP-20, LP-21, LP-22
**Success Criteria** (what must be TRUE):
  1. Three-step "How It Works" section visible (Connect, Define, Monitor)
  2. Primary CTA button appears after How It Works steps (NOTE: User decision overrides - NO CTA after How It Works, CTA in Final section only)
  3. Security section with Trust Center link and data handling summary
  4. Final CTA section with outcome restatement and primary button
  5. Minimal footer with Docs, Trust Center, Terms/Privacy, and contact email
**Plans**: 6 plans in 3 waves

Plans:
- [x] 16-01: Create HowItWorksSection component (wave 1)
- [x] 16-02: Create SecuritySection component (wave 1)
- [x] 16-03: Create FinalCTASection component (wave 1)
- [x] 16-04: Simplify Footer component (wave 1)
- [x] 16-05: Homepage integration (wave 2)
- [x] 16-06: Verify phase success criteria (wave 3)

### Phase 17: Verification
**Goal**: Landing page meets all requirements and functions correctly end-to-end
**Depends on**: Phase 16
**Requirements**: None (verification phase)
**Success Criteria** (what must be TRUE):
  1. All landing page sections render correctly on desktop
  2. All landing page sections render correctly on mobile
  3. All CTA buttons link correctly (Book Security Review placeholder works)
  4. All internal links (/trust, /terms, /privacy, docs) function
  5. Build completes with no errors or warnings
**Plans**: TBD

Plans:
- [ ] 17-01: TBD

## Progress

**v1.2 In Progress:**
Phases 12-17 to be executed in order.

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 8. Visual Foundation | v1.1 | 5/5 | Complete | 2026-01-23 |
| 9. Navigation & Cleanup | v1.1 | 5/5 | Complete | 2026-01-23 |
| 10. Content Pages | v1.1 | 7/7 | Complete | 2026-01-24 |
| 11. Blog Compatibility | v1.1 | 6/6 | Complete | 2026-01-24 |
| 12. Cleanup | v1.2 | 7/7 | Complete | 2026-01-24 |
| 13. Header & Hero | v1.2 | 3/3 | Complete | 2026-01-24 |
| 14. Proof & Trust | v1.2 | 2/2 | Complete | 2026-01-25 |
| 15. Value Proposition | v1.2 | 3/3 | Complete | 2026-01-26 |
| 16. Action & Close | v1.2 | 6/6 | Complete | 2026-01-26 |
| 17. Verification | v1.2 | 0/? | Not started | - |

---
*Roadmap created: 2026-01-23*
*Last updated: 2026-01-26 (Phase 16 complete)*
