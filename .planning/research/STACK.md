# Technology Stack: Supabase www Extraction

**Project:** Axite Marketing Website (extracted from Supabase www)
**Researched:** 2026-01-22
**Overall Confidence:** HIGH

## Executive Summary

Supabase's www app is a production-grade Next.js 15.5.9+ marketing site using React 18.3.x with a hybrid Pages Router + App Router architecture. The site depends heavily on 8 internal monorepo packages (ui, ui-patterns, common, config, shared-data, icons, ai-commands, api-types) that provide UI components, shared configuration, and utilities. Extracting this to a standalone app requires inlining these shared packages and removing Turborepo dependencies.

**Key Challenge:** The `ui` package alone has 30+ Radix UI dependencies, 20+ utility libraries, and provides ~50 component exports. This is the largest inlining effort.

---

## Recommended Stack (for Axite Standalone)

### Core Framework

| Technology | Supabase Version | Recommended Version | Purpose | Rationale |
|------------|------------------|---------------------|---------|-----------|
| Next.js | ^15.5.9 (catalog) | 15.5.9 or 16.1.x | Full-stack React framework | Match Supabase's tested version initially; upgrade to 16.x is optional |
| React | ^18.3.0 (catalog) | 18.3.1 | UI library | Supabase uses React 18, not 19. Keep for compatibility. |
| React DOM | ^18.3.0 (catalog) | 18.3.1 | DOM rendering | Matches React version |
| TypeScript | ~5.9.0 (catalog) | 5.9.x | Type safety | Matches Supabase's tested version |

**Confidence:** HIGH - Versions verified from pnpm-workspace.yaml catalog definitions.

### Styling

| Technology | Supabase Version | Recommended | Purpose | Rationale |
|------------|------------------|-------------|---------|-----------|
| Tailwind CSS | 3.4.1 (catalog) | 3.4.x | Utility-first CSS | **Keep v3.4.x, NOT v4.0** - Supabase uses v3 with JS config file; v4 requires migration |
| PostCSS | ^8.5.3 | 8.5.x | CSS processing | Required for Tailwind |
| tailwindcss-animate | (via config pkg) | ^1.0.7 | Animation utilities | Used in shared config package |
| @tailwindcss/forms | (via config pkg) | ^0.5.x | Form styling | Used in UI components |
| @tailwindcss/typography | (via config pkg) | ^0.5.x | Prose styling | Blog/content pages |

**Confidence:** HIGH - Tailwind v3.4.1 explicitly in catalog. Do NOT upgrade to v4 without migration.

### UI Components (from Supabase UI package)

| Library | Version | Purpose | Must Inline |
|---------|---------|---------|-------------|
| @radix-ui/* | Various | 30+ primitives (accordion, dialog, dropdown, popover, select, tabs, tooltip, etc.) | YES - keep as direct dependencies |
| class-variance-authority | ^0.7.1 | Component variant styling | YES |
| clsx | ^1.2.1 | Class name composition | YES |
| tailwind-merge | (via ui) | Tailwind class deduplication | YES |
| lucide-react | * (latest) | Icon library | YES |
| framer-motion | ^11.0.3 | Animations | YES |
| next-themes | ^0.3.0 | Theme switching | YES |
| sonner | (via ui) | Toast notifications | YES |
| cmdk | (via ui) | Command palette | YES |
| vaul | (via ui) | Drawer component | YES |
| recharts | ^2.15.4 (catalog) | Charts | YES if charts needed |

**Confidence:** HIGH - Extracted from ui/package.json dependencies.

### Content & MDX

| Technology | Version | Purpose | Rationale |
|------------|---------|---------|-----------|
| @mdx-js/react | ^2.3.0 | MDX rendering | Blog and documentation pages |
| @next/mdx | 15.3.1 | Next.js MDX integration | Matches Next.js version |
| @code-hike/mdx | ^0.9.0 | Code highlighting in MDX | Syntax highlighting with animations |
| next-mdx-remote | ^4.4.1 | Remote MDX loading | Dynamic MDX content |
| gray-matter | ^4.0.3 | Frontmatter parsing | Blog metadata |
| remark-gfm | ^3.0.1 | GitHub Flavored Markdown | Tables, strikethrough, etc. |
| rehype-slug | ^5.1.0 | Heading IDs | Anchor links |

**Confidence:** HIGH - Extracted from www/package.json.

### Animation & Interaction

| Library | Version | Purpose | Required |
|---------|---------|---------|----------|
| framer-motion | ^11.0.3 | React animations | YES |
| gsap | ^3.13.0 | Advanced animations | YES - used for scrollytelling |
| @bsmnt/scrollytelling | ^0.3.3 | Scroll-triggered animations | YES |
| animejs | ^4.0.2 | JavaScript animations | YES |
| cobe | ^0.6.5 | Globe visualization | OPTIONAL - landing page globe |
| vanilla-tilt | 1.7.0 | 3D tilt effects | OPTIONAL |
| typed.js | ^2.0.16 | Typewriter effect | OPTIONAL |
| swiper | ^11.0.7 | Carousel/slider | OPTIONAL |

**Confidence:** HIGH - From www/package.json.

### Form & Validation

| Library | Version | Purpose | Required |
|---------|---------|---------|----------|
| react-hook-form | ^7.45.0 | Form state management | YES |
| @hookform/resolvers | ^3.1.1 | Validation resolvers | YES |
| zod | ^3.25.76 (catalog) | Schema validation | YES |
| yup | ^1.4.0 | Alternative validation | OPTIONAL - prefer Zod |
| @hcaptcha/react-hcaptcha | ^1.12.0 | Bot protection | YES for contact forms |

**Confidence:** HIGH - From www/package.json devDependencies.

### External Service Integrations

| Service | Purpose | Required for Axite | Replacement Strategy |
|---------|---------|-------------------|---------------------|
| **Supabase** | Backend database, auth | OPTIONAL | Can use for contact form storage |
| **PayloadCMS** | Headless CMS for blog | NO | Remove or replace with MDX files |
| **Sentry** | Error monitoring | OPTIONAL | Remove or keep |
| **hCaptcha** | Bot protection | YES | Keep for forms |
| **PostHog** | Analytics (via common pkg) | NO | Remove or replace |
| **ConfigCat** | Feature flags (via common pkg) | NO | Remove |
| **Usercentrics** | Cookie consent (via common pkg) | NO | Remove or replace |
| **Customer.io** | Email automation | NO | Remove |
| **Vercel** | Deployment | YES | Primary deployment target |

**Confidence:** HIGH - From .env.local.example and lib/ directory analysis.

---

## Shared Packages Analysis

### Required Packages (MUST Inline)

| Package | What It Provides | Inlining Strategy | Effort |
|---------|------------------|-------------------|--------|
| **ui** | 50+ React components, Radix wrappers, icons, shadcn-style system | Copy src/ directory, adjust imports | HIGH |
| **config** | Tailwind CSS configuration, design tokens | Copy tailwind.config, merge into project | MEDIUM |
| **shared-data** | Pricing, plans, products, regions data | Copy relevant TS files only | LOW |
| **icons** | Custom Supabase icon components | Copy generated icons or replace with lucide-react | LOW |

### Optional Packages (Can Remove or Replace)

| Package | What It Provides | Recommendation | Rationale |
|---------|------------------|----------------|-----------|
| **common** | PostHog, ConfigCat, Usercentrics, telemetry | REMOVE | Third-party analytics not needed |
| **ui-patterns** | Complex components (AssistantChat, CommandMenu, etc.) | PARTIAL | Only copy patterns actually used |
| **ai-commands** | OpenAI integration for AI features | REMOVE | Not needed for marketing site |
| **api-types** | TypeScript types for Supabase API | REMOVE | Not needed for standalone |

**Confidence:** HIGH - Analyzed each package.json and exports.

---

## Architecture Notes

### Hybrid Routing

Supabase www uses **both** Next.js routers:
- **Pages Router** (`/pages`): Main site pages - index, pricing, features, products, legal, etc.
- **App Router** (`/app`): Blog, events, contribute, wrapped (newer sections)

**Recommendation:** Keep hybrid architecture initially. Migrate to App Router only is optional and significant effort.

### Next.js Configuration Features Used

```javascript
// Key next.config.mjs features to preserve:
- pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
- MDX plugins: @code-hike/mdx, remark-gfm, rehype-slug
- transpilePackages: [] // Empty after inlining - no more workspace packages
- experimental: { esmExternals: 'loose' } // For Octokit compatibility
- Sentry integration (optional)
- Bundle analyzer (optional)
- Custom headers (X-Frame-Options, HSTS, caching)
```

### Content Build System

Supabase has a custom content build pipeline:
```bash
# From package.json scripts:
"content:build": "node ./scripts/static-content.mjs"
"dev": "npm run content:build && next dev"
"build": "npm run content:build && next build"
```

**What it does:** Pre-processes MDX/blog content, generates static data files.
**Action:** Review `scripts/static-content.mjs` and determine what to keep.

---

## Installation Commands (After Extraction)

```bash
# Create new project
npx create-next-app@15.5.9 axite-new --typescript --tailwind --app --src-dir

# Core dependencies (from Supabase www)
pnpm add react@18.3.1 react-dom@18.3.1 next@15.5.9

# UI Components
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \
  @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label \
  @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-portal \
  @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area \
  @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider \
  @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs \
  @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-tooltip

# Styling
pnpm add class-variance-authority clsx tailwind-merge tailwindcss-animate \
  @tailwindcss/forms @tailwindcss/typography

# Icons & UI
pnpm add lucide-react sonner cmdk vaul

# Animations
pnpm add framer-motion gsap @bsmnt/scrollytelling animejs

# MDX & Content
pnpm add @mdx-js/react @next/mdx @code-hike/mdx next-mdx-remote gray-matter \
  remark-gfm rehype-slug

# Forms
pnpm add react-hook-form @hookform/resolvers zod @hcaptcha/react-hcaptcha

# Themes
pnpm add next-themes

# Dev dependencies
pnpm add -D typescript @types/react @types/react-dom @types/node \
  postcss autoprefixer tailwindcss eslint eslint-config-next
```

---

## Version Verification

| Package | Claimed Version | Verification Source | Confidence |
|---------|-----------------|---------------------|------------|
| Next.js | ^15.5.9 | pnpm-workspace.yaml catalog | HIGH |
| React | ^18.3.0 | pnpm-workspace.yaml catalog | HIGH |
| Tailwind CSS | 3.4.1 | pnpm-workspace.yaml catalog | HIGH |
| TypeScript | ~5.9.0 | pnpm-workspace.yaml catalog | HIGH |
| Zod | ^3.25.76 | pnpm-workspace.yaml catalog | HIGH |
| framer-motion | ^11.0.3 | www/package.json | HIGH |
| @code-hike/mdx | ^0.9.0 | www/package.json | HIGH |

**Note:** Next.js 16.1.4 is now the latest stable (as of Jan 2026), but Supabase pins 15.5.9. Keep 15.5.9 for initial extraction to match tested configuration.

---

## Extraction Checklist

### Phase 1: Core Setup
- [ ] Create standalone Next.js 15.5.9 project
- [ ] Copy Tailwind config from packages/config
- [ ] Set up TypeScript config

### Phase 2: UI Package Inlining
- [ ] Copy packages/ui/src/components to project
- [ ] Copy packages/ui/src/lib utilities
- [ ] Update all import paths
- [ ] Install all Radix UI dependencies
- [ ] Verify component exports work standalone

### Phase 3: Shared Data
- [ ] Copy packages/shared-data files needed
- [ ] Update pricing/plans data for Axite
- [ ] Remove Supabase-specific data

### Phase 4: Pages Extraction
- [ ] Copy pages/ directory structure
- [ ] Copy app/ directory structure (blog, events)
- [ ] Remove PayloadCMS dependencies
- [ ] Remove common package dependencies

### Phase 5: Configuration
- [ ] Adapt next.config.mjs (remove transpilePackages)
- [ ] Set up environment variables
- [ ] Configure Vercel deployment

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| UI package complexity | HIGH | Incremental copying, test each component |
| Circular dependencies | MEDIUM | Map dependency graph before extraction |
| Missing peer dependencies | MEDIUM | Document all peer deps from each package |
| Tailwind config conflicts | LOW | Use Supabase's config as base |
| MDX processing differences | MEDIUM | Keep Code Hike config intact |

---

## Sources

- [Supabase GitHub - apps/www](https://github.com/supabase/supabase/tree/master/apps/www)
- [Supabase GitHub - pnpm-workspace.yaml](https://github.com/supabase/supabase/blob/master/pnpm-workspace.yaml)
- [Supabase GitHub - packages/ui](https://github.com/supabase/supabase/tree/master/packages/ui)
- [Next.js 15.5 Release](https://nextjs.org/blog/next-15-5)
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Next.js GitHub Releases](https://github.com/vercel/next.js/releases)
