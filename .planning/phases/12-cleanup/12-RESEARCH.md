# Phase 12: Cleanup - Research

**Researched:** 2026-01-24
**Domain:** Next.js page removal, routing configuration, and dead code cleanup
**Confidence:** HIGH

## Summary

This phase involves removing pages and associated files from a Next.js hybrid application (Pages Router + App Router). The cleanup is straightforward file deletion with some routing configuration updates.

The project uses:
- Pages Router for most pages (`/product`, `/pricing`, `/enterprise` via `/solutions/enterprise.tsx`)
- App Router for the blog (`apps/www/app/blog/`)
- A large redirects.js file (~3000 lines) with ~230 blog-related redirects
- Custom navigation and footer data files

**Primary recommendation:** Delete page files, remove associated data/components, update navigation/footer, add redirects to homepage for removed paths.

## Standard Stack

This is a cleanup/deletion phase. No new libraries needed.

### Core
| Item | Version | Purpose | Status |
|------|---------|---------|--------|
| Next.js | 15.5.9 | Page routing | Already installed |
| File system | - | Delete files | Native |

### Configuration Files
| File | Purpose | Needs Update |
|------|---------|--------------|
| `lib/redirects.js` | Route redirects | Add 4 new redirects |
| `data/nav.tsx` | Main navigation | Remove links |
| `data/Footer.ts` | Footer links | Remove links |
| `next.config.mjs` | Build config | No changes needed |

## Architecture Patterns

### File Deletion Strategy

1. **Pages to delete (Pages Router):**
   - `pages/product.tsx` - Product page
   - `pages/pricing.tsx` - Pricing page
   - `pages/solutions/enterprise.tsx` - Enterprise page (note: `/enterprise` redirects here)

2. **Blog system to delete (App Router):**
   - `app/blog/` - Entire directory (8 files)
   - `_blog/` - All 10 MDX blog posts

3. **Associated data files to delete:**
   - `data/product.tsx` - Product page content
   - `data/enterprise.tsx` - Enterprise page content
   - `data/PricingAddOnTable.json` - Pricing data
   - `data/PricingFAQ.json` - Pricing FAQs
   - `data/products/governance/` - Product-specific visuals (1 file)

4. **Associated components to delete (CLEAN-10):**
   - `components/Pricing/` - 14 files (used only by pricing page)
   - `components/Enterprise/` - 6 files (used only by enterprise page)

### Redirect Pattern
```javascript
// Add to lib/redirects.js
{
  permanent: false, // Use false - pages may return
  source: '/product',
  destination: '/',
},
{
  permanent: false,
  source: '/pricing',
  destination: '/',
},
{
  permanent: false,
  source: '/enterprise',
  destination: '/',
},
{
  permanent: false,
  source: '/blog/:path*',
  destination: '/',
},
```

### Navigation Update Pattern

Update `data/nav.tsx`:
```tsx
// BEFORE: 5 nav items
primaryNav: [
  { title: 'Product', ... },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Enterprise', url: '/enterprise' },
  { title: 'Blog', url: '/blog' },
  { title: 'Trust', url: '/trust' },
]

// AFTER: 1 nav item (Trust only)
primaryNav: [
  { title: 'Trust', url: '/trust' },
]
```

Update `data/Footer.ts`:
```tsx
// Remove Product section entirely
// Remove Blog from Resources section
// Remove Enterprise from Company section
// Keep: Legal section (terms, privacy, security, dpa)
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Redirect handling | Custom middleware | `lib/redirects.js` | Already exists, well-tested |
| 404 handling | Custom per-page | Existing `pages/404.tsx` | Already styled, works |

## Common Pitfalls

### Pitfall 1: Orphaned Imports
**What goes wrong:** Components import deleted files, build fails
**Why it happens:** Files reference each other, deletion order matters
**How to avoid:**
1. Search for imports of deleted files before committing
2. Run `pnpm build` to catch broken imports
**Warning signs:** Import errors, "Module not found"

### Pitfall 2: Missing Blog Redirects
**What goes wrong:** ~230 existing blog redirects in `redirects.js` still point to deleted blog
**Why it happens:** Forgetting that legacy redirects exist
**How to avoid:**
1. Review redirects.js for blog-related rules
2. Decision: Either remove them or keep them (they'll hit the catch-all `/blog/:path*` redirect)
**Warning signs:** Redirect loops, unexpected 404s

### Pitfall 3: Sitemap Still Lists Deleted Pages
**What goes wrong:** `generate-sitemap.mjs` still tries to include blog posts
**Why it happens:** Sitemap script reads from `_blog/` directory
**How to avoid:** Update or delete sitemap generation that references `_blog/`
**Warning signs:** Build warnings about missing files

### Pitfall 4: ProductDropdown Component
**What goes wrong:** Navigation still tries to render ProductDropdown
**Why it happens:** `data/nav.tsx` references `ProductDropdown` component
**How to avoid:** Update nav.tsx when removing Product dropdown
**Warning signs:** Console errors, missing dropdown

## Code Examples

### Deleting Pages (verified pattern)

```bash
# Delete page files
rm apps/www/pages/product.tsx
rm apps/www/pages/pricing.tsx
rm apps/www/pages/solutions/enterprise.tsx

# Delete blog (App Router)
rm -rf apps/www/app/blog/
rm -rf apps/www/_blog/

# Delete associated data
rm apps/www/data/product.tsx
rm apps/www/data/enterprise.tsx
rm apps/www/data/PricingAddOnTable.json
rm apps/www/data/PricingFAQ.json
rm -rf apps/www/data/products/governance/

# Delete associated components
rm -rf apps/www/components/Pricing/
rm -rf apps/www/components/Enterprise/
```

### Redirect Configuration (Next.js pattern)
Source: Next.js official docs

```javascript
// lib/redirects.js - Add at start of array
{
  permanent: false,
  source: '/product',
  destination: '/',
},
{
  permanent: false,
  source: '/pricing',
  destination: '/',
},
{
  permanent: false,
  source: '/enterprise',
  destination: '/',
},
{
  permanent: false,
  source: '/blog',
  destination: '/',
},
{
  permanent: false,
  source: '/blog/:path*',
  destination: '/',
},
```

## State of the Art

| Aspect | Approach | Notes |
|--------|----------|-------|
| Page removal | Delete file + add redirect | Standard Next.js pattern |
| Redirect type | 307 (temporary) | `permanent: false` - pages may return |
| Blog removal | Delete App Router directory | No special handling needed |

## Files to Keep (KEEP-01, KEEP-02)

The following files must remain functional:

| File | Route | Purpose |
|------|-------|---------|
| `pages/trust.mdx` | `/trust` | Trust Center - security information |
| `pages/terms.mdx` | `/terms` | Terms of Service |
| `pages/privacy.mdx` | `/privacy` | Privacy Policy |
| `pages/privacy-241009.mdx` | `/privacy-241009` | Historical privacy version |
| `pages/privacy-250314.mdx` | `/privacy-250314` | Historical privacy version |
| `pages/legal/dpa.tsx` | `/legal/dpa` | Data Processing Agreement |
| `pages/security.mdx` | `/security` | Security policy |

**Verification after cleanup:**
- Navigate to `/trust` - should load correctly
- Navigate to `/terms` - should load correctly
- Navigate to `/privacy` - should load correctly

## Files Summary

### To Delete (26+ files)

**Pages (3):**
- `pages/product.tsx`
- `pages/pricing.tsx`
- `pages/solutions/enterprise.tsx`

**Blog App Router (8):**
- `app/blog/page.tsx`
- `app/blog/BlogClient.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/[slug]/BlogPostClient.tsx`
- `app/blog/tags/[tag]/page.tsx`
- `app/blog/categories/[category]/page.tsx`
- `app/blog/authors/[author]/page.tsx`
- `app/blog/authors/[author]/AuthorClient.tsx`

**Blog Posts (10):**
- All files in `_blog/` directory

**Data Files (5):**
- `data/product.tsx`
- `data/enterprise.tsx`
- `data/PricingAddOnTable.json`
- `data/PricingFAQ.json`
- `data/products/governance/agent-gateway-visual.tsx`

**Components (20):**
- `components/Pricing/` (14 files)
- `components/Enterprise/` (6 files)

### To Update (3)

**Configuration (1):**
- `lib/redirects.js` - Add 5 redirects

**Navigation (2):**
- `data/nav.tsx` - Remove Product, Pricing, Enterprise, Blog
- `data/Footer.ts` - Remove Product section, Blog link, Enterprise link

## Open Questions

1. **Existing blog redirects in redirects.js**
   - What we know: ~230 lines reference `/blog/` paths
   - What's unclear: Should these be removed or left (catch-all handles)?
   - Recommendation: Leave them - catch-all redirect handles, removing is risky

2. **Sitemap generation**
   - What we know: `generate-sitemap.mjs` reads from `_blog/`
   - What's unclear: Will it fail or gracefully handle missing directory?
   - Recommendation: Test after deletion, update if errors

3. **API routes for blog**
   - What we know: `app/api-v2/blog-posts/route.ts` exists
   - What's unclear: Is it used by anything other than blog?
   - Recommendation: Delete it with blog, verify build works

## Sources

### Primary (HIGH confidence)
- Context7 `/vercel/next.js` - Redirects configuration, 404 handling
- Project files directly examined - Structure verified

### Secondary (MEDIUM confidence)
- Next.js official documentation patterns

## Metadata

**Confidence breakdown:**
- File identification: HIGH - Direct file examination
- Redirect pattern: HIGH - Next.js official docs
- Component dependencies: HIGH - Grep verified usage

**Research date:** 2026-01-24
**Valid until:** 90 days (stable project-specific cleanup)
