# Phase 11: Blog Compatibility - Research

**Researched:** 2026-01-23
**Domain:** MDX Blog Content Replacement & Metadata Updates
**Confidence:** HIGH

## Summary

The blog system is fully operational with static MDX posts in `apps/www/_blog/` and CMS integration (stubbed). The task involves deleting 387 existing Supabase blog posts, creating 10 placeholder Axite posts using the same MDX patterns, and updating metadata references throughout the blog pages.

The existing blog infrastructure handles:
- MDX processing with gray-matter frontmatter parsing
- Code highlighting via @code-hike/mdx with custom theme
- TOC generation, reading time calculation
- Category/tag filtering, search, pagination
- Multiple post formats (videos, images, code blocks, admonitions)

**Primary recommendation:** Delete all `_blog/*.mdx` files, create 10 new Axite-focused posts using existing MDX features, update `authors.json` with Axite team, and update hardcoded Supabase references in blog page files.

## Standard Stack

### Core (Already in Place)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| gray-matter | - | MDX frontmatter parsing | Existing |
| next-mdx-remote | - | MDX serialization | Existing |
| @code-hike/mdx | 0.9.0 | Syntax highlighting | Existing |
| rehype-slug | - | Heading ID generation | Existing |
| remark-gfm | - | GitHub Flavored Markdown | Existing |

### Supporting
No new libraries needed. All MDX components are already available:
- `Admonition` - Callout boxes (note, tip, warning)
- `Img` - Responsive images with zoom
- `CodeBlock` - Syntax-highlighted code
- `video-container` - Embedded YouTube videos
- `BlogCollapsible` - Expandable sections

## Architecture Patterns

### MDX Post File Structure
```
apps/www/_blog/
├── YYYY-MM-DD-slug-name.mdx    # Filename determines slug and date
```

### Frontmatter Schema (Required Fields)
```yaml
---
title: 'Post Title'
description: 'Short description for SEO and previews'
author: author_id                # Must match authors.json
image: path/to/og-image.png      # Relative to /images/blog/
thumb: path/to/thumb-image.png   # Relative to /images/blog/
categories:
  - product                      # One of: product, company, developers, engineering
tags:
  - tag-name                     # For filtering and related posts
date: 'YYYY-MM-DD'               # ISO date string
toc_depth: 3                     # Optional, default 2
---
```

### Author Registration
Authors must be added to `/apps/www/lib/authors.json`:
```json
{
  "author_id": "axite_team",
  "author": "Axite Team",
  "position": "",
  "author_url": "https://axite.ai",
  "author_image_url": "/images/avatars/axite-logo.png"
}
```

### Category System
Hard-coded categories in `BlogFilters.tsx` line 51-59:
```typescript
const allCategories = [
  'all',
  'product',
  'company',
  'postgres',      // Could be 'security' for Axite
  'developers',
  'engineering',
  'launch-week',   // Could be 'updates' for Axite
]
```

For Axite, recommended categories:
- `product` - Feature announcements
- `engineering` - Technical deep-dives
- `developers` - Guides and tutorials
- `company` - Company news, updates

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Code syntax highlighting | Custom highlighter | @code-hike/mdx + existing theme | Complex token parsing, 50+ languages |
| TOC generation | Manual heading extraction | Existing remark plugin in mdxSerialize.ts | Already handles depth control |
| Image optimization | Manual sizing | Existing `<Img>` component | Handles responsive, zoom, lazy loading |
| Reading time | Custom word counting | Existing `generateReadingTime()` | Already integrated with posts.tsx |

**Key insight:** The blog infrastructure is mature and battle-tested. Focus only on content replacement and metadata updates.

## Common Pitfalls

### Pitfall 1: MDX Syntax Errors
**What goes wrong:** Self-closing tags like `<img>` or `<br>` cause MDX compilation failures
**Why it happens:** MDX 2.x requires JSX-compliant syntax
**How to avoid:** Always use `<img />`, `<br />`, `<hr />` with trailing slash
**Warning signs:** Build errors mentioning "unexpected token" in MDX files

### Pitfall 2: Author ID Mismatch
**What goes wrong:** Posts fail to display author info or show "Unknown Author"
**Why it happens:** `author:` field in frontmatter doesn't match any `author_id` in authors.json
**How to avoid:** Add Axite authors to authors.json before creating posts
**Warning signs:** Missing author avatars or names in blog list/post views

### Pitfall 3: Image Path Errors
**What goes wrong:** Broken images on blog posts
**Why it happens:** Image paths in frontmatter are relative to `/images/blog/`
**How to avoid:** Either use existing placeholder images or create simple ones; verify paths
**Warning signs:** 404 errors in console for image requests

### Pitfall 4: Date Format Issues
**What goes wrong:** Posts appear out of order or with invalid dates
**Why it happens:** Date parsing expects ISO format 'YYYY-MM-DD' or 'YYYY-MM-DDTHH:mm:ss'
**How to avoid:** Use consistent ISO date format in frontmatter
**Warning signs:** "Invalid Date" in post listings

### Pitfall 5: Missing Categories Update
**What goes wrong:** Category filters show no posts or wrong categories
**Why it happens:** BlogFilters.tsx has hard-coded category list
**How to avoid:** Either use existing categories (product, company, developers, engineering) or update the list
**Warning signs:** Empty category pages, categories not appearing in filter dropdown

## Code Examples

### Minimal Blog Post Template
```mdx
---
title: 'Post Title Here'
description: 'A brief description for SEO and social sharing'
author: axite_team
image: axite/placeholder-og.png
thumb: axite/placeholder-thumb.png
categories:
  - product
tags:
  - governance
date: '2026-01-15'
toc_depth: 3
---

Introduction paragraph goes here.

## First Heading

Content with **bold** and *italic* text.

### Code Example

\`\`\`typescript
const policy = {
  name: 'example-policy',
  rules: ['allow-read', 'deny-write']
};
\`\`\`

## Second Heading

<Admonition type="note">
  Important information in a callout box.
</Admonition>

More content here.
```

### Post with Video Embed
```mdx
<div className="video-container">
  <iframe
    className="w-full"
    src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
    title="Video Title"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  />
</div>
```

### Post with Image
```mdx
<Img alt="Description" src="/images/blog/axite/feature-screenshot.png" />
```

## Files Requiring Metadata Updates

### Must Update (Supabase References)
| File | Line | Current | Change To |
|------|------|---------|-----------|
| `app/blog/page.tsx` | 9 | "Supabase Blog: the Postgres development platform" | "Axite Blog" |
| `app/blog/page.tsx` | 10 | "Get all your Supabase News on the Supabase blog." | "Latest news and updates from the Axite team." |
| `app/blog/page.tsx` | 12 | "title: 'Supabase Blog:..." | "title: 'Axite Blog'" |
| `app/blog/page.tsx` | 14 | "url: 'https://supabase.com/blog'" | "url: 'https://axite.ai/blog'" |
| `app/blog/page.tsx` | 15 | "images: [...supabase-og.png]" | Update OG image path |
| `app/blog/BlogClient.tsx` | 167 | "sr-only">Supabase blog" | "sr-only">Axite blog" |
| `app/blog/tags/[tag]/page.tsx` | 31 | "Latest news from the Supabase team." | "Latest news from the Axite team." |
| `app/blog/categories/[category]/page.tsx` | 31 | "Latest news from the Supabase team." | "Latest news from the Axite team." |

### Optional (Categories)
`components/Blog/BlogFilters.tsx` line 51-59 - Update if changing category names

### Authors JSON
`lib/authors.json` - Add Axite team author(s):
```json
{
  "author_id": "axite_team",
  "author": "Axite Team",
  "position": "",
  "author_url": "https://axite.ai",
  "author_image_url": "/images/avatars/axite-team.png"
}
```

## Post Topic Recommendations

For 10 placeholder posts covering Axite's three pillars (Policy, Identity/RBAC, Audit):

| # | Title Concept | Category | Pillar |
|---|---------------|----------|--------|
| 1 | Introducing Axite: Agent Governance Platform | product | Overview |
| 2 | Policy Enforcement for AI Agents | product | Policy |
| 3 | Getting Started with Axite Policies | developers | Policy |
| 4 | Identity and RBAC for Agent Systems | product | Identity |
| 5 | Building Secure Agent Workflows | engineering | Identity |
| 6 | Audit Trails: Complete Visibility | product | Audit |
| 7 | Compliance and Agent Governance | company | Audit |
| 8 | Real-time Policy Decisions | engineering | Policy |
| 9 | Integrating Axite with Your Stack | developers | Overview |
| 10 | The Future of Agent Security | company | Overview |

## Image Strategy

Options for blog images:
1. **Simple solid color placeholders** - Quick to create, clearly placeholder
2. **Reuse existing generic images** - Some `/images/blog/` assets are generic enough
3. **Omit images initially** - Posts can work without `image`/`thumb` fields (shows default)

Recommendation: Create a simple `/images/blog/axite/` folder with 2-3 placeholder images that can be reused across posts. A solid color with "Axite" text is sufficient for placeholders.

## Open Questions

1. **OG Images for Blog**
   - What we know: Current OG image is `/images/og/supabase-og.png`
   - What's unclear: Whether a new Axite-branded OG image exists
   - Recommendation: Check if Axite OG image was created in earlier phases; if not, use placeholder

2. **Category Names**
   - What we know: Can reuse existing categories (product, developers, engineering, company)
   - What's unclear: Whether to rename any (e.g., "launch-week" to "updates")
   - Recommendation: Keep existing categories for now; less code change

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection of:
  - `apps/www/lib/posts.tsx` - Post processing logic
  - `apps/www/lib/mdx/mdxSerialize.ts` - MDX serialization
  - `apps/www/lib/mdx/mdxComponents.tsx` - Available MDX components
  - `apps/www/app/blog/page.tsx` - Blog index page
  - `apps/www/app/blog/[slug]/page.tsx` - Blog post page
  - `apps/www/lib/authors.json` - Author definitions
  - `apps/www/components/Blog/BlogFilters.tsx` - Category list
  - Sample blog posts in `apps/www/_blog/`

### Secondary (MEDIUM confidence)
- Phase 11 CONTEXT.md - User decisions on content replacement

## Metadata

**Confidence breakdown:**
- Blog file structure: HIGH - Direct codebase inspection
- MDX features: HIGH - Verified in mdxComponents.tsx
- Metadata locations: HIGH - Found via grep search
- Post topics: MEDIUM - Based on CONTEXT.md guidance + domain understanding

**Research date:** 2026-01-23
**Valid until:** 60 days (stable content, no library changes expected)
