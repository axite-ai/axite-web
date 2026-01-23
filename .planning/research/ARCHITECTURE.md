# Architecture: Supabase www Extraction

**Domain:** Next.js Marketing Site Monorepo Extraction
**Researched:** 2026-01-22
**Confidence:** HIGH (based on direct GitHub API analysis of source code)

## Executive Summary

The Supabase www app is a Next.js marketing website embedded within a Turborepo monorepo. It uses both the Pages Router (majority of pages) and App Router (newer features like blog). The app has **9 direct workspace dependencies** that must be either extracted or replaced. This document maps the complete architecture and provides a suggested extraction order.

## Directory Structure Overview

### Root Monorepo Structure

```
supabase/
├── apps/
│   ├── cms/          # Payload CMS for content management
│   ├── design-system/ # Component documentation
│   ├── docs/         # Documentation site
│   ├── studio/       # Dashboard application
│   ├── ui-library/   # UI component library docs
│   └── www/          # Marketing website (TARGET)
├── packages/
│   ├── ai-commands/   # AI functionality (used by www)
│   ├── api-types/     # TypeScript API types
│   ├── build-icons/   # Icon build tooling
│   ├── common/        # Shared utilities (used by www)
│   ├── config/        # Shared Tailwind/PostCSS config (used by www)
│   ├── eslint-config-supabase/ # Shared ESLint config (used by www)
│   ├── generator/     # Code generation
│   ├── icons/         # Icon components (used by www)
│   ├── pg-meta/       # Postgres metadata
│   ├── shared-data/   # Shared static data (used by www)
│   ├── tsconfig/      # Shared TypeScript configs (used by www)
│   ├── ui/            # UI components (used by www)
│   └── ui-patterns/   # Complex UI patterns (used by www)
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

### www App Structure

```
apps/www/
├── @types/           # Local type definitions
├── _alternatives/    # Alternative product pages content
├── _blog/            # Blog post MDX files
├── _customers/       # Customer story MDX files
├── _events/          # Event content
├── app/              # App Router (newer pages)
│   ├── api-v2/       # API routes
│   ├── blog/         # Blog pages (App Router)
│   ├── contribute/   # Contribution pages
│   ├── events/       # Event pages
│   ├── layout.tsx    # Root layout
│   ├── providers.tsx # Context providers
│   └── wrapped/      # Year-wrapped feature
├── components/       # 70+ component directories
├── data/             # Static data files
├── hooks/            # Custom React hooks
├── internals/        # Build scripts (sitemap generation)
├── layouts/          # Page layout components
├── lib/              # Utilities, API clients, helpers
├── pages/            # Pages Router (majority of site)
│   ├── _app.tsx      # App wrapper
│   ├── _document.tsx # Document wrapper
│   ├── api/          # API routes
│   ├── blog/         # (redirects to App Router)
│   ├── customers/    # Customer pages
│   ├── events/       # Event pages
│   ├── features/     # Feature pages
│   ├── launch-week/  # Launch week pages
│   ├── legal/        # Legal pages
│   ├── modules/      # Product modules
│   ├── partners/     # Partner pages
│   └── solutions/    # Solution pages
├── public/           # Static assets
├── scripts/          # Build scripts
├── styles/           # Global CSS
├── supabase/         # Supabase client config
├── types/            # TypeScript types
├── next.config.mjs   # Next.js configuration
├── tailwind.config.js # Tailwind (extends config package)
├── tsconfig.json     # TypeScript config
├── postcss.config.js # PostCSS config
└── package.json      # Dependencies
```

## Package Dependency Graph

### www Direct Workspace Dependencies

```
www (apps/www)
├── ai-commands (workspace:*)      # AI chat/assistant features
├── common (workspace:*)           # Auth, telemetry, feature flags
├── config (workspace:*)           # Tailwind config, themes
├── eslint-config-supabase (workspace:*) # ESLint configuration
├── icons (workspace:*)            # Icon components
├── shared-data (workspace:*)      # Static data (pricing, products)
├── tsconfig (workspace:*)         # TypeScript base configs
├── ui (workspace:*)               # 40+ UI components
└── ui-patterns (workspace:*)      # Complex UI patterns
```

### Package Dependency Tree

```
Level 0 (No internal deps):
├── tsconfig           # Base TypeScript configs (JSON files only)
├── api-types          # API type definitions
└── shared-data        # Static data exports

Level 1 (Depends on Level 0):
├── config             # Tailwind config
│   └── (no workspace deps)
├── eslint-config-supabase
│   └── (no workspace deps, dev deps only)
└── icons
    └── @supabase/build-icons (workspace)

Level 2 (Depends on Level 0-1):
├── common
│   ├── api-types
│   ├── config
│   └── tsconfig
└── ai-commands
    ├── config
    └── tsconfig

Level 3 (Depends on Level 0-2):
├── ui
│   ├── common
│   ├── config
│   └── tsconfig
└── ui-patterns
    ├── common
    ├── icons
    ├── tsconfig
    └── ui

Level 4 (Final - www app):
└── www
    ├── ai-commands
    ├── common
    ├── config
    ├── eslint-config-supabase
    ├── icons
    ├── shared-data
    ├── tsconfig
    ├── ui
    └── ui-patterns
```

### Dependency Matrix

| Package | api-types | config | tsconfig | common | icons | ui |
|---------|-----------|--------|----------|--------|-------|-----|
| common | YES | YES | YES | - | - | - |
| icons | - | - | - | - | - | - |
| ui | - | YES | YES | YES | - | - |
| ui-patterns | YES | - | YES | YES | YES | YES |
| ai-commands | YES | YES | YES | - | - | - |
| www | YES | YES | YES | YES | YES | YES |

## Build Configuration Analysis

### next.config.mjs Key Features

```javascript
// Critical configurations for extraction:

// 1. Transpile workspace packages (MUST handle in standalone)
transpilePackages: [
  'ui',
  'ui-patterns',
  'common',
  'shared-data',
  'icons',
  'api-types',
  '@octokit/plugin-paginate-graphql',
],

// 2. MDX support with Code Hike
const withMDX = nextMdx({
  remarkPlugins: [remarkCodeHike, remarkGfm],
  rehypePlugins: [rehypeSlug],
})

// 3. Sentry integration
export default withSentryConfig(configExport, { ... })

// 4. Asset CDN (production only)
assetPrefix: getAssetPrefix() // CDN for static assets

// 5. Custom redirects/rewrites
async redirects() { return redirects }
async rewrites() { return rewrites }
```

### tsconfig.json Key Paths

```json
{
  "compilerOptions": {
    "paths": {
      "contentlayer/generated": ["./.contentlayer/generated"],
      "~/*": ["./*"],      // deprecated
      "@/*": ["./*"],      // current
      "@ui/*": ["./../../packages/ui/src/*"]  // NEEDS FIXING
    }
  }
}
```

### tailwind.config.js

```javascript
// Extends shared config package
const config = require('config/tailwind.config')

module.exports = config({
  content: [
    // Local paths
    './_blog/*.mdx',
    './components/**/*.tsx',
    // ... more local paths

    // Package paths - NEED TO CHANGE
    './../../packages/ui/src/**/*.{tsx,ts,js}',
    './../../packages/ui-patterns/src/**/*.{tsx,ts,js}',
  ],
})
```

## Cross-App Dependencies

### Shared Between www and docs

Both apps share these workspace packages:
- `ai-commands` - AI functionality
- `common` - Auth, telemetry, utilities
- `config` - Tailwind configuration
- `eslint-config-supabase` - Linting rules
- `icons` - Icon components
- `shared-data` - Static data
- `ui` - UI components
- `ui-patterns` - Complex UI patterns

### www-Specific Features

The www app has unique features not shared with other apps:
- Launch week features
- Customer stories/case studies
- Blog with CMS integration
- Partners portal
- Events system
- Open source section
- Pricing calculator

## Catalog Versions (pnpm-workspace.yaml)

The monorepo uses `catalog:` protocol for version syncing:

```yaml
catalog:
  '@sentry/nextjs': ^10.26.0
  '@supabase/supabase-js': 2.87.0
  next: ^15.5.9
  react: ^18.3.0
  react-dom: ^18.3.0
  recharts: ^2.15.4
  tailwindcss: 3.4.1
  typescript: ~5.9.0
  zod: ^3.25.76
```

**Extraction implication:** Replace all `catalog:` with actual versions.

## Suggested Extraction Order

### Phase 1: Foundation Setup (No Dependencies)
1. Create new Next.js 15 project
2. Copy and adapt `tsconfig.json` (remove workspace path aliases)
3. Copy and adapt `tailwind.config.js`
4. Copy `postcss.config.js`

### Phase 2: Copy Static Packages
1. **tsconfig** - Copy JSON configs directly (trivial)
2. **shared-data** - Copy data files (pricing, products, etc.)
3. **api-types** - Copy type definitions

### Phase 3: Copy Config Package
1. **config** - Copy Tailwind config, themes, code-hike settings
   - Inline all settings into project's tailwind.config
   - Copy code-hike theme

### Phase 4: Copy Icons Package
1. **icons** - Copy generated icon components
   - Flatten into components/icons directory
   - Update import paths

### Phase 5: Copy Common Package (Critical)
1. **common** - Most complex extraction
   - Auth utilities
   - Feature flags (ConfigCat)
   - Telemetry (PostHog)
   - Database types
   - Consent management

   **Decision needed:** Keep Supabase integration or stub out?

### Phase 6: Copy UI Package
1. **ui** - 40+ components
   - Full Radix UI primitive library
   - shadcn-style components
   - Custom components (CodeBlock, TreeView, etc.)

   **Recommendation:** Copy entire src/ directory, update imports

### Phase 7: Copy UI Patterns Package
1. **ui-patterns** - Complex composed patterns
   - CommandMenu
   - AssistantChat
   - FilterBar
   - SQL-to-REST

   **Decision needed:** Which patterns are actually used in www?

### Phase 8: Copy AI Commands Package
1. **ai-commands** - AI functionality
   - Only if AI chat feature is needed
   - Can be deferred or removed

### Phase 9: Copy www App
1. Copy all directories from apps/www:
   - `pages/` (Pages Router)
   - `app/` (App Router)
   - `components/`
   - `lib/`
   - `layouts/`
   - `hooks/`
   - `styles/`
   - `public/`
   - Content directories (`_blog/`, `_customers/`, etc.)

### Phase 10: Fix Imports
1. Update all workspace imports to relative paths
2. Fix Tailwind content paths
3. Update tsconfig paths
4. Test build

## Build Files Requiring Modification

| File | Changes Needed |
|------|----------------|
| `package.json` | Remove workspace:*, use actual versions, remove preinstall |
| `tsconfig.json` | Update path aliases to relative paths |
| `tailwind.config.js` | Inline config package, update content paths |
| `next.config.mjs` | Remove transpilePackages (now local), update Sentry config |
| `postcss.config.js` | Usually unchanged |
| `.env.local.example` | Copy and document required vars |

## Environment Variables

The www app requires these environment variable groups:

### Public Variables (NEXT_PUBLIC_*)
- Supabase connection
- Analytics/telemetry
- Feature URLs
- hCaptcha

### Server-Side Variables
- GitHub API (changelog)
- HubSpot (forms)
- OpenAI (AI features)
- Email/Slack webhooks
- Sentry

**Extraction implication:** Create comprehensive .env.example

## Risk Assessment

### High Risk
- **ui/ui-patterns extraction** - Large surface area, many interdependencies
- **common package** - Auth, telemetry tightly coupled
- **MDX/Code Hike** - Complex remark/rehype plugin chain

### Medium Risk
- **Tailwind config** - Shared theme must be fully extracted
- **TypeScript paths** - Multiple alias patterns in use
- **API routes** - Some may depend on internal services

### Low Risk
- **tsconfig** - Simple JSON files
- **shared-data** - Static exports
- **icons** - Generated components

## Sources

- GitHub API: `repos/supabase/supabase/contents/*`
- Official package.json files from each package
- turbo.json build configuration
- pnpm-workspace.yaml catalog definitions
- Confidence: HIGH - direct source code analysis
