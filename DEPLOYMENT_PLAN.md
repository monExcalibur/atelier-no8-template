# Final portfolio QA and GitHub Pages preparation

Created 2026-10-23 before deployment changes. Scope: the existing Atelier No. 8 React/TypeScript/Vite template. Preserve its design, content structure and working interactions. Do not push, create a remote repository or publish.

## Phase 1 — Audit

- [x] Inspect repository instructions, Git root/history/remotes, project documentation and dependency state.
- [x] Identify build scripts, Vite base handling, static metadata and existing deployment example.
- [x] Audit local links, asset references, placeholders and demo/contact behavior.
- [x] Audit prospective committed files for secrets/sensitive content and strengthen ignores where necessary.
- [x] Record repository layout and publishing assumptions.

Acceptance: bounded project scope, known deployment inputs and honest demo limitations; unrelated projects preserved. Verify inventory, source/configuration reads and a report that never prints secret values.

## Phase 2 — Quality Assurance

- [x] Install locked dependencies if needed; run formatting, TypeScript, lint, contract tests and production build.
- [x] Fix actual failures without redesigning or rebuilding the application.
- [x] Serve the production build over HTTP; verify 320, 375, 768, 1024, 1440 and 1920px layouts.
- [x] Exercise navigation, mobile menu, gallery filters, all project dialogs, form validation/demo feedback and image loading.
- [x] Save current browser evidence and screenshots; distinguish it from earlier QA.

Acceptance: executed checks pass and existing visible design/behavior is preserved. Record unavailable checks honestly.

## Phase 3 — GitHub Pages

- [x] Create `.github/workflows/deploy.yml` at the actual Git root and a portable project-root copy for standalone publication.
- [x] Keep deployment manual-only; install locked packages, run checks, build and upload only `dist`.
- [x] Resolve default Pages base from repository name, with explicit root/custom-domain override and environment configuration.
- [x] Verify action revisions and workflow syntax/contracts using available tooling.
- [x] Build and serve from a repository subpath; verify asset/font/metadata URLs and direct refresh.
- [x] Document native project-dialog routing behavior and canonical/social preview setup.

Acceptance: reviewable workflow works with current nested or standalone source layout, deployment paths are tested, and nothing is published.

## Phase 4 — Portfolio Presentation

- [x] Preserve visible demo/concept disclosures and honest form messages.
- [x] Update professional README with overview, stack, screenshot/capture instructions, deployment and customization pointers.
- [x] Add a short English portfolio description without implying real client relationships.
- [x] Provide exact, scoped GitHub publication steps and explain which files must stay local.

Acceptance: a potential client can understand the project and a developer can customize/publish it without guessing repository layout or mistaking concepts for clients.

## Phase 5 — Final Verification

- [x] Run the production build again after deployment/documentation work.
- [x] Validate workflow copies, deployment configuration, ignored files and final source inventory.
- [x] Record final results, build sizes, remaining limitations and exact publishing steps.
- [x] Update this checklist, stop owned previews and deliver the report.

Acceptance: prepared source and workflow are consistent, tests are actually executed, public accessibility is not claimed and no push/deployment occurs.

## Initial observations

- Git root is the shared `websites/` workspace; Atelier source is nested in `atelier-no8/`. Several unrelated projects are untracked and must not be staged wholesale.
- Current branch is `master`; the audit subsequently confirmed no remote, commits or tracked files.
- Existing `deployment/github-pages.yml` is an inactive manual example, not an active root workflow.
- Vite already accepts `VITE_BASE_PATH` and captures CLI base overrides for static metadata. Default portable base is `./`.
- Dependencies are present; a prior implementation QA report exists. This task will record fresh checks separately.

## Verification log

Plan created before changes; checklist updated after each phase.

Phase 1 verified: shared Git root has no commits, tracked files or remote, and no applicable AGENTS.md was found. Atelier is the sole application scope. Publication audit scanned 50 text files among 94 candidates, found zero credential-pattern matches and zero missing referenced local assets. Demo mode is true, delivery disabled, no invented email/social accounts, and all six projects are concepts. Blank contact/canonical fields are intentional configuration, not working services. Ignore rules now exclude all local env variants, .npmrc and common key containers while retaining .env.example. UI/content/image hashes saved before changes for preservation comparison. Added YAML 2.9.1 as a dev-only workflow validator; install audited 185 packages with zero reported vulnerabilities.


Phase 2 verified: formatting completed; strict TypeScript, ESLint, all 14 existing contract tests and production build passed. Fresh HTTP preview returned 200. Forty new browser assertions passed: six required widths without overflow, six project dialogs and focus restoration, four filters, desktop/mobile navigation, five disclosures, empty/invalid/valid demo form states, all eight page images, local runtime assets and clean console. Evidence saved separately in qa/deployment-browser-checks.json with current screenshots. No application UI, style, content or image changes were needed.

Phase 3 verified: manual-only root/standalone workflows and synchronized reference copy added. Official action revisions and Pages outputs were checked. YAML parsing, workflow contracts, base/canonical validation and the actual GITHUB_ENV-writing CLI are tested; the expanded suite passed 23 tests. A build with /atelier-no8/ and an isolated QA canonical origin served all 37 files with HTTP 200. Five additional browser assertions passed for subpath assets/metadata, direct refresh, project dialog, mobile layout and console (45 total so far). No development source URLs were found in that build. PUBLISHING.md documents repository/root/custom-domain paths, manual activation, static routing and safe source scope. Remote GitHub Actions and Pages publication remain deliberately unexecuted.

Phase 4 verified: README now includes actual desktop/mobile captures and capture instructions, stack/features, configuration map, honest demo/contact/routing limits, manual workflow activation and an English portfolio description. CUSTOMIZATION_GUIDE.md covers public canonical inputs and client workflow changes. PUBLISHING.md provides exact PowerShell commands for an isolated publishing checkout, staged-file review and GitHub Pages activation without staging unrelated workspace projects. Earlier QA is labeled historical; DEPLOYMENT_QA.md records this task separately. Fictional brands remain explicitly identified as concepts.

Phase 5 verified: fresh npm ci installed 184 packages and audited 185 with zero reported vulnerabilities. Formatting, strict TypeScript, ESLint and all 23 tests passed; the final default production build contains 37 files / 3,100,563 bytes. All 37 files returned HTTP 200 and built HTML/JS/CSS contain no development-only paths or temporary QA origin. Four final browser checks bring this task to 49 passing assertions. All 46 baseline UI/content/image/font hashes are unchanged. Three workflow copies have identical SHA-256 hashes. Final publication audit covers 110 candidates / 64 text files and 27 asset references: zero known credential findings, zero missing assets. All 16 relative documentation links resolve; nine external Pexels credit/license destinations resolved. Ignore checks passed, .env.example remains publishable, and no files were staged or committed. Owned HTTP previews/tabs were closed, viewport restored and the isolated Pages preview folder removed. Final results and remaining limits are in DEPLOYMENT_QA.md; exact owner publishing steps are in PUBLISHING.md. Nothing was pushed or published.

