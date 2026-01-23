# Roadmap: Axite Marketing Website

## Overview

This roadmap extracts Supabase's production-grade marketing site (apps/www) into a standalone Next.js application for Axite. The journey moves bottom-up through dependency extraction, progresses through infrastructure configuration and content system setup, and culminates in a production-ready build with minimal Axite branding. Each phase produces a verifiable artifact, with the final phase delivering a deployable site.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Extraction** - Clone Supabase repo and resolve workspace/catalog protocols
- [ ] **Phase 2: Package Inlining** - Inline all required monorepo packages into standalone structure
- [ ] **Phase 3: Project Configuration** - Configure standalone Next.js, Tailwind, and TypeScript paths
- [ ] **Phase 4: Development Environment** - Get local development server running
- [ ] **Phase 5: Content Infrastructure** - Set up blog/MDX system with Contentlayer migration
- [ ] **Phase 6: Page Structure** - Extract page layouts, navigation, and footer
- [ ] **Phase 7: Production Build** - Achieve successful production build
- [ ] **Phase 8: Minimal Branding** - Swap logo and apply basic Axite identity

## Phase Details

### Phase 1: Foundation & Extraction
**Goal**: Establish standalone project with all workspace and catalog dependencies resolved
**Depends on**: Nothing (first phase)
**Requirements**: EXTRACT-01, EXTRACT-02
**Success Criteria** (what must be TRUE):
  1. Supabase www source code exists in local directory structure
  2. All workspace:* protocol references replaced with explicit versions or local paths
  3. All catalog: protocol references replaced with actual semver versions
  4. pnpm install runs without protocol resolution errors
**Plans**: TBD

Plans:
- [ ] 01-01: TBD

### Phase 2: Package Inlining
**Goal**: All required monorepo packages inlined into standalone project structure
**Depends on**: Phase 1
**Requirements**: EXTRACT-03
**Success Criteria** (what must be TRUE):
  1. ui package components exist in project (components/ui or similar)
  2. config package (Tailwind, PostCSS) inlined to project root
  3. shared-data package (pricing, products) inlined to project
  4. icons package inlined or replaced with lucide-react
  5. tsconfig base configurations inlined
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Project Configuration
**Goal**: Standalone Next.js 15.5.9 project with working Tailwind and TypeScript configuration
**Depends on**: Phase 2
**Requirements**: INFRA-01, INFRA-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. next.config.mjs is standalone (no transpilePackages for external workspaces)
  2. Tailwind 3.4.x config compiles without errors
  3. All TypeScript path aliases (@ui/*, @common/*, etc.) resolve correctly
  4. TypeScript compilation succeeds with no path resolution errors
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Development Environment
**Goal**: Local development server runs and displays content
**Depends on**: Phase 3
**Requirements**: EXTRACT-04
**Success Criteria** (what must be TRUE):
  1. pnpm dev starts without errors
  2. Homepage loads in browser at localhost:3000
  3. Navigation between pages works without crashes
  4. Hot reload functions when editing components
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Content Infrastructure
**Goal**: Blog and MDX content system fully operational
**Depends on**: Phase 4
**Requirements**: CONTENT-01
**Success Criteria** (what must be TRUE):
  1. MDX files render as blog posts
  2. Blog index page lists posts with correct metadata
  3. Code syntax highlighting works in MDX content
  4. No Contentlayer-related build warnings or errors
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

### Phase 6: Page Structure
**Goal**: Core page layouts, navigation, and footer working across the site
**Depends on**: Phase 5
**Requirements**: CONTENT-02, CONTENT-03
**Success Criteria** (what must be TRUE):
  1. Homepage, about, pricing pages render with correct layouts
  2. Navigation dropdowns open and link to correct pages
  3. Mobile navigation menu functions correctly
  4. Footer renders with all link sections
  5. Theme switching (light/dark) works across pages
**Plans**: TBD

Plans:
- [ ] 06-01: TBD

### Phase 7: Production Build
**Goal**: Production build succeeds and outputs deployable artifacts
**Depends on**: Phase 6
**Requirements**: INFRA-04
**Success Criteria** (what must be TRUE):
  1. pnpm build completes without errors
  2. pnpm start serves production build locally
  3. All pages load without 404 or 500 errors
  4. No missing CSS classes (Tailwind content paths correct)
  5. Build output size is reasonable (no obvious missing tree-shaking)
**Plans**: TBD

Plans:
- [ ] 07-01: TBD

### Phase 8: Minimal Branding
**Goal**: Site displays Axite branding instead of Supabase
**Depends on**: Phase 7
**Requirements**: BRAND-01
**Success Criteria** (what must be TRUE):
  1. Axite logo appears in header and footer
  2. Browser tab shows Axite title and favicon
  3. No Supabase logo visible on homepage or navigation
**Plans**: TBD

Plans:
- [ ] 08-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Extraction | 0/? | Not started | - |
| 2. Package Inlining | 0/? | Not started | - |
| 3. Project Configuration | 0/? | Not started | - |
| 4. Development Environment | 0/? | Not started | - |
| 5. Content Infrastructure | 0/? | Not started | - |
| 6. Page Structure | 0/? | Not started | - |
| 7. Production Build | 0/? | Not started | - |
| 8. Minimal Branding | 0/? | Not started | - |

---
*Last updated: 2026-01-22*
