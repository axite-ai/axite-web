# Project Research Summary

**Project:** Axite Marketing Website (extracted from Supabase www)
**Domain:** Next.js marketing site monorepo extraction
**Researched:** 2026-01-22
**Confidence:** HIGH

## Executive Summary

The Axite marketing website will be extracted from Supabase's production-grade Next.js marketing site (apps/www). Supabase runs Next.js 15.5.9 with React 18.3.1 using a hybrid Pages Router + App Router architecture. The site depends on 9 internal monorepo packages (ui, ui-patterns, common, config, shared-data, icons, ai-commands, api-types, tsconfig) that provide UI components, shared configuration, and utilities. The extraction requires carefully inlining these packages and removing Turborepo dependencies while preserving the battle-tested component library and content systems.

The recommended approach is to extract in phases: first establish foundation and static dependencies, then inline the large UI package (40+ components with 30+ Radix UI primitives), followed by adapting content for Axite's MCP/agent-native messaging. Approximately 60% of the infrastructure is highly reusable (layout, components, blog, forms), 25% requires content modification (product pages, messaging, case studies), and 15% is Supabase-specific and should be removed entirely (Auth/Database/Storage product pages, LaunchWeek features, comparison pages).

The critical risk is the workspace package extraction complexity. The ui package alone has 30+ Radix UI dependencies and ~50 component exports. All 9 workspace dependencies use pnpm's `workspace:*` protocol which npm/yarn cannot resolve. Every package.json reference, TypeScript path alias, and Tailwind content path must be updated to reference the new standalone structure. Missing this causes complete build failure. The mitigation is methodical phase-by-phase extraction with validation at each step.

## Key Findings

### Recommended Stack

Supabase uses a modern but conservative stack: Next.js 15.5.9 with React 18.3.1 (NOT React 19), Tailwind CSS 3.4.1 (NOT v4.0), and TypeScript 5.9. This combination is production-tested and should be preserved during initial extraction. The site uses both Pages Router (legacy marketing pages) and App Router (blog, events) in a hybrid configuration.

**Core technologies:**
- **Next.js 15.5.9**: Full-stack React framework — match Supabase's tested version; optional upgrade to 16.x later
- **React 18.3.1**: UI library — Supabase uses React 18, not 19; keep for compatibility
- **Tailwind CSS 3.4.1**: Utility-first CSS — keep v3.4.x, NOT v4.0; v4 requires migration
- **TypeScript 5.9**: Type safety — matches Supabase's tested configuration
- **Radix UI (30+ primitives)**: Accessible component primitives — accordion, dialog, dropdown, popover, select, tabs, tooltip
- **Framer Motion 11.0.3**: React animations — used throughout for page transitions and interactions
- **MDX + Code Hike**: Content system — powers 387+ blog posts with syntax highlighting
- **react-hook-form + Zod**: Form validation — robust form handling with schema validation
- **next-themes**: Theme switching — system/light/dark support

**Critical versions:**
- Use Tailwind CSS 3.4.1 exactly (not v4) to avoid migration complexity
- Pin React 18.3.1 (not React 19) to match Supabase's tested configuration
- Consider Next.js 16.x upgrade only after successful extraction

### Expected Features

The Supabase site demonstrates comprehensive B2B developer marketing patterns with 387+ blog posts, 35 customer case studies, 14 solution pages, pricing tiers, and event management. For Axite, the blog infrastructure, case study system, and form components are table stakes. The product showcase components need replacement with MCP/agent-native messaging.

**Must have (table stakes):**
- Blog system with MDX support, category filtering, author profiles, RSS feeds
- Customer case study system with testimonials and social proof
- Contact/demo request forms with hCaptcha bot protection
- Pricing page with tier comparison and FAQ
- Responsive navigation with dropdowns and mobile menu
- Legal pages (terms, privacy, DPA)
- Command menu for site-wide search/navigation
- Theme switching (system/light/dark)

**Should have (competitive):**
- Interactive code examples with syntax highlighting
- Solution pages by audience (enterprise, startups, AI builders, developers)
- Event system for webinars/conferences
- Partner ecosystem showcase
- Company/about page with team profiles
- Careers page with job listings
- Brand assets page (logo downloads, guidelines)

**Defer (v2+):**
- LaunchWeek system (Supabase-specific, high complexity)
- Year-wrapped feature (event-specific)
- Comparison/alternatives pages (create later for "Why Axite")
- Community features (SupaSquad equivalent)
- Compute pricing calculator (Supabase's usage-based model differs from Axite)
- AI assistant chat (unless core to Axite product)

**Remove completely (Supabase-specific):**
- All product pages (Auth, Database, Storage, Realtime, Edge Functions, Vector, Cron, Queues)
- Switch-from pages (Firebase, Convex, Neon)
- Product comparison pages (vs Firebase, vs Auth0, vs Heroku)
- Framework-specific landing pages (nextjs.tsx)
- Beta/GA launch pages

### Architecture Approach

The Supabase www app uses a hybrid Next.js architecture with Pages Router for most marketing pages and App Router for newer features like blog and events. The app has 9 workspace package dependencies arranged in 4 levels. Extraction must proceed bottom-up: static packages first (tsconfig, shared-data, api-types), then config/icons, then common/ai-commands, then ui/ui-patterns, and finally the www app itself.

**Major components:**
1. **UI Package (Level 3)** — 40+ shadcn-style components wrapping Radix UI primitives; largest inlining effort with 30+ dependencies
2. **Config Package (Level 1)** — Tailwind configuration with design tokens, code-hike themes, and shared PostCSS settings
3. **Common Package (Level 2)** — Auth utilities, feature flags (ConfigCat), telemetry (PostHog), consent management; needs evaluation for what to keep
4. **Content System** — MDX processing with Code Hike, gray-matter, remark-gfm; 387+ blog posts and 35 case studies
5. **UI Patterns (Level 3)** — Complex composed patterns (CommandMenu, AssistantChat, FilterBar); evaluate which are used
6. **Shared Data (Level 0)** — Pricing tiers, products, regions; replace content but keep structure
7. **Icons Package (Level 1)** — Generated icon components; copy to components/icons or replace with lucide-react

**Key patterns to follow:**
- Hybrid routing (Pages + App Router) preserves flexibility; full App Router migration is optional
- MDX blog system with frontmatter, categories, and author profiles
- Component composition with Radix UI + class-variance-authority for variants
- Server actions for form submissions with Zod validation
- Theme-aware components using next-themes

### Critical Pitfalls

**1. workspace:* Protocol Not Resolved** — The monorepo uses pnpm's `workspace:*` protocol for 9 internal dependencies. npm/yarn cannot resolve these references and installation fails. Must identify all workspace dependencies and either inline source code or replace with npm equivalents before running npm install. This is Phase 1 blocking.

**2. pnpm Catalog Dependencies Unresolved** — Supabase uses pnpm catalogs to centralize versions. Dependencies like `"react": "catalog:"` won't resolve outside monorepo. Must extract version mappings from pnpm-workspace.yaml and replace all catalog references with actual semver versions. Affects React 18.3.0, Next.js 15.5.9, Tailwind 3.4.1, TypeScript 5.9, Zod 3.25.76.

**3. TypeScript Path Aliases Break** — Path aliases like `@ui/*` pointing to `../../packages/ui/src/*` fail when packages are moved. Must inline source code and update all import statements to use relative paths or new aliases within project. Affects hundreds of imports across codebase.

**4. Tailwind Content Paths Miss Components** — After inlining UI packages, Tailwind's content scanner can't find components if paths still reference `../../packages/ui/**/*.tsx`. Results in missing CSS classes and unstyled components. Must update content array to match new directory structure.

**5. Contentlayer Incompatibility** — Contentlayer is unmaintained and has peer dependency conflicts with Next.js 14.2+. Blog functionality depends on it. Must migrate to contentlayer2 (maintained fork) or content-collections, or blog pages return 404. Test explicitly during validation phase.

## Implications for Roadmap

Based on research, suggested phase structure follows dependency order and complexity:

### Phase 1: Foundation & Static Dependencies
**Rationale:** Establish standalone project structure and resolve all workspace/catalog protocol issues before any other work. Bottom-up dependency extraction ensures no circular dependencies or missing packages.

**Delivers:**
- Standalone Next.js 15.5.9 project with correct package manager configuration
- Inlined tsconfig base configurations
- Inlined shared-data (pricing, products) ready for Axite content replacement
- Inlined api-types if needed

**Addresses:**
- workspace:* protocol resolution (Pitfall 1)
- catalog: version replacement (Pitfall 2)
- pnpm preinstall script removal (Pitfall 13)

**Avoids:** Build completely failing due to package resolution errors

**Research flag:** Standard patterns; skip research-phase

---

### Phase 2: Configuration & Icon System
**Rationale:** Config and icon packages have no internal dependencies (Level 1). Must be in place before UI packages that depend on them.

**Delivers:**
- Inlined Tailwind configuration with design tokens and Code Hike themes
- Inlined PostCSS configuration
- Icon system (either copy icon package or replace with lucide-react)
- ESLint configuration standalone

**Uses:** Tailwind CSS 3.4.1, PostCSS

**Addresses:** TypeScript path alias updates for config imports

**Avoids:**
- Tailwind content path mismatches (Pitfall 8)
- ESLint config dependencies (Pitfall 11)

**Research flag:** Standard patterns; skip research-phase

---

### Phase 3: Common Package Evaluation
**Rationale:** Common package (Level 2) provides auth, telemetry, feature flags. Must evaluate what Axite actually needs before inlining.

**Delivers:**
- Decision matrix: keep Supabase integration vs stub out vs remove
- Inlined utilities Axite will use (if any)
- Removed third-party integrations not needed (PostHog, ConfigCat, Usercentrics)

**Addresses:**
- Environment variable configuration (Pitfall 6)
- Reducing complexity by removing unused code

**Avoids:** Carrying technical debt from Supabase-specific integrations

**Research flag:** NEEDS RESEARCH — evaluate Supabase client integration strategy

---

### Phase 4: UI Package Inlining
**Rationale:** Largest and most critical extraction. UI package has 40+ components, 30+ Radix UI dependencies, and is the foundation for all visual components. Must be complete before adapting pages.

**Delivers:**
- All shadcn-style components inlined to project
- 30+ Radix UI primitives as direct dependencies
- Utility libraries (class-variance-authority, clsx, tailwind-merge)
- Updated import paths across entire codebase

**Uses:**
- React 18.3.1
- Radix UI suite
- Framer Motion for animations
- next-themes for theme switching

**Addresses:**
- TypeScript path alias migration (Pitfall 3)
- React version duplication prevention (Pitfall 9)

**Avoids:** Invalid hook calls and module not found errors

**Research flag:** Standard patterns but HIGH effort; skip research-phase, allow extended timeline

---

### Phase 5: UI Patterns & Content System
**Rationale:** After base UI components are available, add complex patterns and set up MDX content pipeline.

**Delivers:**
- CommandMenu for site navigation
- Evaluated and inlined UI patterns actually used by www app
- MDX processing with Code Hike, remark-gfm, rehype-slug
- Contentlayer migration (to contentlayer2 or content-collections)
- Blog infrastructure ready for Axite content

**Implements:** Content System architecture component

**Addresses:** Contentlayer incompatibility (Pitfall 5)

**Avoids:** Blog pages returning 404 in production

**Research flag:** NEEDS RESEARCH — Contentlayer migration strategy (contentlayer2 vs content-collections)

---

### Phase 6: Page Structure Extraction
**Rationale:** With all components and utilities in place, copy page structure and layouts. Remove Supabase-specific pages, keep reusable templates.

**Delivers:**
- Pages Router structure with reusable marketing pages
- App Router structure for blog/events
- Layout components (header, footer, navigation)
- Form components with react-hook-form + Zod

**Features from FEATURES.md:**
- Navigation with dropdowns and mobile menu
- Legal pages structure
- Contact/demo forms
- Theme switching

**Avoids:** Copying pages that will be deleted; focus on templates

**Research flag:** Standard patterns; skip research-phase

---

### Phase 7: Build Configuration & Environment
**Rationale:** After code structure is finalized, configure build system and deployment.

**Delivers:**
- Updated next.config.mjs (remove transpilePackages, update MDX config)
- Comprehensive .env.example with all required variables
- Tailwind content paths verified
- Production build tested

**Addresses:**
- Missing transpilePackages configuration (Pitfall 4)
- Environment variable mismatch (Pitfall 6)
- CDN asset prefix removal (Pitfall 7)
- outputFileTracingRoot correction (Pitfall 10)

**Avoids:** Production builds missing files or failing due to config errors

**Research flag:** Standard patterns; skip research-phase

---

### Phase 8: Content Adaptation for Axite
**Rationale:** Infrastructure complete; now replace Supabase content with Axite messaging.

**Delivers:**
- Homepage with MCP/agent-native hero and messaging
- Pricing page with Axite service tiers
- Solution pages adapted for Axite audiences (enterprise, startups, AI builders)
- Placeholder blog posts and case studies

**Features from FEATURES.md:**
- Customer case study system (structure kept, content replaced)
- Pricing tiers and FAQ
- Solution pages

**Avoids:** Shipping with Supabase branding or product references

**Research flag:** NEEDS RESEARCH — Axite messaging, positioning, case study approach

---

### Phase 9: Advanced Features
**Rationale:** After core site is functional, add differentiating interactive elements.

**Delivers:**
- Interactive MCP demo (replaces Supabase AI demo)
- Code examples with syntax highlighting
- Cal.com embed for booking (if not already added)
- Event system if needed for webinars

**Features from FEATURES.md:**
- Interactive code playground
- Event management system

**Avoids:** Scope creep; these can be deferred if timeline pressure

**Research flag:** NEEDS RESEARCH — MCP demo requirements and implementation approach

---

### Phase Ordering Rationale

- **Dependency-driven:** Phases 1-5 follow strict dependency order (bottom-up from dependency graph). Cannot inline UI without config; cannot configure build without inlined packages.
- **Risk-first:** Address critical pitfalls (workspace protocol, catalog versions) in Phase 1 before any other work. This prevents discovering blockers after significant effort.
- **Validation points:** Each phase produces buildable artifact. Test `npm install` after Phase 1, build after Phase 7, deploy after Phase 8.
- **Content separation:** Infrastructure (Phases 1-7) is decoupled from content (Phase 8-9). Can replace messaging without touching code.
- **Defer complexity:** Advanced features (Phase 9) and evaluation decisions (Phase 3, Phase 5) are isolated to specific phases. Can defer or simplify without affecting core extraction.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Common Package):** Evaluate Supabase client integration strategy; may need research on auth/database alternatives
- **Phase 5 (Content System):** Contentlayer migration strategy requires API comparison (contentlayer2 vs content-collections)
- **Phase 8 (Content Adaptation):** Axite messaging, positioning, and case study collection needs discovery
- **Phase 9 (MCP Demo):** Interactive demo requirements and implementation approach needs scoping

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Well-documented monorepo extraction patterns
- **Phase 2 (Config):** Standard Tailwind/PostCSS setup
- **Phase 4 (UI Package):** Mechanical copy operation, high effort but clear approach
- **Phase 6 (Pages):** Template copying with content removal
- **Phase 7 (Build Config):** Next.js configuration best practices

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Versions verified from pnpm-workspace.yaml catalog; package.json dependencies cross-checked |
| Features | HIGH | Direct GitHub repository analysis of 387+ blog posts, 35 case studies, complete page inventory |
| Architecture | HIGH | Full dependency graph mapped from package.json files; directory structure verified via GitHub API |
| Pitfalls | HIGH | Verified against official Next.js docs, pnpm workspace docs, community GitHub issues on monorepo extraction |

**Overall confidence:** HIGH

### Gaps to Address

**1. Contentlayer Migration Path:** Research shows Contentlayer is unmaintained but two migration paths exist (contentlayer2 fork vs content-collections). Need to evaluate API differences and choose approach during Phase 5 planning. Low risk — both solutions documented.

**2. Common Package Supabase Integration:** Unknown whether Axite needs Supabase client integration for forms/auth or can use alternative (Resend, static forms, etc.). Evaluate during Phase 3 before inlining. Medium risk — affects auth strategy.

**3. UI Patterns Usage:** Research shows ui-patterns package has complex components (AssistantChat, CommandMenu, SQL-to-REST) but unclear which are actually used by www app. Need to audit imports during Phase 5. Low risk — can copy all and remove unused later.

**4. Animation Libraries Stack:** Research found 4 animation libraries (framer-motion, gsap, animejs, cobe). Unclear if all are required or if some are optional. Evaluate actual usage during Phase 4 inlining. Low risk — can install all initially and tree-shake unused.

**5. Environment Variables Inventory:** Extracted 60+ env vars from turbo.json but need to categorize which are required vs optional for Axite. Create comprehensive .env.example during Phase 7. Medium risk — missing env vars cause silent feature breakage.

**6. Asset CDN Strategy:** Supabase uses custom CDN (frontend-assets.supabase.com) with commit SHA cache busting. Unknown if Axite needs CDN or can rely on Vercel default. Decide during Phase 7 build config. Low risk — Vercel handles assets automatically.

## Sources

### Primary (HIGH confidence)
- [Supabase GitHub - apps/www](https://github.com/supabase/supabase/tree/master/apps/www) — Complete source code analysis
- [Supabase GitHub - pnpm-workspace.yaml](https://github.com/supabase/supabase/blob/master/pnpm-workspace.yaml) — Version catalog definitions
- [Supabase GitHub - packages/ui](https://github.com/supabase/supabase/tree/master/packages/ui) — UI component library structure
- [Next.js 15.5 Release](https://nextjs.org/blog/next-15-5) — Framework features and compatibility
- [pnpm Workspaces Documentation](https://pnpm.io/workspaces) — Workspace protocol behavior
- [pnpm Catalogs Documentation](https://pnpm.io/catalogs) — Catalog version resolution
- Live site analysis: https://supabase.com — Feature inventory and UX patterns

### Secondary (MEDIUM confidence)
- [Next.js transpilePackages docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages) — Monorepo package handling
- [Tailwind v3.4 Content Configuration](https://v3.tailwindcss.com/docs/content-configuration) — Path scanning behavior
- [GitHub: Next.js Standalone build for monorepos](https://github.com/vercel/next.js/discussions/35437) — Production build patterns
- [GitHub: Contentlayer Next.js 14 support](https://github.com/contentlayerdev/contentlayer/issues/575) — Contentlayer compatibility issues
- [Contentlayer to Content-Collections migration guide](https://www.yashagarwal.in/notes/contentlayer-to-content-collections) — Migration strategy

### Tertiary (LOW confidence)
- [isolate-package tool](https://github.com/0x80/isolate-package) — Automated monorepo extraction (not tested with Supabase)
- Community discussions on Turborepo extraction patterns — General guidance, not Supabase-specific

---
*Research completed: 2026-01-22*
*Ready for roadmap: yes*
