# Requirements: Axite Marketing Website

**Defined:** 2026-01-23
**Core Value:** Get a professional, working marketing website deployed to axite.ai using battle-tested code instead of AI-generated slop.

## v1.1 Requirements

Requirements for Axite rebrand milestone. Visual + content rebrand (not blog content) + deployment.

### Visual Identity

- [ ] **VIS-01**: Color palette swapped to Axite colors (Primary Navy #3B63F3, Accent Teal #00B3A4)
- [ ] **VIS-02**: Typography scheme updated to match Axite brand voice (calm, precise, authoritative)
- [ ] **VIS-03**: Tailwind theme configuration reflects new color/typography tokens
- [ ] **VIS-04**: All UI components render with new color scheme (buttons, links, cards, etc.)

### Homepage

- [ ] **HOME-01**: Hero section displays Axite value prop (Agent Governance Platform messaging)
- [ ] **HOME-02**: Product feature sections adapted for Axite (policy, identity, audit pillars)
- [ ] **HOME-03**: Social proof section present (placeholder testimonials or trust signals)
- [ ] **HOME-04**: CTAs updated (e.g., "Try the sandbox", "Book a demo")
- [ ] **HOME-05**: Footer updated with Axite links and branding

### Enterprise Page

- [ ] **ENT-01**: Enterprise page adapted for Axite security/compliance messaging
- [ ] **ENT-02**: Security certifications section present (SOC2 status, compliance)
- [ ] **ENT-03**: Deployment options described (on-prem, cloud, hybrid if applicable)
- [ ] **ENT-04**: Enterprise CTA (contact sales / book security review)

### Product Page

- [ ] **PROD-01**: Product overview page describes Axite control plane
- [ ] **PROD-02**: Key features section covers: Policy enforcement, Identity/RBAC, Audit trails
- [ ] **PROD-03**: How it works section (agent → Axite → tools flow)
- [ ] **PROD-04**: Integration/compatibility section (MCP servers, tools)

### Pricing Page

- [ ] **PRICE-01**: Pricing page displays Axite tiers (or "Contact us" for enterprise)
- [ ] **PRICE-02**: Feature comparison table present
- [ ] **PRICE-03**: FAQ section addresses common questions
- [ ] **PRICE-04**: CTA to start trial or contact sales

### Trust Center / Security Page

- [ ] **TRUST-01**: Trust/Security page exists with compliance status
- [ ] **TRUST-02**: Data handling practices described
- [ ] **TRUST-03**: SLA information present (or placeholder)
- [ ] **TRUST-04**: Link to status page (or placeholder)

### Navigation

- [ ] **NAV-01**: Header navigation updated with Axite page structure (Product, Pricing, Enterprise, Blog, Trust)
- [ ] **NAV-02**: Supabase-specific nav items removed (Auth, Database, Storage, etc.)
- [ ] **NAV-03**: Footer navigation reflects Axite site structure
- [ ] **NAV-04**: Mobile navigation works with updated structure

### Cleanup

- [ ] **CLEAN-01**: Supabase product pages removed or hidden (Auth, Database, Storage, Realtime, Edge Functions, Vector, Cron, Queues)
- [ ] **CLEAN-02**: Comparison/switch-from pages removed
- [ ] **CLEAN-03**: Framework-specific pages removed (nextjs, etc.)
- [ ] **CLEAN-04**: Launch Week content removed
- [ ] **CLEAN-05**: All "Supabase" text references replaced with "Axite" (except blog content)

### Blog

- [ ] **BLOG-01**: Blog index page functional with existing posts
- [ ] **BLOG-02**: Blog navigation/header shows Axite branding (colors/typography)
- [ ] **BLOG-03**: Individual blog posts render correctly
- [ ] **BLOG-04**: Blog content remains unchanged (Supabase posts kept for now)

### Deployment

- [ ] **DEPLOY-01**: Site deployed to Vercel
- [ ] **DEPLOY-02**: axite.ai domain configured and working
- [ ] **DEPLOY-03**: Production build passes without errors
- [ ] **DEPLOY-04**: Environment variables configured for production
- [ ] **DEPLOY-05**: HTTPS working on custom domain

## Future Requirements

Deferred to future milestones. Tracked but not in v1.1 roadmap.

### Logo & Imagery

- **LOGO-01**: Axite logo in header, footer, favicon
- **LOGO-02**: OG images updated with Axite branding
- **IMG-01**: Product screenshots replaced with Axite UI
- **IMG-02**: Illustrations/graphics updated to Axite style

### Blog Content

- **BLOG-05**: New Axite blog posts
- **BLOG-06**: Supabase posts removed or archived
- **BLOG-07**: SEO optimization for Axite content

### Additional Pages

- **PAGE-01**: Documentation (hosted or linked)
- **PAGE-02**: Case studies / customer stories
- **PAGE-03**: About page / team
- **PAGE-04**: Careers page

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Logo replacement | User providing assets separately; keep Supabase logo for now |
| Imagery replacement | Keep Supabase imagery for reference; replace in future milestone |
| Blog content rewrite | SEO considerations; separate milestone |
| Documentation site | Out of scope for marketing site |
| Interactive demos | Future feature |
| Analytics integration | Can add post-launch |
| A/B testing | Premature optimization |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| VIS-01 | TBD | Pending |
| VIS-02 | TBD | Pending |
| VIS-03 | TBD | Pending |
| VIS-04 | TBD | Pending |
| HOME-01 | TBD | Pending |
| HOME-02 | TBD | Pending |
| HOME-03 | TBD | Pending |
| HOME-04 | TBD | Pending |
| HOME-05 | TBD | Pending |
| ENT-01 | TBD | Pending |
| ENT-02 | TBD | Pending |
| ENT-03 | TBD | Pending |
| ENT-04 | TBD | Pending |
| PROD-01 | TBD | Pending |
| PROD-02 | TBD | Pending |
| PROD-03 | TBD | Pending |
| PROD-04 | TBD | Pending |
| PRICE-01 | TBD | Pending |
| PRICE-02 | TBD | Pending |
| PRICE-03 | TBD | Pending |
| PRICE-04 | TBD | Pending |
| TRUST-01 | TBD | Pending |
| TRUST-02 | TBD | Pending |
| TRUST-03 | TBD | Pending |
| TRUST-04 | TBD | Pending |
| NAV-01 | TBD | Pending |
| NAV-02 | TBD | Pending |
| NAV-03 | TBD | Pending |
| NAV-04 | TBD | Pending |
| CLEAN-01 | TBD | Pending |
| CLEAN-02 | TBD | Pending |
| CLEAN-03 | TBD | Pending |
| CLEAN-04 | TBD | Pending |
| CLEAN-05 | TBD | Pending |
| BLOG-01 | TBD | Pending |
| BLOG-02 | TBD | Pending |
| BLOG-03 | TBD | Pending |
| BLOG-04 | TBD | Pending |
| DEPLOY-01 | TBD | Pending |
| DEPLOY-02 | TBD | Pending |
| DEPLOY-03 | TBD | Pending |
| DEPLOY-04 | TBD | Pending |
| DEPLOY-05 | TBD | Pending |

**Coverage:**
- v1.1 requirements: 41 total
- Mapped to phases: 0
- Unmapped: 41 (will be mapped during roadmap creation)

---
*Requirements defined: 2026-01-23*
*Last updated: 2026-01-23 after initial definition*
