# Requirements

## v1 Requirements

### Extraction

- [ ] **EXTRACT-01**: Clone Supabase repo and extract /apps/www code
- [ ] **EXTRACT-02**: Resolve workspace:* and catalog: dependency protocols to explicit versions
- [ ] **EXTRACT-03**: Inline required packages (ui, config, shared-data, icons, tsconfig)
- [ ] **EXTRACT-04**: Get local development server running (pnpm dev works)

### Infrastructure

- [ ] **INFRA-01**: Configure standalone Next.js 15.5.9 project (next.config.mjs, tsconfig.json)
- [ ] **INFRA-02**: Set up Tailwind 3.4.x with inlined config (not v4)
- [ ] **INFRA-03**: Fix all TypeScript path aliases (@ui/*, @common/*, etc.)
- [ ] **INFRA-04**: Production build succeeds (pnpm build works)

### Content

- [ ] **CONTENT-01**: Blog/MDX infrastructure working (may require Contentlayer migration)
- [ ] **CONTENT-02**: Basic page layouts functional (homepage, about, pricing, etc.)
- [ ] **CONTENT-03**: Navigation and footer working

### Branding

- [ ] **BRAND-01**: Swap logo and apply minimal Axite branding (colors optional)

---

## v2 (Deferred)

- Deploy to axite.ai domain
- Remove LaunchWeek system entirely
- Remove Supabase analytics/tracking (PostHog, etc.)
- Audit and remove unused ui-patterns components
- Strip Supabase-specific integrations from common package

---

## Out of Scope

- **Full content replacement** — future milestone after site is running
- **Theme/color customization** — future milestone
- **New features** — not adding anything Supabase doesn't have
- **Upstream compatibility** — flattening means no easy upstream pulls

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| EXTRACT-01 | — | Pending |
| EXTRACT-02 | — | Pending |
| EXTRACT-03 | — | Pending |
| EXTRACT-04 | — | Pending |
| INFRA-01 | — | Pending |
| INFRA-02 | — | Pending |
| INFRA-03 | — | Pending |
| INFRA-04 | — | Pending |
| CONTENT-01 | — | Pending |
| CONTENT-02 | — | Pending |
| CONTENT-03 | — | Pending |
| BRAND-01 | — | Pending |

---
*Last updated: 2026-01-22*
