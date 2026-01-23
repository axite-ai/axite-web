# Feature Landscape: Supabase www Site Analysis

**Domain:** Marketing website for developer platform
**Researched:** 2026-01-22
**Confidence:** HIGH (direct GitHub repository analysis + live site inspection)

## Executive Summary

Supabase's marketing site (apps/www) is a comprehensive Next.js-based marketing platform with 387+ blog posts, 35 customer case studies, 14 solution pages, and extensive product showcases. The site demonstrates mature patterns for developer-focused B2B marketing including interactive demos, comparison pages, and event management.

For Axite, approximately 60% of the infrastructure is highly reusable (layout, components, content systems), 25% requires modification (product pages, messaging), and 15% is Supabase-specific and should be removed.

---

## Core Marketing Pages

### Keep (Generic/Reusable)

| Page | Current Purpose | Axite Adaptation | Complexity |
|------|-----------------|------------------|------------|
| Homepage (`index.tsx`) | Hero, product showcase, social proof | Rewrite messaging for MCP/agent-native | Medium |
| Pricing (`pricing.tsx`) | Tier comparison, calculator | Adapt for Axite service packages | Medium |
| Careers (`careers.tsx`) | Job listings, culture | Keep structure, update content | Low |
| Contact/Sales forms | Demo request, partnership inquiry | Keep forms, update fields | Low |
| Support (`support.tsx`) | Support tiers, resources | Adapt support model | Low |
| Company (`company.tsx`) | About, team, investors | Update content | Low |
| Brand Assets (`brand-assets.tsx`) | Logo downloads, guidelines | Create Axite brand assets | Low |

### Modify (Adapt to Axite)

| Page | Current Purpose | Axite Adaptation | Complexity |
|------|-----------------|------------------|------------|
| Features (`features.tsx`) | 62 Supabase features | Replace with Axite capabilities | High |
| Enterprise (`enterprise.tsx`) | Enterprise sales page | Adapt messaging for enterprise MCP | Medium |
| Open Source (`open-source.tsx`) | OSS community page | Repurpose for MCP ecosystem | Medium |
| Partners (`partners.tsx`) | Integration marketplace | Adapt for Axite integration partners | Medium |

### Remove (Supabase-Specific)

| Page | Reason for Removal |
|------|-------------------|
| Auth (`auth.tsx`) | Supabase Auth product |
| Database (`database.tsx`) | Supabase Database product |
| Storage (`storage.tsx`) | Supabase Storage product |
| Realtime (`realtime.tsx`) | Supabase Realtime product |
| Edge Functions (`edge-functions.tsx`) | Supabase Functions product |
| Vector modules (`modules/vector.tsx`) | Supabase Vector product |
| Cron/Queues modules | Supabase-specific features |
| LaunchWeek pages (all versions) | Supabase marketing event |
| GA Week, Beta pages | Supabase product launches |
| AWS re:Invent page | Supabase event partnership |
| `nextjs.tsx` | Framework-specific landing |

---

## Content Systems

### Blog System

| Feature | Description | Keep/Modify |
|---------|-------------|-------------|
| MDX blog posts | 387+ posts in `_blog/` with date-prefix naming | **Keep** - Excellent pattern |
| Category filtering | Filter by topic tags | **Keep** |
| Author system | `Authors.json` with profiles | **Keep** |
| Chronological feed | Recent posts, pagination | **Keep** |
| RSS/Atom feeds | Subscription capability | **Keep** |

**Axite Notes:** Blog infrastructure is highly reusable. Replace Supabase content with Axite thought leadership on MCP, agent workflows, API-first strategies.

### Customer Case Studies

| Feature | Description | Keep/Modify |
|---------|-------------|-------------|
| MDX case studies | 35 case studies in `_customers/` | **Keep structure** |
| Customer logos | Social proof carousel | **Keep** |
| Testimonial quotes | Quote components | **Keep** |
| Industry filtering | By sector/use case | **Keep** |

**Axite Notes:** Excellent pattern for showcasing MCP implementation success stories. Content needs complete replacement.

### Documentation Integration

| Feature | Description | Keep/Modify |
|---------|-------------|-------------|
| Docs link in nav | Points to docs.supabase.com | **Modify** - Point to Axite docs |
| Code examples | Embedded snippets | **Keep pattern** |
| Quickstart guides | Framework-specific | **Replace** with MCP quickstarts |

---

## Interactive Components

### Keep (High Value)

| Component | Purpose | Complexity |
|-----------|---------|------------|
| Command Menu (`CommandMenu/`) | Site-wide search/navigation | Low |
| Code blocks with syntax highlighting | Technical content display | Low |
| Sandpack code playground | Interactive code demos | Medium |
| Image carousels | Visual content rotation | Low |
| Split code block carousel | Code example showcase | Low |
| Timed accordion sections | Progressive disclosure | Low |
| Twitter social proof | Testimonial embedding | Low |

### Modify (Adapt Demos)

| Component | Current Purpose | Axite Adaptation |
|-----------|-----------------|------------------|
| AI Demo (`AIDemo/`) | SQL/AI assistant showcase | Replace with MCP tool demo |
| Realtime showcase | WebSocket demos | Replace with agent workflow demo |
| Product visuals (Auth, DB, etc.) | Product animations | Create MCP/agent visuals |

### Remove (Supabase-Specific)

| Component | Reason |
|-----------|--------|
| Database visual | Product-specific |
| Auth visual | Product-specific |
| Storage visual | Product-specific |
| Vector/AI visual | Product-specific |
| Functions visual | Product-specific |
| Realtime visual | Product-specific |
| Compute pricing calculator | Supabase infrastructure |

---

## Navigation & Layout

### Header Navigation

**Current Structure:**
- Product (dropdown with all Supabase products)
- Developers (docs, tutorials, community)
- Solutions (by audience, use case, migration)
- Pricing
- Docs (external link)
- Blog

**Axite Adaptation:**
- Product/Services (MCP services, agent apps)
- Solutions (by industry, use case)
- Resources (blog, case studies, docs)
- Pricing
- Contact

**Complexity:** Medium - Navigation components are well-structured (`Nav/` directory with dropdowns, mobile menu)

### Footer

**Current Sections:**
- Product links
- Solutions links
- Resources (docs, blog, changelog)
- Developers (GitHub, Discord)
- Company (about, careers, legal)
- Security badges (SOC2, HIPAA)

**Axite Adaptation:** Keep structure, update links and badges

**Complexity:** Low

---

## Solution Pages

### By Audience (14 pages)

| Solution | Axite Relevance | Action |
|----------|-----------------|--------|
| Enterprise | HIGH - Similar target | **Adapt** messaging |
| Startups | HIGH - Similar target | **Adapt** messaging |
| Agencies | MEDIUM - Potential market | **Consider keeping** |
| AI Builders | HIGH - Core audience | **Heavily adapt** |
| Developers | HIGH - Core audience | **Adapt** messaging |
| Innovation Teams | MEDIUM | **Consider keeping** |
| Beginners | LOW - Not core audience | **Remove** |
| No-Code | LOW - Not target | **Remove** |
| Vibe Coders | LOW - Niche | **Remove** |
| Postgres Developers | LOW - Supabase-specific | **Remove** |
| Hackathon | LOW - Event-specific | **Remove** |

### Migration/Comparison Pages

| Page | Current Purpose | Action |
|------|-----------------|--------|
| Switch from Firebase | Competitive positioning | **Remove** |
| Switch from Convex | Competitive positioning | **Remove** |
| Switch from Neon | Competitive positioning | **Remove** |
| vs Firebase comparison | Alternative comparison | **Remove** |
| vs Auth0 comparison | Alternative comparison | **Remove** |
| vs Heroku Postgres | Alternative comparison | **Remove** |

**Axite Notes:** Comparison pages pattern is valuable for future "Why Axite" content, but Supabase-specific content needs removal.

---

## Pricing Components

### Keep (Excellent Patterns)

| Component | Purpose |
|-----------|---------|
| `PricingPlans.tsx` | Tier cards layout |
| `PricingComparisonTable.tsx` | Feature matrix |
| `PricingFAQs.tsx` | FAQ section |
| `PricingAddOnTable.tsx` | Add-on services |

### Remove (Supabase-Specific)

| Component | Reason |
|-----------|--------|
| `ComputePricingCalculator.tsx` | Infrastructure-specific |
| `ComputePricingTable.tsx` | Infrastructure-specific |
| `PricingDiskSection.tsx` | Storage pricing |
| `PricingComputeSection.tsx` | Compute pricing |

**Axite Notes:** Pricing UI patterns are reusable for service packages, but Supabase's usage-based infrastructure pricing model differs from Axite's project-based model.

---

## Forms & Contact

### Forms to Keep

| Form | Purpose | Modifications Needed |
|------|---------|---------------------|
| `RequestADemoForm.tsx` | Sales inquiries | Update fields, add Cal.com |
| `TalkToPartnershipTeamForm.tsx` | Partner inquiries | Update fields |

### Forms to Remove

| Form | Reason |
|------|--------|
| `ApplyToSupaSquadForm.tsx` | Supabase community program |

---

## Events System

### Infrastructure (Keep)

| Feature | Purpose |
|---------|---------|
| Event MDX files (`_events/`) | Event content storage |
| Dynamic event pages (`[slug].tsx`) | Event detail pages |
| `EventGridItem.tsx` | Grid display |
| `EventListItem.tsx` | List display |
| `EventsFilters.tsx` | Category filtering |

### Content (Remove)

- All 29 existing Supabase event files
- LaunchWeek components (entire directory)
- GA Week, Beta, AWS re:Invent pages

**Axite Notes:** Event infrastructure is useful for future webinars, workshops, or conference appearances. Remove all Supabase-specific event content.

---

## Legal & Compliance Pages

### Keep (Update Content)

| Page | Purpose |
|------|---------|
| `terms.mdx` | Terms of Service |
| `privacy.mdx` | Privacy Policy |
| `aup.mdx` | Acceptable Use Policy |
| `legal/dpa.tsx` | Data Processing Agreement |

### Consider Adding for Axite

| Page | Purpose |
|------|---------|
| Security overview | Trust/compliance page |
| SOC2/compliance badges | Enterprise trust signals |

### Remove

| Page | Reason |
|------|--------|
| `sla.mdx` | Supabase infrastructure SLA |
| `support-policy.mdx` | Supabase-specific support tiers |
| Privacy policy archives | Old versions |

---

## Data Files & Configuration

### Keep (Reusable Patterns)

| File/Directory | Purpose |
|----------------|---------|
| `data/nav.ts` | Navigation configuration |
| `data/Footer.ts` | Footer links |
| `data/Authors.json` | Blog author profiles |
| `data/PricingFAQ.json` | FAQ content |
| `data/frameworks/` | Framework quickstart data |

### Replace (Content-Specific)

| File/Directory | Current | Axite Replacement |
|----------------|---------|-------------------|
| `data/CaseStudies/` | Supabase customers | Axite case studies |
| `data/CustomerStories/` | Customer quotes | Axite testimonials |
| `data/Companies.ts` | Logo carousel | Axite customer logos |
| `data/products/` | Supabase products | Axite services |
| `data/solutions/` | Supabase solutions | Axite solutions |
| `data/MainProducts.ts` | Product definitions | Service definitions |

### Remove (Supabase-Specific)

| File/Directory | Reason |
|----------------|--------|
| `data/Comparisons.ts` | Competitor comparisons |
| `data/enterprise/` | Supabase enterprise data |
| `data/ga/` | GA launch data |
| `data/surveys/` | Supabase user surveys |
| `data/aws-reinvent-2025/` | Event-specific |

---

## Component Complexity Analysis

### High Complexity (Significant Work)

| Component | Why Complex | Recommendation |
|-----------|-------------|----------------|
| Product showcase components | Deep Supabase integration | Rebuild for Axite services |
| LaunchWeek system | Event-specific, many versions | Remove entirely |
| Pricing calculator | Usage-based model | Replace with simpler tiers |
| AI Demo | Supabase-specific | Rebuild as MCP demo |

### Medium Complexity (Moderate Adaptation)

| Component | Work Required |
|-----------|---------------|
| Hero section | Update copy, keep animations |
| Navigation dropdowns | Update links, structure |
| Solution pages | Update messaging, keep layout |
| Enterprise page | Update case studies, stats |

### Low Complexity (Minimal Changes)

| Component | Work Required |
|-----------|---------------|
| Footer | Update links |
| Blog system | Replace content |
| Forms | Update fields |
| Legal pages | Update content |
| Careers | Update content |

---

## Feature Dependencies

```
Homepage
├── Hero → Product visuals (need replacement)
├── Social proof → Customer logos (need replacement)
├── Product cards → Product definitions (need replacement)
└── Framework quickstarts → Remove (Supabase-specific)

Blog System (standalone)
├── MDX processing
├── Author system
└── Category filtering

Case Studies
├── Customer MDX files (replace)
├── Quote components (keep)
└── Logo carousel (replace data)

Pricing
├── Tier cards (keep)
├── Comparison table (keep)
├── Calculator (remove)
└── FAQ (replace content)

Navigation
├── Product dropdown (restructure)
├── Solutions dropdown (restructure)
├── Developers dropdown (adapt)
└── Mobile menu (keep)
```

---

## MVP Recommendation

### Phase 1: Foundation (Keep)
1. Layout system (header, footer, navigation shell)
2. Blog infrastructure
3. Basic page templates (about, contact, careers)
4. Form components
5. Legal page structure
6. Command menu

### Phase 2: Core Marketing (Adapt)
1. Homepage with new hero and messaging
2. Pricing page with service tiers
3. Enterprise page with new case studies
4. Solutions pages (3-4 key audiences)

### Phase 3: Content (Create)
1. Axite case studies
2. MCP-focused blog content
3. Interactive MCP demo
4. Partner ecosystem page

### Defer to Post-MVP
- Event system (unless launching events)
- Comparison/alternatives pages
- Community features (SupaSquad equivalent)
- Complex interactive demos

---

## Supabase-Specific Features Summary (Complete Removal List)

### Pages to Remove
- `auth.tsx`, `database.tsx`, `storage.tsx`, `realtime.tsx`, `edge-functions.tsx`
- `modules/vector.tsx`, `modules/cron.tsx`, `modules/queues.tsx`
- `nextjs.tsx`, `beta.tsx`, `ga.tsx`, `ga-week.tsx`
- `aws-reinvent-2025.tsx`, `assistant.tsx`
- `state-of-startups.tsx`, `changelog.tsx` (product changelog)
- All `solutions/switch-from-*` pages
- All `_alternatives/*` comparison pages
- `wrapped/*` (year-in-review feature)

### Components to Remove
- All product visual components (Auth, Database, Storage, Realtime, Vector, Functions)
- `LaunchWeek/` entire directory
- `Wrapped/` components
- Compute pricing calculator
- `Supasquad/` components
- `DashboardFeatures/` (Supabase Studio features)

### Data to Remove
- All customer case study content (keep structure)
- All blog content (keep structure)
- Product definitions
- Comparison data
- Survey data

---

## Sources

- GitHub repository: https://github.com/supabase/supabase/tree/master/apps/www
- Live site analysis: https://supabase.com
- Pricing page: https://supabase.com/pricing
- Enterprise page: https://supabase.com/enterprise
- Features page: https://supabase.com/features
- Partners page: https://supabase.com/partners
- Careers page: https://supabase.com/careers
- Blog: https://supabase.com/blog
- Open Source: https://supabase.com/open-source
- Support: https://supabase.com/support
