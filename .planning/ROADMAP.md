# Roadmap: Axite Marketing Website

## Milestones

- [x] **v1.0 Supabase Extraction** - Phases 1-7 (shipped 2026-01-23)
- [ ] **v1.1 Axite Rebrand** - Phases 8-12 (in progress)

## Phases

<details>
<summary>v1.0 Supabase Extraction (Phases 1-7) - SHIPPED 2026-01-23</summary>

See `.planning/milestones/v1.0-ROADMAP.md` for full v1.0 roadmap archive.

</details>

### v1.1 Axite Rebrand (In Progress)

**Milestone Goal:** Transform the extracted Supabase site into a fully branded Axite marketing presence with proper identity, messaging, and deployment to axite.ai.

- [x] **Phase 8: Visual Foundation** - Colors, typography, Tailwind config (completed 2026-01-23)
- [x] **Phase 9: Navigation & Cleanup** - Update nav structure, remove Supabase pages (completed 2026-01-23)
- [ ] **Phase 10: Content Pages** - Homepage, Product, Enterprise, Pricing, Trust pages
- [ ] **Phase 11: Blog Compatibility** - Ensure blog works with new branding
- [ ] **Phase 12: Deployment** - Vercel deploy, domain config, production

## Phase Details

### Phase 8: Visual Foundation
**Goal**: Site renders with Axite visual identity (colors, typography) instead of Supabase green
**Depends on**: Phase 7 (v1.0 complete)
**Requirements**: VIS-01, VIS-02, VIS-03, VIS-04
**Success Criteria** (what must be TRUE):
  1. Primary Navy (#3B63F3) appears in buttons, links, and accents across all pages
  2. Accent Teal (#00B3A4) appears in secondary elements and highlights
  3. Typography conveys calm, precise, authoritative tone (not playful/casual)
  4. No Supabase green (#3ECF8E) visible anywhere in the UI
**Plans**: TBD

Plans:
- [ ] 08-01: TBD

### Phase 9: Navigation & Cleanup
**Goal**: Site navigation reflects Axite structure and Supabase-specific pages are removed
**Depends on**: Phase 8
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, CLEAN-01, CLEAN-02, CLEAN-03, CLEAN-04, CLEAN-05
**Success Criteria** (what must be TRUE):
  1. Header shows Axite navigation (Product, Pricing, Enterprise, Blog, Trust)
  2. Footer shows Axite links and branding
  3. Mobile hamburger menu works with updated navigation
  4. Navigating to old Supabase product URLs (Auth, Database, Storage, etc.) returns 404 or redirects
  5. No "Supabase" text visible in navigation or UI chrome (blog content excluded)

Plans:
- [x] 09-01: Update main nav data and Axite product/module definitions (wave 1)
- [x] 09-02: Update Product dropdown component and nav buttons (wave 2)
- [x] 09-03: Update footer data and component for Axite branding (wave 1)
- [x] 09-04: Update mobile menu and create removed-pages documentation (wave 2)
- [x] 09-05: Verify all success criteria and create verification document (wave 3)

### Phase 10: Content Pages
**Goal**: All content pages display Axite messaging (policy, identity, audit pillars)
**Depends on**: Phase 9
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, ENT-01, ENT-02, ENT-03, ENT-04, PROD-01, PROD-02, PROD-03, PROD-04, PRICE-01, PRICE-02, PRICE-03, PRICE-04, TRUST-01, TRUST-02, TRUST-03, TRUST-04
**Success Criteria** (what must be TRUE):
  1. Homepage hero clearly states "Agent Governance Platform" value proposition
  2. Homepage features section highlights policy, identity, and audit pillars
  3. Product page explains Axite control plane with agent-to-tools flow
  4. Enterprise page addresses security/compliance with deployment options
  5. Pricing page shows tier options (or contact-us for enterprise)
  6. Trust/Security page exists with compliance and data handling info
**Plans**: TBD

Plans:
- [ ] 10-01: TBD

### Phase 11: Blog Compatibility
**Goal**: Blog functions correctly with Axite branding while preserving existing content
**Depends on**: Phase 10
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04
**Success Criteria** (what must be TRUE):
  1. Blog index page loads and lists posts
  2. Individual blog posts render with proper formatting and syntax highlighting
  3. Blog header/navigation shows Axite colors and typography
  4. Original Supabase blog content remains intact and readable
**Plans**: TBD

Plans:
- [ ] 11-01: TBD

### Phase 12: Deployment
**Goal**: Site is live at axite.ai with working HTTPS
**Depends on**: Phase 11
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04, DEPLOY-05
**Success Criteria** (what must be TRUE):
  1. Production build completes without errors
  2. Site is accessible at https://axite.ai
  3. All pages load correctly in production (no broken links or missing assets)
  4. HTTPS certificate is valid and working
**Plans**: TBD

Plans:
- [ ] 12-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 8 -> 9 -> 10 -> 11 -> 12

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 8. Visual Foundation | v1.1 | 5/5 | Complete | 2026-01-23 |
| 9. Navigation & Cleanup | v1.1 | 5/5 | Complete | 2026-01-23 |
| 10. Content Pages | v1.1 | 0/? | Not started | - |
| 11. Blog Compatibility | v1.1 | 0/? | Not started | - |
| 12. Deployment | v1.1 | 0/? | Not started | - |

---
*Roadmap created: 2026-01-23*
*Last updated: 2026-01-23 (Phase 9 complete)*
