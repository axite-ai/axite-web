# Phase 1: Foundation & Extraction - Research

**Researched:** 2026-01-22
**Domain:** pnpm Monorepo Dependency Protocol Resolution
**Confidence:** HIGH

## Summary

Phase 1 focuses on resolving pnpm's special dependency protocols (`workspace:*` and `catalog:`) that prevent the Supabase www app from running outside its monorepo context. The Supabase monorepo uses these protocols extensively: 10 internal packages use `workspace:*` and 8+ dependencies use `catalog:` versioning. These protocols must be converted to standard npm-compatible formats before `pnpm install` can succeed.

The research confirms the user's decision to use `file:` protocol for workspace dependencies (preserving monorepo structure temporarily) and direct semver versions for catalog dependencies. A script-based approach is the standard method for bulk protocol conversion in extraction scenarios.

**Primary recommendation:** Write a Node.js/jq script to automate protocol replacement across all package.json files, extracting catalog versions from pnpm-workspace.yaml and converting workspace:* to file: paths.

## Standard Stack

### Core Tools
| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| pnpm | 9.x | Package manager | Supabase uses pnpm; maintains compatibility with file: protocol |
| Node.js | 22.x | Script runtime | LTS version, native JSON support, fs promises |
| jq | Latest | JSON manipulation (alternative) | Handles JSON safely, used in CI pipelines |

### Supporting
| Tool | Purpose | When to Use |
|------|---------|-------------|
| gh CLI | Clone/fetch from GitHub | Authenticated access to supabase/supabase repo |
| git | Version control | Checkpoint commits after each sub-step |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Node.js script | bash + sed | sed is fragile with JSON; Node.js is safer |
| Node.js script | jq | jq is more concise but requires jq installation |
| file: protocol | Inline packages now | file: preserves structure; inline deferred to Phase 2 |

**Installation:**
```bash
# Already available (pnpm, node, git are prerequisites)
# For jq alternative: brew install jq
```

## Architecture Patterns

### Recommended Project Structure (Post-Extraction)
```
axite-new/
├── apps/
│   └── www/           # Copied from supabase/supabase/apps/www
│       └── package.json  # workspace:* converted to file:
├── packages/          # Copied from supabase/supabase/packages (used packages only)
│   ├── ui/
│   ├── config/
│   ├── shared-data/
│   ├── icons/
│   ├── common/
│   ├── ui-patterns/
│   ├── ai-commands/
│   ├── api-types/
│   └── tsconfig/
├── pnpm-workspace.yaml  # Defines apps/* and packages/* as workspace
├── turbo.json          # Optional: keeps build orchestration (can remove later)
└── package.json        # Root package.json (can be minimal)
```

**Why this structure:** Preserves relative import paths between packages. The www app's tsconfig has `@ui/*` pointing to `../../packages/ui/src/*` - this structure keeps those paths valid. Flattening happens in Phase 2.

### Pattern 1: Protocol Conversion Script
**What:** Script that reads pnpm-workspace.yaml catalog, then transforms all package.json files
**When to use:** One-time extraction scenarios
**Example:**
```javascript
// Source: Common practice for monorepo extraction
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { parse } from 'yaml';

// 1. Load catalog versions from pnpm-workspace.yaml
const workspaceYaml = parse(readFileSync('pnpm-workspace.yaml', 'utf8'));
const catalogVersions = workspaceYaml.catalog || {};

// 2. Function to transform a single package.json
function transformPackageJson(filePath, catalogVersions) {
  const pkg = JSON.parse(readFileSync(filePath, 'utf8'));

  // Transform dependencies
  for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
    if (!pkg[depType]) continue;
    for (const [name, version] of Object.entries(pkg[depType])) {
      // Handle catalog: protocol
      if (version === 'catalog:' || version === 'catalog:default') {
        pkg[depType][name] = catalogVersions[name] || version;
      }
      // Handle workspace:* protocol - convert to file: relative path
      else if (version.startsWith('workspace:')) {
        const packageDir = `../packages/${name}`; // Adjust path as needed
        pkg[depType][name] = `file:${packageDir}`;
      }
    }
  }

  writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
}
```

### Pattern 2: Workspace Configuration for Extracted Structure
**What:** pnpm-workspace.yaml that defines the new workspace structure
**When to use:** After copying files, before running pnpm install
**Example:**
```yaml
# Source: pnpm.io/workspaces
packages:
  - 'apps/*'
  - 'packages/*'
```

### Anti-Patterns to Avoid
- **Manual find-replace in JSON:** Error-prone, may break JSON syntax or miss edge cases
- **Using npm/yarn to install before conversion:** Will fail immediately with protocol errors
- **Converting workspace:* to registry versions:** Internal packages aren't published; must use file: or inline
- **Skipping the workspace yaml:** Even with file: protocol, having a workspace helps with deduplication

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON transformation | String manipulation with sed/awk | Node.js JSON.parse/stringify or jq | JSON has edge cases (commas, escaping, formatting) |
| YAML parsing | Regex extraction | js-yaml or yq | YAML anchors, multiline strings, comments |
| Dependency graph analysis | Manual inspection | `pnpm why` or write a recursive scanner | Transitive dependencies are complex |
| Version range parsing | Custom regex | semver npm package | Semver spec has many edge cases |

**Key insight:** Protocol conversion is a data transformation problem. Using proper JSON/YAML parsers ensures correctness, while string manipulation invites subtle bugs that surface later.

## Common Pitfalls

### Pitfall 1: Missing Catalog Entries
**What goes wrong:** A package.json references `catalog:` for a dependency not defined in pnpm-workspace.yaml's catalog section.
**Why it happens:** Supabase may have multiple catalogs or named catalogs (e.g., `catalog:react18`). Only the default `catalog:` is documented.
**How to avoid:** Check for both `catalog:` (shorthand) and `catalog:default` patterns. Look for `catalogs:` (plural) section with named catalogs.
**Warning signs:** Script runs but `catalog:` values remain unchanged in output.

### Pitfall 2: Workspace Package Naming Mismatch
**What goes wrong:** Converting `"ui": "workspace:*"` to `"ui": "file:../packages/ui"` but the package's actual name in its package.json is `@supabase/ui`.
**Why it happens:** Internal packages often have scoped names different from their directory names.
**How to avoid:** Read each package's package.json to get its actual `name` field. Match by directory name for file: paths, not npm name.
**Warning signs:** `pnpm install` warns about missing peer dependencies or fails to link.

### Pitfall 3: Circular or Transitive Dependencies
**What goes wrong:** Converting www's direct dependencies works, but packages like `ui` also have `workspace:*` dependencies on `common` and `config`.
**Why it happens:** Monorepo packages depend on each other. Every package.json with workspace: references needs conversion.
**How to avoid:** Recursively process ALL package.json files in the extracted directories, not just the root www/package.json.
**Warning signs:** `pnpm install` fails on nested packages with "workspace:* could not be resolved" errors.

### Pitfall 4: pnpm-workspace.yaml Required
**What goes wrong:** After converting to file: protocol, `pnpm install` still fails or doesn't dedupe properly.
**Why it happens:** file: dependencies work best within a pnpm workspace. Without workspace yaml, pnpm may install duplicate node_modules.
**How to avoid:** Keep or create a pnpm-workspace.yaml that includes the extracted directories.
**Warning signs:** Massive node_modules, multiple React versions, "invalid hook call" errors later.

### Pitfall 5: Preinstall Script Enforcement
**What goes wrong:** `pnpm install` fails immediately with "Please use pnpm" error.
**Why it happens:** Supabase packages include `"preinstall": "npx only-allow pnpm"` script that rejects other package managers.
**How to avoid:** Remove or bypass preinstall scripts from all extracted package.json files.
**Warning signs:** Error message explicitly mentioning package manager enforcement.

## Code Examples

### Complete Catalog Extraction
```javascript
// Source: Based on pnpm.io/catalogs documentation
import { parse } from 'yaml';
import { readFileSync } from 'fs';

const workspaceContent = readFileSync('pnpm-workspace.yaml', 'utf8');
const workspace = parse(workspaceContent);

// Default catalog (accessed via catalog: or catalog:default)
const defaultCatalog = workspace.catalog || {};

// Named catalogs (accessed via catalog:name)
const namedCatalogs = workspace.catalogs || {};

// Build complete version map
const versionMap = { ...defaultCatalog };
for (const [catalogName, versions] of Object.entries(namedCatalogs)) {
  for (const [pkg, version] of Object.entries(versions)) {
    versionMap[`${catalogName}:${pkg}`] = version; // For catalog:name references
  }
}

console.log(versionMap);
// Output: { 'react': '^18.3.0', 'next': '^15.5.9', ... }
```

### Workspace to File Protocol Conversion
```javascript
// Source: Common extraction pattern based on pnpm.io/workspaces
function convertWorkspaceToFile(version, packageName, currentFilePath) {
  // workspace:* -> file:relative/path
  // workspace:^ -> file:relative/path (caret ignored for file:)
  // workspace:../path -> file:../path (already a path)

  if (version.startsWith('workspace:../') || version.startsWith('workspace:./')) {
    // Already a relative path, just replace protocol
    return version.replace('workspace:', 'file:');
  }

  // workspace:* or workspace:^ - resolve to packages directory
  // Assumes packages are in ../packages/ relative to apps/www
  const relativePath = `../packages/${packageName}`;
  return `file:${relativePath}`;
}
```

### Full Directory Scan
```javascript
// Source: Standard Node.js pattern
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function findAllPackageJsons(dir, results = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      findAllPackageJsons(fullPath, results);
    } else if (entry.name === 'package.json') {
      results.push(fullPath);
    }
  }
  return results;
}

// Usage
const allPackageJsons = findAllPackageJsons('./');
for (const pkgPath of allPackageJsons) {
  transformPackageJson(pkgPath, catalogVersions);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manually publish packages to private registry | Use file: protocol with workspace | 2020+ | Much simpler for one-time extraction |
| npm link for local packages | workspace: or file: in package.json | 2019+ | More reproducible, works in CI |
| Single monolithic package.json | Workspace-based monorepos | 2018+ | Better isolation but extraction is harder |

**Deprecated/outdated:**
- `link:` protocol: Replaced by `workspace:` in pnpm; `file:` is more portable
- Manual version string replacement: Scripts are standard practice now

## Open Questions

1. **Does Supabase use named catalogs?**
   - What we know: Default catalog is documented, contains 19 entries
   - What's unclear: Whether `catalogs:` (plural) section exists with named variants
   - Recommendation: Fetch and parse the actual pnpm-workspace.yaml, handle both patterns

2. **Are all 10 workspace packages actually needed?**
   - What we know: www lists 10 workspace dependencies
   - What's unclear: Some may be unused or only needed for specific features (ai-commands for AI chat)
   - Recommendation: Copy all initially; audit usage in Phase 2

3. **TypeScript compilation order**
   - What we know: Packages have dependency graph (ui depends on common, config)
   - What's unclear: Whether TypeScript project references are used
   - Recommendation: Test `tsc --noEmit` after conversion; may need build order

## Sources

### Primary (HIGH confidence)
- [pnpm.io/workspaces](https://pnpm.io/workspaces) - workspace: protocol documentation
- [pnpm.io/catalogs](https://pnpm.io/catalogs) - catalog: protocol documentation
- Context7 /pnpm/pnpm.io - Protocol resolution behavior
- [Supabase pnpm-workspace.yaml](https://github.com/supabase/supabase/blob/master/pnpm-workspace.yaml) - Actual catalog definitions
- [Supabase apps/www/package.json](https://github.com/supabase/supabase/blob/master/apps/www/package.json) - Actual dependency declarations

### Secondary (MEDIUM confidence)
- [ezablocki.com - Linking Local NPM Dependencies](https://ezablocki.com/posts/linking-npm-packages/) - file: vs link: comparison
- [pnpm GitHub Discussion #4840](https://github.com/orgs/pnpm/discussions/4840) - Referencing monorepo packages externally

### Tertiary (LOW confidence)
- WebSearch: "extract package from pnpm monorepo" - Community patterns, needs validation
- WebSearch: "monorepo extraction pitfalls" - Anecdotal issues

## Metadata

**Confidence breakdown:**
- Protocol conversion mechanics: HIGH - verified with official pnpm documentation
- Script patterns: MEDIUM - common practice but implementation details vary
- Supabase-specific edge cases: MEDIUM - based on package.json analysis, not runtime testing

**Research date:** 2026-01-22
**Valid until:** 60 days (protocol specs are stable)

---

## Appendix: Supabase Dependency Inventory

### Workspace Dependencies (from www/package.json)
| Package | Type | Internal Dependencies |
|---------|------|----------------------|
| ai-commands | dependencies | config, tsconfig |
| common | dependencies | api-types, config, tsconfig |
| config | dependencies | (none) |
| eslint-config-supabase | devDependencies | (none) |
| icons | dependencies | build-icons |
| ui | dependencies | common, config, tsconfig |
| ui-patterns | dependencies | common, icons, tsconfig, ui |
| shared-data | dependencies | tsconfig |
| api-types | devDependencies | (none) |
| tsconfig | devDependencies | (none) |

### Catalog Dependencies (from www/package.json)
| Package | Catalog Version (from pnpm-workspace.yaml) |
|---------|-------------------------------------------|
| @sentry/nextjs | ^10.26.0 |
| @supabase/supabase-js | 2.87.0 |
| next | ^15.5.9 |
| react | ^18.3.0 |
| react-dom | ^18.3.0 |
| recharts | ^2.15.4 |
| typescript | ~5.9.0 |
| zod | ^3.25.76 |
