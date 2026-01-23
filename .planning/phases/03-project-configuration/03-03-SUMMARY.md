---
phase: "03"
plan: "03"
subsystem: "build-config"
tags: ["next.js", "configuration", "env-vars", "standalone"]
dependency-graph:
  requires: ["02-04"]
  provides: ["standalone-next-config", "env-documentation"]
  affects: ["03-04", "04-*"]
tech-stack:
  added: []
  patterns: ["standalone-config"]
key-files:
  created:
    - apps/www/.env.example
  modified:
    - apps/www/next.config.mjs
decisions:
  - id: "sentry-removal"
    choice: "Remove Sentry integration entirely"
    reason: "Supabase-specific project, can add our own later if needed"
  - id: "transpile-packages-cleanup"
    choice: "Remove local packages from transpilePackages"
    reason: "TypeScript path aliases handle lib/ resolution; only external packages need transpilation"
  - id: "asset-prefix-disabled"
    choice: "Disable getAssetPrefix (return undefined)"
    reason: "No CDN asset hosting for standalone project"
metrics:
  duration: "2 min"
  completed: "2026-01-23"
---

# Phase 03 Plan 03: Next.js Config Cleanup Summary

**One-liner:** Standalone next.config.mjs without Sentry wrapper, monorepo transpilePackages, or Supabase CDN references.

## What Was Done

### Task 1: Clean next.config.mjs of monorepo and Supabase-specific config
- **Removed** `@sentry/nextjs` import and `withSentryConfig` export wrapper
- **Simplified** `transpilePackages` to only include external `@octokit/plugin-paginate-graphql`
- **Disabled** `getAssetPrefix()` (returns undefined - no Supabase CDN)
- **Simplified** HSTS header (empty value, configure in production)
- **Preserved** MDX configuration, bundle analyzer, image patterns, rewrites/redirects

### Task 2: Create .env.example
- **Created** comprehensive `.env.example` documenting all discovered env vars
- **Organized** by category: URLs, build config, Vercel, feature flags, Supabase, GitHub, external services
- **Included** test values for hCaptcha (enables local development)

## Verification Results

| Check | Result |
|-------|--------|
| No @sentry/nextjs import | PASS |
| transpilePackages only has external packages | PASS |
| getAssetPrefix returns undefined | PASS |
| .env.example exists | PASS |
| Config file syntax valid | PASS |

## Commits

| Hash | Type | Description |
|------|------|-------------|
| 41e5557 | chore | Clean next.config.mjs of monorepo/Supabase artifacts |
| 937449c | docs | Create .env.example with documented environment variables |

## Decisions Made

1. **Sentry removal**: Removed entirely rather than stubbing - can add our own Sentry project later if needed
2. **transpilePackages cleanup**: Local lib/ packages are TypeScript and resolved via path aliases, don't need transpilation
3. **Asset prefix disabled**: No CDN hosting for standalone project

## Files Changed

**Modified:**
- `apps/www/next.config.mjs` - Standalone config without Sentry/monorepo dependencies

**Created:**
- `apps/www/.env.example` - Environment variable documentation (83 lines)

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

**Ready for:** Phase 03-04 (if exists) or Phase 04

**Note:** The config references `config/code-hike.theme.json` which requires the TypeScript path alias `config` -> `./config/`. This is already set up in tsconfig.json from previous phases. The config will work when Next.js loads it through its module resolution system.

**Remaining Supabase-specific items in next.config.mjs:**
- `NEXT_PUBLIC_VERCEL_ENV` reference in typescript.ignoreBuildErrors (harmless - uses production default if missing)
- Image remote patterns (may need cleanup in content transformation phase)
- Rewrites/redirects (will be audited in content transformation phase)
