# Final portfolio and deployment QA

Prepared on 2026-10-23 on Windows, Node 22.19.0, with the available Chromium-based in-app browser. This is a fresh audit of the existing Atelier edition. Earlier implementation checks remain in `QA.md`.

**Publication status: local preparation only.** No commit, remote, push, GitHub Actions run or public deployment was performed. Hosted accessibility can only be confirmed after the owner deploys successfully.

## Scope and preservation

The application lives in `atelier-no8/` under a shared Git root containing unrelated projects. Initial Git inspection found no commits, tracked files or remotes. Changes are limited to deployment/tooling, metadata inputs, tests, ignores and documentation. No redesign was required. All **46** baseline component, hook, stylesheet, content, project, theme, photograph and font hashes match the final source (`qa/deployment-preservation.json`).

## Executed checks

| Check | Result |
| --- | --- |
| Dependency install | YAML 2.9.1 added as a development-only parser; final clean `npm ci` installed 184 packages/audited 185, zero reported vulnerabilities |
| Formatting, strict TypeScript, ESLint | Passed after deployment changes |
| `npm test` | 23 tests passed: 14 existing contracts + 2 canonical-input + 7 workflow/Pages contracts |
| Workflow validation | YAML parses without duplicate keys; manual-only trigger, pinned action revisions, dependent deployment, scoped permissions and `dist` artifact asserted |
| Pages settings CLI | Actual Node process writes matching base/canonical variables to a temporary GITHUB_ENV; unsafe/mismatched inputs rejected |
| Repository-path build | `/atelier-no8/` build passed; all 37 static files returned HTTP 200; no development source URL found in HTML/JS/CSS |
| Browser QA | **49 fresh assertions passed**; details in `qa/deployment-browser-checks.json` |
| Final default production build | Passed after all source/deployment changes; portable `./` base, 37 files, **3,100,563 bytes** total |
| Final HTTP/build inspection | All 37 files returned 200; no localhost, machine path, Vite dev client, source entry URL or temporary QA origin in HTML/JS/CSS |
| Local documentation links | All 16 relative Markdown references resolve (`qa/deployment-doc-links.json`) |
| Publication audit | 110 candidate files, 64 text files, 27 asset references; zero known credential-pattern findings and zero missing assets (`qa/deployment-audit.json`) |

Final Vite sizes: JavaScript **262.48 kB** (82.04 kB gzip estimate), CSS **31.18 kB** (7.53 kB gzip estimate), HTML **1.59 kB** (0.77 kB gzip estimate). Gzip values are build estimates, not measured hosting transfer results. `qa/deployment-final-build.json` records exact per-file bytes, HTTP statuses, default metadata and preservation results. `qa/deployment-subpath-http.json` records the separate repository-path build and canonical/social-image checks. The temporary QA origin is confined to test evidence and is absent from the final build.

Browser coverage: 320, 375, 768, 1024, 1440 and 1920px with no horizontal overflow; six native project dialogs, initial focus/Escape/opener focus and scroll return; all category filters; desktop anchors and mobile menu; five service disclosures; empty/malformed/valid demo form states; all eight page images with local sources, alt text and dimensions; no duplicate IDs or broken anchor targets; clean browser console. Repository-path checks repeat rendering/metadata, direct refresh, a project dialog, mobile layout and console.

Four final checks after the clean install/build verify portable metadata/rendering, the credits link opening its intended new tab and returning to the portfolio, mobile layout with empty form state, and a clean console. The credits page and both local font-license links are included in the successful HTTP checks. All eight credited Pexels photo pages and the Pexels license page also resolved during the audit; those outbound destinations remain controlled by a third party (links retained in `ASSET_LICENSES.md`).

Screenshots: `qa/deployment-desktop.jpg` and `qa/deployment-mobile.jpg`. These are actual rendered template captures, not client work or performance measurements.

## Demo, links and assets

The visible template/demo indicators and all six concept disclosures are retained. The default contact destination and social list are intentionally empty; there are no invented live accounts or email destinations. The validated form explicitly reports that nothing was sent or stored, with no backend submission. Local image/font files and credits exist. Runtime images, scripts and styles do not require remote hosts.

The publication audit scans Git-visible application candidates plus the root workflow for known credential patterns without printing potential secret values. `.env*` except `.env.example`, `.npmrc`, key containers, dependencies, builds and temporary previews are ignored. The final audit report is `qa/deployment-audit.json`; review staged content again before a future publication, especially after adding client data.

## Deployment behavior

The actual root `.github/workflows/deploy.yml`, portable project-root copy and reference copy are synchronized. Only `workflow_dispatch` triggers a run. The workflow discovers root/nested source, installs with `npm ci`, verifies source, builds a visible Atelier demo and uploads only `dist/`. Deploy waits for build and receives Pages/OIDC write permissions separately.

The enabled Pages site's metadata supplies the public path and URL. Repository-name/user-site fallback logic, root/custom-domain metadata, overrides, invalid paths and unsafe canonical inputs have local contract tests. The Vite build applies the actual base to runtime assets and static head links. No `404.html` router workaround is needed for the existing single-page anchors/native dialogs. Project detail URLs, persisted dialog selection and per-project SEO are not implemented.

## Remaining limitations

- GitHub runner execution, repository policy, Pages environment permissions, actual hosted URLs, DNS and HTTPS provisioning have not been exercised. YAML/contract checks and local subpath hosting do not constitute a remote deployment.
- Browser verification used one Chromium-based engine on Windows. Safari, Firefox, real touch devices, assistive technology and operating-system reduced-motion behavior were not tested in this final pass. Earlier source guards are not a substitute for those platform checks. No Lighthouse score is claimed.
- The demo form has no online delivery or persistence. Optional mailto behavior depends on a visitor's email application and requires a configured real destination; real delivery was not tested.
- The body requires JavaScript; static metadata is generated. Default fonts use an English subset. Customized content and additional languages require renewed layout/accessibility checks.
- Supplied project names are fictional. Image/font/icon licenses are documented in `ASSET_LICENSES.md`; a source-code reuse license has not been chosen. Review business-specific privacy/legal text and content rights for an actual client.
- Credential scanning is pattern-based and scoped to candidate source files; it cannot prove the absence of every possible secret. No Git history exists here to scan.

Exact owner publication steps are in [PUBLISHING.md](PUBLISHING.md). All checklist status is maintained in [DEPLOYMENT_PLAN.md](DEPLOYMENT_PLAN.md).

Owned local servers and temporary browser tabs were closed after verification, the viewport was restored and the isolated repository-path build was removed. The final `dist/` and recorded QA evidence are retained locally; dependencies, build output and temporary previews remain ignored by Git.
