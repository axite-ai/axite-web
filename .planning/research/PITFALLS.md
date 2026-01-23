# Domain Pitfalls: Monorepo Extraction

**Domain:** Extracting /apps/www from Supabase's Turborepo monorepo into a standalone Next.js app
**Researched:** 2026-01-22
**Confidence:** HIGH (verified against Supabase repo structure and official documentation)

---

## Critical Pitfalls

Mistakes that cause rewrites or major issues.

### Pitfall 1: workspace:* Protocol Not Understood by npm/yarn

**What goes wrong:** The Supabase monorepo uses pnpm's `workspace:*` protocol for internal dependencies. When you copy package.json to a standalone project, npm/yarn cannot resolve these references and installation fails with cryptic "package not found" errors.

**Why it happens:** pnpm's workspace protocol is converted to real versions only during `pnpm publish`. In extraction scenarios, you're copying raw package.json files that still contain `workspace:*` references.

**Supabase-specific impact:** The www app depends on 10 internal packages via workspace protocol:
- `ai-commands`, `common`, `config`, `eslint-config-supabase`, `icons`, `ui`, `ui-patterns`, `shared-data` (dependencies)
- `api-types`, `tsconfig` (devDependencies)

**Consequences:** Build completely fails. Cannot run `npm install`.

**Warning signs:**
- Error messages containing "Could not resolve dependency: workspace:*"
- npm ERR! 404 for internal package names
- Package.json contains `"package-name": "workspace:*"` entries

**Prevention:**
1. Identify all `workspace:*` dependencies before extraction
2. For each internal package, choose a strategy:
   - **Inline:** Copy source code directly into the standalone app
   - **Replace:** Find npm equivalent (unlikely for custom packages)
   - **Remove:** If functionality not needed
3. Update package.json to remove workspace protocol references

**Phase mapping:** Phase 1 (Initial Extraction) - Must resolve before any other work

---

### Pitfall 2: pnpm Catalog Dependencies Unresolved

**What goes wrong:** Supabase uses pnpm catalogs to centralize version management. Dependencies specified as `catalog:default` in package.json won't resolve outside the monorepo context.

**Why it happens:** pnpm catalogs define versions in `pnpm-workspace.yaml`, not in individual package.json files. The `catalog:` protocol is resolved at install time by pnpm.

**Supabase-specific impact:** Key dependencies use catalog versions:
- React 18.3.0, Next.js 15.5.9, TypeScript 5.9
- Tailwind CSS 3.4.1, Valtio 1.12.0, Zod 3.25.76
- All Supabase packages (2.87.0), Sentry (10.26.0)

**Consequences:** Installation fails or wrong versions installed.

**Warning signs:**
- Package.json contains `"package": "catalog:default"` or `"package": "catalog:"`
- Version mismatches after installation
- pnpm-workspace.yaml references in error messages

**Prevention:**
1. Extract version mappings from `pnpm-workspace.yaml` catalogs section
2. Replace all `catalog:*` references with actual semver versions
3. Consider pinning exact versions to match Supabase's tested configuration

**Phase mapping:** Phase 1 (Initial Extraction) - Must resolve alongside workspace protocol

---

### Pitfall 3: Internal Package Path Aliases Break at Runtime

**What goes wrong:** TypeScript path aliases like `@ui/*` that point to `../../packages/ui/src/*` work during development but fail at runtime because Node.js doesn't understand tsconfig paths.

**Why it happens:** TypeScript path aliases are compile-time conveniences. In a monorepo, bundlers are configured to resolve these. When extracted, the paths point to non-existent locations.

**Supabase-specific impact:** The www app uses:
- `@ui/*` -> `./../../packages/ui/src/*`
- `@/*` -> `./*`
- `~/*` -> `./*` (deprecated)
- `contentlayer/generated` -> `./.contentlayer/generated`

**Consequences:** Build errors like "Cannot find module '@ui/components/Button'" or runtime crashes.

**Warning signs:**
- Build errors referencing paths starting with `@ui/` or similar
- "Module not found" errors for internal packages
- tsconfig.json contains paths pointing outside the project directory

**Prevention:**
1. Identify all path aliases in tsconfig.json
2. For aliases pointing outside the project:
   - Inline the source code
   - Update imports to use relative paths
3. Keep aliases that point within the project (`@/*` -> `./*`)
4. Update all import statements to reflect new structure

**Phase mapping:** Phase 2 (Package Inlining) - After source code is copied

---

### Pitfall 4: Missing transpilePackages Configuration

**What goes wrong:** Next.js doesn't transpile internal monorepo packages by default. After inlining, if packages aren't properly configured, you get "Unexpected token 'export'" or JSX syntax errors.

**Why it happens:** Next.js's `transpilePackages` tells the bundler which node_modules need transpilation. In a monorepo, internal packages are listed here. After extraction, this config may reference non-existent packages or miss newly inlined code.

**Supabase-specific impact:** next.config.mjs specifies these transpilePackages:
- `ui`, `ui-patterns`, `common`, `shared-data`, `icons`, `api-types`
- `@octokit/plugin-paginate-graphql`

**Consequences:** Build fails with syntax errors in browser code.

**Warning signs:**
- "Unexpected token 'export'" in browser console
- "Cannot use import statement outside a module"
- Build errors in node_modules or inlined package directories

**Prevention:**
1. After inlining packages, verify if `transpilePackages` is still needed
2. If code is now inside `src/`, transpilePackages may not be required
3. If keeping separate directories, update transpilePackages list
4. Test both dev and production builds

**Phase mapping:** Phase 3 (Build Configuration) - After code structure is finalized

---

### Pitfall 5: Contentlayer Incompatibility with Modern Next.js

**What goes wrong:** Contentlayer is effectively unmaintained and has peer dependency conflicts with Next.js 14.2+. The www app uses Contentlayer for blog content.

**Why it happens:** Contentlayer's maintainer stopped development after Stackbit (sponsor) was acquired by Netlify. The package has peer dependency `next@"^12 || ^13"`.

**Supabase-specific impact:**
- `.contentlayer/generated` is a critical path alias
- Blog functionality depends on Contentlayer
- Build outputs include `.contentlayer/**`

**Consequences:** Build fails with peer dependency errors, or content generation silently breaks.

**Warning signs:**
- npm WARN peer dependency issues with next-contentlayer
- Missing `.contentlayer/generated` directory
- Blog pages return 404 or show no content

**Prevention:**
1. **Option A:** Migrate to `contentlayer2` (maintained fork, drop-in replacement)
2. **Option B:** Migrate to `content-collections` (requires code changes):
   - Change imports from `contentlayer/generated` to `content-collections`
   - Update MDX component usage
   - Replace `withContentlayer` with `withContentCollections` in next.config
3. **Option C:** Remove blog functionality if not needed

**Phase mapping:** Phase 2 or 3 - Evaluate during package inlining, implement during build configuration

---

## Moderate Pitfalls

Mistakes that cause delays or technical debt.

### Pitfall 6: Environment Variable Configuration Mismatch

**What goes wrong:** The Supabase www app requires 60+ environment variables configured in turbo.json. Missing variables cause runtime errors or broken features.

**Why it happens:** Turborepo's turbo.json defines environment variables for build caching. These represent actual runtime dependencies that aren't obvious from code inspection.

**Supabase-specific impact:** Critical env vars include:
- Supabase credentials, hCaptcha keys, Sentry DSN
- Google Tag Manager, Usercentrics (consent)
- GitHub app credentials, HubSpot, OpenAI API keys
- CDN/Vercel deployment metadata

**Warning signs:**
- Features silently broken (analytics, forms, auth)
- Console errors about undefined `process.env.NEXT_PUBLIC_*`
- Build warnings about missing environment variables

**Prevention:**
1. Extract env var list from turbo.json `www#build` section
2. Categorize: required vs optional, public vs secret
3. Create `.env.example` with all variables documented
4. Add runtime checks for critical variables
5. Remove env vars for features you're not using

**Phase mapping:** Phase 3 (Build Configuration)

---

### Pitfall 7: CDN Asset Prefix Configuration

**What goes wrong:** Supabase uses a custom CDN prefix (`frontend-assets.supabase.com`) with commit SHA for cache busting. This configuration causes 404s for static assets when not properly adjusted.

**Why it happens:** The monorepo's next.config.mjs conditionally sets `assetPrefix` for production deployments. The logic references Vercel-specific environment variables.

**Supabase-specific impact:**
- `assetPrefix: https://frontend-assets.supabase.com/www/${COMMIT_SHA}`
- Logic disabled on preview environments
- Requires CDN infrastructure setup

**Warning signs:**
- 404 errors for `/_next/static/*` files in production
- Broken images and CSS in deployed app
- Console errors about CORS on asset URLs

**Prevention:**
1. Remove or simplify assetPrefix configuration
2. If using Vercel, Next.js handles asset serving automatically
3. If self-hosting, configure your own CDN or remove assetPrefix entirely
4. Test production build locally with `next start`

**Phase mapping:** Phase 3 (Build Configuration)

---

### Pitfall 8: Tailwind Content Paths Miss Inlined Components

**What goes wrong:** After inlining UI packages, Tailwind's content scanning doesn't find the new component locations, resulting in missing CSS classes.

**Why it happens:** Tailwind's content array in a monorepo typically points to relative paths like `../../packages/ui/**/*.tsx`. After extraction, these paths are invalid.

**Supabase-specific impact:**
- UI package uses Tailwind CSS 3.4.1
- Custom Tailwind config likely extends shared presets
- Component styles spread across multiple inlined packages

**Warning signs:**
- Unstyled components in development
- Classes like `bg-primary` or custom utilities not working
- Tailwind IntelliSense not recognizing classes

**Prevention:**
1. Consolidate Tailwind config into single file
2. Update content paths to match new directory structure:
   ```js
   content: [
     './app/**/*.{js,ts,jsx,tsx}',
     './components/**/*.{js,ts,jsx,tsx}',
     './lib/**/*.{js,ts,jsx,tsx}',
   ]
   ```
3. If using Tailwind v4, use `@source` directive for explicit paths
4. Verify all custom theme extensions are preserved

**Phase mapping:** Phase 3 (Build Configuration)

---

### Pitfall 9: React Version Duplication

**What goes wrong:** Multiple copies of React get bundled, causing "Invalid hook call" errors and other cryptic React bugs.

**Why it happens:** In monorepos, React is often a peer dependency of shared packages. During extraction, if React versions aren't carefully managed, npm/yarn may install multiple versions.

**Supabase-specific impact:**
- ui package has React as peer dependency
- common package has React peer dependency
- Multiple packages may have different React version ranges

**Warning signs:**
- "Invalid hook call" errors
- "Cannot read property 'useState' of null"
- Multiple React versions in node_modules (`npm ls react` shows duplicates)

**Prevention:**
1. Ensure single React version in package.json
2. After inlining packages, remove peer dependency declarations
3. Use npm/yarn resolutions to force single version if needed
4. Verify with `npm ls react` after installation

**Phase mapping:** Phase 1 (Initial Extraction) and Phase 4 (Validation)

---

### Pitfall 10: outputFileTracingRoot Misconfiguration

**What goes wrong:** Next.js standalone builds don't include files from inlined packages, causing "module not found" errors in production.

**Why it happens:** Next.js file tracing uses the project directory as root by default. In monorepos, `outputFileTracingRoot` is set higher to include workspace packages. After extraction, this setting may be incorrect.

**Supabase-specific impact:**
- Current config likely has outputFileTracingRoot pointing to monorepo root
- File tracing excludes cache, static, and public directories
- 250MB Vercel serverless limit requires careful tracing

**Warning signs:**
- Production builds missing files that work in development
- Vercel deployment crashes with module errors
- Significantly different behavior between dev and production

**Prevention:**
1. Remove or update `outputFileTracingRoot` to project root
2. After extraction, this config may not be needed
3. Test standalone build: `next build && node .next/standalone/server.js`
4. Verify all required files are in `.next/standalone/`

**Phase mapping:** Phase 3 (Build Configuration)

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable.

### Pitfall 11: ESLint Configuration Dependencies

**What goes wrong:** ESLint fails to run because it references `eslint-config-supabase` package that no longer exists.

**Why it happens:** The www app extends a shared ESLint config from the monorepo's packages directory.

**Prevention:**
1. Inline the ESLint configuration or create standalone config
2. Remove reference to `eslint-config-supabase`
3. Install any missing ESLint plugins directly

**Phase mapping:** Phase 2 (Package Inlining)

---

### Pitfall 12: TypeScript Config Extends Chain Broken

**What goes wrong:** tsconfig.json may extend a base config from `packages/tsconfig` that no longer exists.

**Why it happens:** Monorepos often use shared TypeScript configurations.

**Supabase-specific impact:** May extend shared strict mode settings, path aliases, or compiler options.

**Prevention:**
1. Check if tsconfig.json has `"extends"` pointing outside project
2. Inline the base configuration
3. Verify all compiler options are preserved

**Phase mapping:** Phase 2 (Package Inlining)

---

### Pitfall 13: pnpm-only Preinstall Scripts

**What goes wrong:** Packages contain `preinstall` scripts that enforce pnpm usage, breaking npm/yarn installations.

**Why it happens:** Internal packages use `"preinstall": "npx only-allow pnpm"` to enforce package manager consistency.

**Supabase-specific impact:** Both `ui` and `common` packages enforce pnpm.

**Warning signs:**
- Installation fails with "Use pnpm" or similar error
- Scripts block npm install

**Prevention:**
1. Remove `preinstall` scripts from inlined package.json files
2. If keeping separate directories, remove enforcement scripts
3. Choose your preferred package manager and update all configs

**Phase mapping:** Phase 1 (Initial Extraction)

---

## Phase-Specific Warnings

| Phase | Likely Pitfall | Mitigation |
|-------|---------------|------------|
| Phase 1: Initial Extraction | workspace:* and catalog: protocols | Map all internal deps before copying any code |
| Phase 1: Initial Extraction | pnpm preinstall enforcement | Remove enforcement scripts immediately |
| Phase 2: Package Inlining | Path aliases pointing outside project | Update tsconfig and all imports together |
| Phase 2: Package Inlining | ESLint/TypeScript base configs | Inline configs before removing packages |
| Phase 3: Build Configuration | transpilePackages pointing to missing packages | Audit next.config.mjs after structure changes |
| Phase 3: Build Configuration | Environment variables missing | Extract full list from turbo.json before removing |
| Phase 3: Build Configuration | Tailwind content paths | Update paths after finalizing directory structure |
| Phase 3: Build Configuration | CDN/asset prefix | Simplify or remove for standalone deployment |
| Phase 4: Validation | React duplication | Run `npm ls react` and fix before testing |
| Phase 4: Validation | Contentlayer compatibility | Test blog functionality explicitly |

---

## Pre-Flight Checklist

Before starting extraction, verify you have:

- [ ] List of all `workspace:*` dependencies from package.json
- [ ] Version mappings from `pnpm-workspace.yaml` catalogs
- [ ] All path aliases from tsconfig.json documented
- [ ] Environment variable list from turbo.json
- [ ] Decision on Contentlayer migration strategy
- [ ] Understanding of CDN/asset configuration requirements
- [ ] Chosen target package manager (npm/yarn/pnpm)

---

## Sources

### Official Documentation
- [Next.js transpilePackages](https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages)
- [Next.js output configuration](https://nextjs.org/docs/pages/api-reference/config/next-config-js/output)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [pnpm Catalogs](https://pnpm.io/catalogs)
- [Tailwind Content Configuration](https://v3.tailwindcss.com/docs/content-configuration)

### GitHub Issues & Discussions
- [Next.js Standalone build for monorepos](https://github.com/vercel/next.js/discussions/35437)
- [Turbopack transpilePackages issue](https://github.com/vercel/next.js/issues/85316)
- [TypeScript paths in Turborepo](https://github.com/vercel/turborepo/discussions/620)
- [Tailwind v4 monorepo content detection](https://github.com/tailwindlabs/tailwindcss/issues/13136)
- [Contentlayer Next.js 14 support](https://github.com/contentlayerdev/contentlayer/issues/575)

### Community Resources
- [isolate-package for monorepo extraction](https://github.com/0x80/isolate-package)
- [Contentlayer to Content-Collections migration](https://www.yashagarwal.in/notes/contentlayer-to-content-collections)
- [Managing TypeScript packages in monorepos - Nx Blog](https://nx.dev/blog/managing-ts-packages-in-monorepos)

### Supabase Repository Analysis
- Raw package.json: `github.com/supabase/supabase/master/apps/www/package.json`
- Raw tsconfig.json: `github.com/supabase/supabase/master/apps/www/tsconfig.json`
- Raw next.config.mjs: `github.com/supabase/supabase/master/apps/www/next.config.mjs`
- Raw pnpm-workspace.yaml: `github.com/supabase/supabase/master/pnpm-workspace.yaml`
