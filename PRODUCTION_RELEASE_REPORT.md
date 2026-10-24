# Production release report

Verified 2026-10-23 on Windows, Node 22.19.0 and npm 11.11.0. Scope: the existing Atelier No. 8 application and its shared-root GitHub Pages workflow. Cloudflare Pages connected to GitHub is the primary hosting target; manual GitHub Pages remains supported.

**Local preparation only:** no account connection, Git commit, push, history rewrite or public deployment was performed. Other websites in the shared Git root were not modified or included in the application audit.

## Modified files

| Files | Change |
| --- | --- |
| `src/config/assets.ts` | Descriptive missing-image error replaces unchecked manifest assertions |
| `vite.config.ts` | Uses target-aware settings; validates the actual resolved CLI base |
| `eslint.config.js` | Rejects console calls in runtime source |
| `.env.example`, `.gitignore` | Document public target inputs; exclude Cloudflare local secrets/state and temporary release builds |
| `scripts/audit-publication.mjs` | Recognizes API-token assignments/.dev.vars, creates its output directory and preserves older audit snapshots |
| `scripts/prepare-assets.mjs` | Writes only the source image manifest |
| `tests/deployment.test.mjs` | Removes the obsolete third-workflow assertion; retains YAML/Pages contracts |
| `.github/workflows/deploy.yml` and shared-root copy | Remove an unused build-job output; preserve manual trigger, permissions, checks and dist-only upload |
| `README.md`, `PUBLISHING.md` | Concise project entry point and consolidated hosting instructions |
| `CUSTOMIZATION_GUIDE.md`, `ASSET_LICENSES.md` | Current Cloudflare/customization instructions, single manifest and shipped notices |
| `public/image-credits.html` | Adds local runtime-license links; existing photography/font attribution preserved |

Added `.node-version`, `src/config/build.ts`, `tests/cloudflare.test.ts`, `DEPLOYMENT_GUIDE.md`, `PRODUCTION_RELEASE_PLAN.md`, this report, two complete package notices in `public/licenses/`, and separate `qa/release-*` evidence/screenshots. The exact hash-based file inventory is in `qa/release-files.json` (its baseline was taken immediately after creating the new plan).

No application component, stylesheet, visible main-page copy, theme, project data, photo or font was rewritten. All **45 retained protected UI/content/asset files** match their original hashes. PLAN.md, QA.md, DEPLOYMENT_PLAN.md and DEPLOYMENT_QA.md also match their baseline hashes. Existing fixture utilities, Nord example and useful technical comments are retained. Dependencies/lockfile are unchanged.

## Removed files and reasons

| File | Reason |
| --- | --- |
| `deployment/github-pages.yml` | Redundant reference copy; canonical project/shared-root workflows remain and are compared by tests |
| `public/images/manifest.json` | Unused public duplicate; exact source URLs/dimensions/bytes remain in the single `src/config/imageManifest.json` |

Generated release previews and configuration build directories were used only for QA and excluded from Git. They were removed after verification, along with the empty legacy reference directory. The owned server/tab were closed and the viewport restored; source, final dist, previous plans and useful evidence remain. No provenance or commit metadata was altered. No assistant-brand boilerplate, generation prompts, TODO/debug statements or runtime console calls were found in application source/public content, so no authorship disclaimer was invented or concealed.

## Build and test results

| Check | Executed result |
| --- | --- |
| Clean `npm ci` | 184 packages installed, 185 audited; zero vulnerabilities reported at installation |
| `npm run format:check` | Passed |
| `npm run typecheck` | Passed, strict unused-variable/parameter checks enabled |
| `npm run lint` | Passed, including runtime no-console rule |
| `npm test` | **26 passed, zero failed**: 23 retained contracts and 3 Cloudflare contracts |
| Workflow checks | Valid YAML, pinned revisions, manual-only trigger, scoped permissions, dependent deployment and dist artifact; two retained copies match |
| Build targets | Cloudflare `/`, GitHub `/atelier-no8/` and five retained configuration fixtures build successfully |
| Invalid target | Actual Cloudflare CLI build with a repository subpath rejected before output |
| HTTP inspection | Seven isolated configurations: **266/266 files returned 200**; final artifact separately **38/38 returned 200** |
| Source/asset audit | 145 candidate files / 80 text files; zero known credential-pattern findings and zero missing referenced assets |
| Documentation links | All 23 relative Markdown references resolve |
| Regression preservation | 45 retained protected files unchanged; four historical plan/QA documents unchanged |
| Browser checks | **57 passed**, zero final failures; current evidence in `qa/release-browser-checks.json` |

The final default Atelier demo was rebuilt with `CF_PAGES=1`, root base `/`, and no invented canonical URL. Output is **38 files / 3,101,382 bytes**, including local photos/fonts, credits and full runtime notices. JavaScript: **262.55 kB**, Vite gzip estimate **82.08 kB**; CSS: **31.17 kB / 7.53 kB**; HTML: **1.58 kB / 0.77 kB**. Gzip figures are build estimates, not measured hosting transfer or Lighthouse scores.

Built HTML/JS/CSS contains no localhost, local machine path, Vite dev client/source entry, temporary QA origin or client-fixture email. The unused public manifest is absent. Notices remain in the build. Local development outside Cloudflare retains the portable `./` default; GitHub workflow inputs retain repository subpaths.

## Visual and interaction verification

Actual Chromium-based browser inspection covered **320, 375, 768, 1024, 1440 and 1920px**, with no horizontal document/child overflow. Saved viewport captures were visually reviewed, along with desktop gallery/studio/services/process/contact/footer, mobile contact/footer/menu and the 320px project dialog. The unchanged source/hash comparison supports preservation; no pixel-perfect cross-platform comparison is claimed.

Executed: all six project dialogs, initial focus, Tab/Shift+Tab wrap, Escape/opener focus and unlocked body scrolling; four filters and restored all-work state; five service disclosures; desktop anchors, settled section scrolling, mobile menu/Escape/navigation and keyboard skip link; empty/malformed/valid demo forms; all eight page images, dimensions/alt, valid anchors and unique IDs; local runtime resources and a clean console. Mobile inputs retain 16px text.

Configuration fixtures verified Nord branding/theme/three projects, partially/all disabled sections without broken dependent links, and demo=false mailto preparation to reserved example.com only. Editing input clears a stale draft. No email application was opened and nothing was sent. GitHub repository-path rendering/direct refresh and new local license links were checked. Final root artifact rendered the default six concepts, visible demo mode and empty form state without a test canonical.

Reduced-motion CSS and the reactive matchMedia guard are covered by source contracts. Browser capability inspection found no preference emulation control; an OS reduced-motion toggle was not exercised. Harness selectors were adjusted to the browser's supported DOM/role options and observed text. Smooth-scroll screenshots were captured after settling; no application change was needed.

## Assets, privacy and presentation

All 24 WebP variants match manifest dimensions/bytes; the social preview is 1200x630. Exact OFL notices remain local. Full Lucide ISC/Feather MIT and identical React/React DOM/Scheduler MIT notices are shipped independently of ignored dependencies. Asset rights/sources remain in ASSET_LICENSES.md and the credits page.

Default contact is disabled, email/social destinations are empty and all six projects remain concepts. Empty destinations are intentional demo configuration, not broken live services. Demo feedback explicitly says nothing has been sent or stored; fields are not persisted. No analytics/tracking integration or private client information is configured.

The scoped publication audit checks known patterns without printing potential values; `.env*` except `.env.example`, `.dev.vars*`, `.npmrc`, key containers, dependencies, builds and Cloudflare caches are ignored. See `qa/publication-audit.json`. Review staged files again before a future push, especially after adding client content. Source scanning is not an exhaustive secret guarantee; this repository has no history to scan.

## Cloudflare readiness and owner publication steps

1. Create an empty GitHub repository. Follow the exact PowerShell copy/check/review/commit/push procedure in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md); it creates a dedicated checkout and avoids neighboring websites.
2. In Cloudflare Workers & Pages, choose the **Pages Git integration**, connect that repository and select production branch `main`.
3. Set root directory to the repository root (or `atelier-no8` for the intentional shared layout), build command **`npm run build`**, output **`dist`**, **`NODE_VERSION=22`** and **`VITE_BASE_PATH=/`** in Production/Preview. Use the default visible Atelier demo inputs.
4. Select **Save and Deploy** when you intend to publish. Wait for actual remote success and verify the returned URL, assets, refresh, mobile/keyboard interactions and demo form.
5. Set production **`VITE_SITE_URL`** to the actual stable HTTPS root URL and rebuild. Leave preview canonical unset with the default configuration. Pushes subsequently trigger the configured production/preview deployments.
6. Add any custom domain through Pages settings first, complete DNS/HTTPS activation, update the production URL and rebuild. The guide covers exact scopes and verification.

The helper uses Cloudflare's system CF_PAGES flag, enforces root paths and does not derive canonical metadata from temporary deployment URLs. No backend, Functions, Wrangler dependency, token or private account identifier is required in source. Existing anchor/dialog routing needs no additional fallback. GitHub Pages remains a separate manual alternative described in [PUBLISHING.md](PUBLISHING.md).

## Remaining limitations

- Cloudflare/GitHub account integration, Linux remote build, repository policy, actual deployment URLs, DNS/HTTPS and custom-domain activation are unexecuted. Local builds/YAML checks cannot prove remote publication.
- One Chromium engine on Windows was tested. Firefox, Safari, real touch hardware, screen readers, full WCAG review, OS motion toggle and Lighthouse/field performance were not tested.
- The demo form has no online delivery. Optional mailto depends on the visitor's application; reliable delivery requires a separately tested service.
- The body requires JavaScript; dialogs have no independent URLs/SEO. English font subsets and later client content require fresh layout/accessibility review.
- Fictional projects must retain honest disclosure. Third-party notices are supplied; an application-source redistribution license has not been selected.

See [PRODUCTION_RELEASE_PLAN.md](PRODUCTION_RELEASE_PLAN.md) for the completed phase checklist. Exact per-file build/HTTP bytes, deployment inputs, asset checks, preservation and document-link evidence are retained under `qa/release-*`.
