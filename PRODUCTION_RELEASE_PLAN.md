# Production release plan

Created 2026-10-23 before application changes. Scope: the existing Atelier No. 8 application in the shared `websites/` Git workspace. Prepare Cloudflare Pages with GitHub integration as the primary target; preserve manual GitHub Pages support, the current design and typed customization. No push, account connection or publication is authorized.

## 1. Repository audit

- [x] Read all application documentation, build/dependency configuration and deployment files.
- [x] Inspect Git state and workspace projects; identify application scope and applicable instructions.
- [x] Inventory source/public assets and scan for prompts, AI boilerplate, debug code, TODOs and machine-specific paths.
- [x] Save a pre-change file/hash inventory and record cleanup decisions.

Acceptance: clear source/deployment map, bounded scope, reproducible baseline and concrete reasons for every removal. Preserve provenance, earlier plans and unrelated projects.

## 2. Source code cleanup

- [x] Review imports, variables, shared helpers, components, CSS, TypeScript safety and configuration contracts.
- [x] Remove confirmed dead code or redundant tooling/configuration; retain required examples and dependencies.
- [x] Keep visible content, layout, animations, native dialogs, navigation, contact and section flags intact.
- [x] Run TypeScript/lint and confirm existing contracts after meaningful changes.

Acceptance: no speculative rewrite, unnecessary suppression or lost feature; changes solve an observed quality issue.

## 3. Documentation cleanup

- [x] Shorten README to overview, stack, useful commands, customization, deployment and honest limitations.
- [x] Consolidate deployment instructions around DEPLOYMENT_GUIDE.md while retaining GitHub Pages instructions.
- [x] Preserve PLAN.md and previous planning/QA records as dated history.
- [x] Keep source/asset licensing and concept disclosures accurate; exclude private/local artifacts from publication.

Acceptance: clear primary hosting target, no repetitive setup instructions or claims of real client commissions; meaningful customization instructions remain available.

## 4. Asset and dependency review

- [x] Check local image variants/dimensions, font and SVG usage, source manifests and required licenses.
- [x] Check direct dependency usage and locked installation; inspect dependency vulnerability results.
- [x] Remove only disposable duplicate development files; retain evidence needed for regression review.

Acceptance: optimized assets resolve locally, notices retained, necessary dependencies remain and all removals have recorded reasons.

## 5. Security and privacy

- [x] Review public copy/metadata, external requests, form behavior and environment inputs.
- [x] Scan Git-visible source for credential patterns without printing values; verify ignores for env, keys, caches and output.
- [x] Verify no client details, tracking scripts, internal prompts or development-only URLs enter the production artifact.

Acceptance: no observed secret exposure; public build inputs and demo form behavior are documented honestly, with scan limits stated.

## 6. Deployment configuration

- [x] Verify current official Cloudflare Pages Git/build/custom-domain guidance.
- [x] Configure root-base Cloudflare builds with `npm run build` and output `dist`; preserve explicit local/GitHub subpath overrides.
- [x] Validate public metadata URL inputs, preview/production behavior and static routing.
- [x] Write DEPLOYMENT_GUIDE.md with exact GitHub publication, Pages connection, build/env settings, redeployment, verification and custom-domain steps.
- [x] Verify retained manual GitHub Pages workflow and prevent duplicate deployment configuration drift.

Acceptance: no private account identifiers or backend dependency; root and repository-path builds work locally. No remote action is performed.

## 7. Testing and visual regression

- [x] Install locked dependencies; run formatting, TypeScript, ESLint, tests and production build.
- [x] Serve the Cloudflare-style build over HTTP and confirm every output asset responds successfully.
- [x] Inspect 320, 375, 768, 1024, 1440 and 1920px; save representative screenshots and check overflow, typography, spacing and footer.
- [x] Exercise navigation, mobile menu, filters, all project dialogs, services and demo form validation.
- [x] Verify keyboard/focus behavior, reduced-motion support to the extent the browser permits, configuration variants, local images and console.
- [x] Compare protected UI/content/asset hashes against the baseline and document any intentional difference.

Acceptance: actual executed evidence, unchanged design and no critical regression; unavailable platform checks are stated explicitly.

## 8. Final release verification

- [x] Build the intended default edition again after configuration checks; validate retained workflow and document links.
- [x] Record modified/removed files, cleanup rationale, dependency/build/test/browser/security results and remaining limits in PRODUCTION_RELEASE_REPORT.md.
- [x] Recheck Git scope and publication candidates; preserve previous plans and remove owned temporary previews only.
- [x] Update this plan, stop owned previews and provide exact publication steps without claiming public availability.

Acceptance: a clean, reviewable release preparation with accurate documentation, evidence and no push/deployment.

## Initial audit observations

- Shared Git root: `websites/`; branch `master` has no commits, tracked files or remotes. Other websites are outside the edit scope.
- Existing app: React 19, TypeScript 6, Vite 8, Tailwind 4, Lucide; Node >=22.19 and npm lockfile. Dependencies are already installed.
- Existing deployment: portable `./` Vite default; validated manual GitHub Pages workflow in shared/project roots plus a redundant reference copy.
- Required fixtures, demo/concept labels, local photographs/fonts and customization documentation are meaningful product/maintenance content.
- Initial source scan found no assistant-brand boilerplate, TODO/debug statements or unsafe TS suppressions; the loopback host appears only in local dev/preview commands.

## Verification log

Plan created. Implementation follows the ordered phases above. Previous planning documents remain intact.

Phase 1 verified: all eight existing Markdown documents, package/Vite/TypeScript/ESLint configuration, three workflow copies and source/public inventory inspected. No applicable AGENTS.md was found. Git remains unborn/untracked without a remote. Baseline saved in qa/release-before.json (111 candidates). No assistant boilerplate, TODO/debug statements or TS suppressions were found in application source. Retain useful comments, Nord configuration, customization contracts, license notices, earlier plans and QA evidence. Remove the redundant deployment/github-pages.yml reference copy after updating its test/document references; retain the canonical project workflow and required shared-root copy. Cloudflare support will be explicit through its CF_PAGES environment and root-path validation; portable local and GitHub repository-path builds remain supported.

Phase 2 verified: reviewed all runtime components and shared helpers; all exported components are used. No dead runtime dependency or confirmed redundant visual CSS was found. Replaced unchecked image-manifest assertions with a clear missing-entry error, prohibited runtime console statements through ESLint, removed the redundant reference workflow and its equality assertion, and removed the unused build-job output from both retained workflows. TypeScript, ESLint and all 23 existing contracts passed. No visual component, stylesheet or content change was made. Existing technical comments describe actual invariants and remain useful.

Phase 3 verified: README reduced to a focused product/developer entry point; shared repository publication commands now live in DEPLOYMENT_GUIDE.md, and PUBLISHING.md describes only the optional manual GitHub Pages path. Cloudflare setup includes root directory, build/output, Node, Production/Preview public inputs, redeployment and custom-domain steps, with official references. Customization instructions retained and linked to both hosting targets. Existing plans/QA remain intact; optional public curation is documented without deleting them. No authored client claim or license notice was removed. Release report created for executed results.

Phase 4 verified: all 24 local WebP variants match manifest width/height/bytes; the social image is 1200x630. Both font notices exactly match installed package licenses. Complete Lucide ISC/Feather MIT and shared React/React DOM/Scheduler MIT notices are now included in public/licenses and linked from credits. Removed only the unused public/images/manifest.json duplicate and its generator write; src/config/imageManifest.json remains the single source, and attribution/source records are retained. All direct runtime/dev dependencies have active imports or tooling/asset roles. Fresh npm ci installed 184 packages/audited 185 with zero reported vulnerabilities. No lockfile or dependency version change was necessary.

Phase 5 verified: visible copy, static metadata, default disabled contact, demo feedback and empty social destinations reviewed; no real client information or tracking integration is configured. Publication audit found zero credential-pattern matches and zero missing referenced assets. Ignore rules now also cover Cloudflare local state, .dev.vars variants and temporary release previews; .env.example stays publishable. Audit reports use a generic filename and create their output directory, preserving earlier deployment snapshots and supporting curated checkouts without existing QA output. Source/public hygiene and SVG inspection passed (the SVG XML namespace is inert metadata). Existing production HTML/JS/CSS contains no local machine/dev URLs; final new builds will be checked again in Phase 7. No current secret exposure was observed; the pattern-based scan is not an exhaustive proof.

Phase 6 verified: official Cloudflare build/image/Git/SPA/custom-domain guidance checked. Added .node-version (22) and a pure build-settings helper: CF_PAGES=1 defaults to /, rejects non-root env/CLI paths and non-root canonical addresses, and never invents canonical metadata from a temporary CF_PAGES_URL. Portable ./ and GitHub subpath inputs remain independent. TypeScript/ESLint and 26 tests passed (23 retained + 3 Cloudflare contracts). Actual npm run build succeeded for Cloudflare root and /atelier-no8/; static script/favicon/canonical checks passed, and a conflicting actual CLI base was rejected. Evidence is qa/release-deployment.json. No router, backend, account identifier, Wrangler dependency or automatic extra GitHub deployment was added. DEPLOYMENT_GUIDE.md contains owner steps and accurate unexecuted remote checks.

Phase 7 verified: clean lockfile install, final formatting/TypeScript/ESLint and 26 tests passed. Seven isolated production configurations served all 266 files with HTTP 200. Five original fixture builds restored source in finally. Fifty-five fresh browser assertions passed: six widths with no child/document overflow, six dialogs, forward/reverse focus wrapping, Escape/opener focus, all filters/services, desktop/mobile/skip navigation, invalid/valid demo forms, local images/metadata, Nord, disabled/partial sections, client drafting/stale-draft reset, GitHub subpath refresh, notices and console. Six viewport captures plus gallery/studio/services/process/contact/footer/mobile/dialog captures were visually inspected. All 45 retained protected UI/content/photo/font hashes match; the only removed protected entry is the unused public manifest. Four historical plan/QA files match their baseline hashes. Reduced-motion CSS/hook contracts passed; this browser exposes no preference emulation capability, so no OS preference toggle is claimed. Final security scan had zero findings/missing assets. Evidence is recorded separately under qa/release-*.

Phase 8 verified: default Atelier demo rebuilt with CF_PAGES=1, root base / and no invented canonical; 38 files / 3,101,382 bytes. All final files returned HTTP 200; built HTML/JS/CSS contains no development paths, temporary QA origin or client-fixture email. Two final browser checks bring the executed total to 57, all passing. All 23 relative documentation links resolve, retained workflow copies match and final publication audit covers 145 candidates / 80 text files with zero findings/missing assets. Exact modified/added/removed inventory is qa/release-files.json; the two source removals have explicit reasons in PRODUCTION_RELEASE_REPORT.md. Prior plans/QA and unrelated projects remain unchanged. No files were staged/committed and no remote was configured. Owned HTTP server/tab closed, viewport restored, and only the verified qa/release-preview and qa/variants build directories plus the empty obsolete reference directory were removed. Final screenshots, evidence, source and dist are retained. Exact owner publication steps and remote/platform limitations are documented. Nothing was pushed or published.
