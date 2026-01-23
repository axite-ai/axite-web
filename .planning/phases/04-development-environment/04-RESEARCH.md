# Phase 4: Development Environment - Research

**Researched:** 2026-01-22
**Domain:** Next.js 15.5.9 development server, CSS configuration, Supabase codebase adaptation
**Confidence:** HIGH

## Summary

Phase 4 focuses on getting `pnpm dev` running without errors and the homepage loading in browser. The primary blocker is missing CSS imports in `apps/www/styles/index.css` that reference build artifacts (`packages/ui/build/css/`) that were never generated.

The existing Tailwind configuration already has a CSS variable stub pattern (from Phase 3), but the global CSS file still imports missing build artifacts. The solution involves either:
1. Creating stub CSS files that define the required CSS variables
2. Replacing the imports with inline CSS variable definitions
3. Running the Style Dictionary build process to generate the CSS (complex, requires design tokens)

**Primary recommendation:** Create minimal stub CSS files defining the required CSS variables, matching the pattern already established in the Tailwind config. This aligns with the Phase 3 approach and the CONTEXT.md decision to "stub Supabase-specific features."

## Current State Analysis

### Error Encountered

When running `npx next dev`:
```
Module not found: Can't resolve './../../../packages/ui/build/css/source/global.css'
Import trace for requested module:
./styles/index.css
```

### Root Cause

`apps/www/styles/index.css` contains these problematic imports:
```css
@import './../../../packages/ui/build/css/source/global.css';
@import './../../../packages/ui/build/css/themes/dark-combined.css';
@import './../../../packages/ui/build/css/themes/light.css';
```

And font imports from:
```css
url(../../../packages/common/assets/fonts/CustomFont-Book.woff2)
```

### What Works vs What's Missing

| Component | Status | Location |
|-----------|--------|----------|
| Tailwind config | Working | lib/config/tailwind.config.js |
| CSS variable stub (Tailwind) | Working | lib/config/tailwind.config.js (inline) |
| PostCSS config | Working | apps/www/postcss.config.js |
| Font files | Exist | lib/common/assets/fonts/ |
| Design token JSONs | Missing | lib/ui/tokens/ never existed |
| Build CSS artifacts | Missing | lib/ui/build/css/ never generated |

### The CSS Variable Problem

The Tailwind config already defines CSS variable stubs like:
```javascript
const color = {
  'foreground-DEFAULT': { cssVariable: 'var(--foreground-default)' },
  'background-DEFAULT': { cssVariable: 'var(--background-default)' },
  // ...
}
```

But these CSS variables need actual HSL values defined somewhere. The original Supabase build process:
1. Reads design tokens from `tokens/core/*.json` and `tokens/themes/*.json`
2. Uses Style Dictionary to transform them
3. Outputs to `build/css/source/global.css` (base colors) and `build/css/themes/*.css` (theme overrides)

### Fonts Path Analysis

The CSS references fonts at `../../../packages/common/assets/fonts/` but files are now at `../../../lib/common/assets/fonts/`. This is a simple path fix.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | ^15.5.9 | Framework | Already installed, dev command built-in |
| Tailwind CSS | 3.4.1 | Styling | Already configured with variable stubs |
| PostCSS | ^8.5.3 | CSS processing | Already configured |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @next/mdx | 15.3.1 | MDX support | Already installed, used for pages |
| gray-matter | ^4.0.3 | Frontmatter parsing | Content build script |
| dayjs | ^1.11.12 | Date handling | Content build script |

No new packages needed for Phase 4.

## Architecture Patterns

### Recommended Approach: CSS Variable Stubs

Follow the pattern established in Phase 3 for Tailwind config. Create minimal CSS files that define the required variables.

**Pattern: CSS Variable Stub Files**

Instead of regenerating the full design token pipeline, create stub CSS files that define the CSS variables with sensible defaults.

```css
/* lib/ui/src/styles/global.css (stub) */
:root {
  /* Foreground colors - text */
  --foreground-default: 0 0% 9%;
  --foreground-light: 0 0% 32%;
  --foreground-lighter: 0 0% 45%;
  --foreground-muted: 0 0% 64%;

  /* Background colors */
  --background-default: 0 0% 100%;
  --background-alternative-default: 0 0% 98%;
  --background-selection: 143 76% 73%;
  --background-surface-100: 0 0% 97%;
  --background-surface-200: 0 0% 95%;
  --background-surface-300: 0 0% 92%;
  --background-200: 0 0% 96%;

  /* Border colors */
  --border-default: 0 0% 89%;
  --border-muted: 0 0% 93%;
  --border-strong: 0 0% 78%;
  --border-stronger: 0 0% 67%;

  /* Brand colors - Supabase green as placeholder */
  --brand-default: 153 60% 53%;
  --brand-300: 153 60% 40%;
  --brand-500: 153 60% 65%;
}
```

### Pattern: Path Fix for Font Imports

Update CSS paths from `packages/` to `lib/`:
```css
/* Before */
url(../../../packages/common/assets/fonts/CustomFont-Book.woff2)

/* After */
url(../../../lib/common/assets/fonts/CustomFont-Book.woff2)
```

### Pattern: No-op for Analytics

Per CONTEXT.md, mock analytics calls:
```typescript
// lib/common/analytics.ts (stub)
export const track = () => {}
export const identify = () => {}
export const page = () => {}
```

## Don't Hand-Roll

Problems with existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSS variable values | Full design token pipeline | Stub CSS files | Design tokens require Figma source + Style Dictionary setup |
| Theme switching | Custom solution | next-themes (already installed) | Battle-tested, SSR-aware |
| Dynamic content | Complex CMS integration | Mock data / static content | Per CONTEXT.md - just make routes not crash |

**Key insight:** The design token pipeline (Style Dictionary) requires source JSON files that were never extracted from Figma. Rebuilding this would be a major effort. Stub CSS files are the pragmatic choice.

## Common Pitfalls

### Pitfall 1: Trying to Run the Design Token Build

**What goes wrong:** Attempting to run `pnpm run transform-tokens` in lib/ui fails because the `tokens/core/*.json` and `tokens/themes/*.json` files don't exist.

**Why it happens:** The design token JSON files are generated from Figma and were never included in the Supabase repo extraction.

**How to avoid:** Create stub CSS files directly instead of trying to regenerate the token pipeline.

**Warning signs:** `glob.sync` returning empty arrays, Style Dictionary errors about missing source files.

### Pitfall 2: HSL Format Mismatch

**What goes wrong:** CSS variables defined as `hsl(153 60% 53%)` vs `153 60% 53%` - Tailwind expects just the values without `hsl()` wrapper.

**Why it happens:** The Tailwind config transforms variables like `hsl(var(--foreground-default) / <alpha-value>)`, so the variable must contain just the HSL values.

**How to avoid:** Define variables as `--foreground-default: 0 0% 9%;` not `--foreground-default: hsl(0 0% 9%);`

**Warning signs:** Colors not appearing, CSS syntax errors, alpha transparency not working.

### Pitfall 3: Path References After Package Move

**What goes wrong:** CSS/JS imports still reference `packages/` instead of `lib/`.

**Why it happens:** Not all references were updated in Phase 2.

**How to avoid:** Search for all `../packages/` or `/packages/` references and update to `../lib/` or `/lib/`.

**Warning signs:** Module not found errors referencing `packages/`.

### Pitfall 4: Environment Variable Errors Blocking Dev

**What goes wrong:** Missing Supabase/analytics env vars cause fatal startup errors.

**Why it happens:** Code expects `process.env.SUPABASE_URL` etc.

**How to avoid:** Per CONTEXT.md - mock the calls, don't require real env vars for dev.

**Warning signs:** "Missing environment variable" errors at startup.

## Code Examples

### CSS Variable Stub File (Light Theme Base)

```css
/* lib/ui/src/styles/variables.css */
:root {
  /* Foreground (text) colors - light theme */
  --foreground-default: 0 0% 9%;
  --foreground-light: 0 0% 32%;
  --foreground-lighter: 0 0% 45%;
  --foreground-muted: 0 0% 64%;

  /* Background colors - light theme */
  --background-default: 0 0% 100%;
  --background-alternative-default: 0 0% 98%;
  --background-selection: 143 76% 73%;
  --background-surface-100: 0 0% 97%;
  --background-surface-200: 0 0% 95%;
  --background-surface-300: 0 0% 92%;
  --background-200: 0 0% 96%;

  /* Border colors - light theme */
  --border-default: 0 0% 89%;
  --border-muted: 0 0% 93%;
  --border-strong: 0 0% 78%;
  --border-stronger: 0 0% 67%;

  /* Brand colors - placeholder green */
  --brand-default: 153 60% 53%;
  --brand-300: 153 60% 40%;
  --brand-500: 153 60% 65%;
}

/* Dark theme overrides */
.dark,
[data-theme="dark"],
[data-theme*="dark"] {
  --foreground-default: 0 0% 98%;
  --foreground-light: 0 0% 85%;
  --foreground-lighter: 0 0% 70%;
  --foreground-muted: 0 0% 55%;

  --background-default: 0 0% 7%;
  --background-alternative-default: 0 0% 10%;
  --background-selection: 153 60% 25%;
  --background-surface-100: 0 0% 12%;
  --background-surface-200: 0 0% 15%;
  --background-surface-300: 0 0% 18%;
  --background-200: 0 0% 13%;

  --border-default: 0 0% 20%;
  --border-muted: 0 0% 15%;
  --border-strong: 0 0% 30%;
  --border-stronger: 0 0% 40%;
}
```

### Updated styles/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url(../pages/launch-week/launchWeek.css);

/* Replace build artifacts with stub files */
@import './../../../lib/ui/src/styles/variables.css';

/* Rest of the file unchanged... */
```

### Analytics No-op Pattern

```typescript
// In common package or inline
export const analytics = {
  track: (event: string, properties?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[Analytics stub]', event, properties)
    }
  },
  identify: () => {},
  page: () => {},
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Figma tokens + Style Dictionary | CSS variable stubs | Phase 3/4 | Removes dependency on design token pipeline |
| packages/ directory | lib/ directory | Phase 2 | All paths need updating |
| Real Supabase backend | Mocked/no-op calls | Phase 4 | Per CONTEXT.md decision |

**Deprecated/outdated:**
- `packages/` paths - all moved to `lib/`
- Design token build process - not needed for standalone site

## Open Questions

### 1. Exact CSS Variable Values

- **What we know:** Variables names are known from Tailwind config stub
- **What's unclear:** Exact HSL values for Supabase's original design system
- **Recommendation:** Use sensible defaults (grayscale for foreground/background/border, green for brand). These will be replaced in Phase 8 (branding) anyway.

### 2. Which Pages Will Render vs Crash

- **What we know:** Homepage and basic marketing pages should work
- **What's unclear:** Which Supabase-specific pages have hard dependencies that will crash
- **Recommendation:** Per CONTEXT.md - judge per-page, 404 is acceptable, crashes are not.

### 3. Hot Reload Verification

- **What we know:** Next.js 15.5.9 supports Fast Refresh out of box
- **What's unclear:** Any issues with the MDX/CodeHike setup
- **Recommendation:** Verify by editing a Tailwind class after initial load succeeds.

## Task Breakdown Recommendation

Based on research, Phase 4 should include these plans:

### Plan 1: Fix CSS Imports (Critical Blocker)
1. Create CSS variable stub file at `lib/ui/src/styles/variables.css`
2. Update `apps/www/styles/index.css` to import from new location
3. Fix font paths from `packages/` to `lib/`
4. Verify: `pnpm dev` starts without CSS module errors

### Plan 2: Mock External Dependencies
1. Create analytics no-op stubs
2. Mock Supabase SDK calls (return empty/mock data)
3. Create `.env.example` with all required variables documented
4. Verify: No env var crashes at startup

### Plan 3: Page Route Fixes
1. Verify homepage renders
2. Test navigation to core pages (pricing, about)
3. Stub any crashing dynamic routes with mock data
4. Verify: Navigation doesn't crash, hot reload works

## Sources

### Primary (HIGH confidence)
- `/vercel/next.js` Context7 - Next.js dev server and Fast Refresh documentation
- Direct codebase analysis - actual error messages and file contents

### Secondary (MEDIUM confidence)
- Phase 3 summary - established CSS variable stub pattern
- CONTEXT.md - user decisions constraining approach

### Tertiary (LOW confidence)
- None - all findings verified with codebase analysis

## Metadata

**Confidence breakdown:**
- CSS stub approach: HIGH - follows established Phase 3 pattern
- Path fixes: HIGH - direct file analysis
- Mock strategy: HIGH - per CONTEXT.md decisions
- Exact variable values: MEDIUM - sensible defaults, will be replaced in branding

**Research date:** 2026-01-22
**Valid until:** 7 days (fast-moving, active development)
