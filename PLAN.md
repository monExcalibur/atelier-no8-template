# Atelier No. 8 — implementation plan

Created before application code on 2026-10-23. All tasks start incomplete. This is a new, local-only project; no publishing is authorized.

## Brief and design direction

Build an English-language, commercially reusable React/TypeScript creative portfolio. Warm paper, charcoal ink, elegant serif display type, quiet sans-serif labels, generous margins and an asymmetric photographic gallery. Six fictional projects, accessible project dialogs, honest demo contact validation, configurable branding/content/theme/projects/sections, and static build metadata.

## Phase 0 — Repository Audit and Architecture

- [x] Inspect workspace, ancestor instructions, existing packages and conventions; preserve all unrelated projects.
- [x] Establish `atelier-no8/` as an independent project with `src/config`, `src/components`, `src/hooks`, `public/images`, `public/fonts`, `tests`, `deployment`, and `qa`.
- [x] Define typed configuration contracts, section IDs, safe asset/contact helpers, native project dialogs and content-driven components.
- [x] Confirm image/font sources and rights; store optimized local assets and an honest source register. Stock imagery illustrates fictional concepts and is never claimed as commissioned work.

Acceptance: audit documented, independent architecture decided, asset strategy verifiable. Verify directory/status inventory and source/license records.

## Phase 1 — Project Setup and Design System

- [x] Initialize compatible stable React, TypeScript, Vite, Tailwind and Lucide packages; strict TypeScript, ESLint and formatting commands.
- [x] Install dependencies and verify scripts, environment defaults and ignores.
- [x] Load local display/body fonts; define centralized CSS tokens, responsive type and reusable primitives.

Acceptance: clean setup, working font assets and shared design tokens. Verify package install, typecheck and minimal build.

## Phase 2 — Configuration and Template Architecture

- [x] Implement typed brand, contact, demo, SEO, content, theme and section configuration.
- [x] Implement six complete projects with stable IDs, briefs, descriptions, thumbnail dimensions, optional galleries and tags.
- [x] Derive navigation/CTAs from enabled sections and validate safe destinations.
- [x] Add a documented Nord Studio configuration example without building a second website or runtime editor.

Acceptance: important copy lives in configuration; no component edits needed for normal customization. Verify contracts and configuration helpers.

## Phase 3 — Core Website Implementation

- [x] Header, accessible mobile navigation, editorial hero and selected work CTA.
- [x] Asymmetric six-project gallery and accessible project detail dialogs.
- [x] Configurable studio philosophy, visual, five services and five process stages.
- [x] Contact form, contact details, footer and subtle demo/concept disclosures.

Acceptance: every required section and project detail exists, links are meaningful. Verify render, semantics, image loading and basic interactions.

## Phase 4 — Visual Polish and Interactions

- [x] Apply distinctive editorial layouts, deliberate image crops and responsive spacing.
- [x] Implement subtle entrance/reveal, image hover and reduced-motion behavior.
- [x] Complete keyboard focus, Escape/close/return focus, mobile menu and touch targets.
- [x] Review desktop, tablet and mobile compositions in the actual browser.

Acceptance: polished layout and usable interactions at all required widths. Verify screenshots, keyboard states, overflow and console.

## Phase 5 — Template Functionality

- [x] Verify brand/theme/content replacement and project add/remove/reorder behavior.
- [x] Verify disabled sections remove navigation and dependent CTA anchors without gaps.
- [x] Implement meaningful demo validation feedback with no fake success.
- [x] Implement optional configured mailto drafting, including missing destination handling and documented limitations.

Acceptance: configuration changes are safe and visible; demo/client contact behavior is honest. Verify contract tests plus browser configuration variants.

## Phase 6 — SEO and Deployment

- [x] Generate configurable escaped title, description, Open Graph and favicon in static HTML at build time.
- [x] Optimize imagery, lazy loading, image dimensions and local fonts; avoid external runtime requests.
- [x] Verify root/relative and GitHub Pages repository base paths, project refresh behavior and assets.
- [x] Prepare manual GitHub Pages workflow example and deployment documentation; do not publish.

Acceptance: production output works under a repository subpath and includes crawler-readable metadata. Verify build HTML and HTTP requests.

## Phase 7 — Quality Assurance

- [x] Run typecheck, lint, meaningful configuration tests and production build; fix critical errors.
- [x] Test navigation, mobile menu, all six projects, keyboard dialog behavior and contact validation.
- [x] Test demo mode, section flags, custom theme, project changes and alternative configuration.
- [x] Check image loading and accessibility basics, reduced-motion implementation and static metadata.
- [x] Test 320, 375, 768, 1024, 1440 and 1920px; capture representative screenshots and review visible results.
- [x] Record actual results, build sizes, limitations and unperformed checks in `QA.md`.

Acceptance: checks actually pass, no critical observed issues, honest evidence saved. No invented Lighthouse scores or unperformed browser claims.

## Phase 8 — Final Documentation and Delivery

- [x] Write `README.md` with overview, architecture, commands, deployment, demo behavior and limitations.
- [x] Write `CUSTOMIZATION_GUIDE.md` covering all 14 requested topics with implemented fields and paths.
- [x] Finish asset license register, QA evidence and this plan with verified completion notes.
- [x] Review final files and provide concise local usage/customization/deployment report.

Acceptance: documentation matches delivered source and final build; no unrelated changes. Verify commands and final inventory.

## Risks and mitigation

- Stock imagery rights and availability: verify official source/license, download locally, record each source; use intentional placeholders only if rights cannot be established.
- Font licenses: use local OFL font packages with included license files.
- Large photography: create responsive optimized WebP variants and provide explicit dimensions/sizes.
- Static subpaths: centralize local URL resolution and generate build-time metadata using actual Vite base.
- Focus/scroll behavior: native modal dialogs, explicit return focus, Escape handling and body scroll restoration.
- Configuration drift: typed contracts and meaningful tests for navigation, contact safety, project uniqueness and metadata escaping.
- Editorial type at 320px: responsive type scale and flexible wordmark/buttons; verify every required viewport.
- Platform limits: document unavailable motion emulation, screen reader, cross-browser or performance checks rather than claiming them.

## Verification log

Plan created before application code. Implementation not started at creation.

Phase 0 verified: no applicable ancestor AGENTS.md found; root contains unrelated closer, unt and Nexora projects. Only atelier-no8 is edited. Pexels source pages and license (including template use) checked 2026-10-23; font packages declare OFL-1.1. Native project dialogs avoid static route fallback complexity. Dependencies installed with zero reported vulnerabilities; TypeScript 6.0.3 selected because typescript-eslint supports versions below 6.1, although TypeScript 7 is available.


Phases 1–3 verified: 183 packages installed, local WebP/font assets present; typecheck, ESLint, 14 configuration/contact/metadata contract tests and production build passed. First HTTP preview returned 200. Actual desktop browser render confirms all required sections, six project buttons, live images and editorial typography. Baseline output: 261.76 KB JS / 81.81 KB gzip and 30.90 KB CSS / 7.45 KB gzip. Browser interaction and responsive QA remain for Phases 4–7.


Interaction QA issue resolved: React StrictMode effect replay queued a native close event, dismissing freshly opened dialogs. Modal cleanup now relies on DOM removal and restores opener focus after removal; native modal remains open during effect replay. Verified Forma detail, initial close focus, both Tab wrapping directions, Escape, scroll restoration and opener focus in the development build. Tailwind reset also required explicit auto margins for dialog centering.


Phase 4 milestone: desktop and 375px editorial compositions inspected. All six project dialogs, focus wrapping, Escape, close restoration, four gallery filters, empty/malformed/valid demo form states, mobile menu and five service disclosures executed in the actual browser. Mobile demo text is now visible rather than relying on a dot alone; main reading text enlarged. Full responsive matrix remains in progress. Vite source config edits trigger dev-server restarts; one browser preview had to be reopened after a transient connection refusal. Image manifest moved into src/config to eliminate Vite public-import warnings.


Phase 4 verified: all six widths (320, 375, 768, 1024, 1440, 1920) measured with zero document or child horizontal overflow. Native 320px project dialog fits within the viewport. Mobile wordmark closes navigation; five service disclosures tested with keyboard Enter. Reduced-motion CSS and reactive matchMedia observer guard inspected and contract checked; OS-level motion emulation remains unavailable through this browser interface.


Phase 5 verified in isolated production builds: Nord changes brand, accent, services and project count to three; disabling about/process removes their sections/navigation; disabling all six sections leaves no main spacer or invalid anchors. Demo=false without destination explains unavailable delivery. A temporary client fixture prepares an encoded mailto draft to reserved example.com only, preserves six independent concept disclosures and clears stale drafts when fields change. No email app was opened and no message was sent. Source restored after fixture builds. Default, Nord and client layouts checked at narrow widths.


Phase 6 verified: all 37 production files returned HTTP 200 beneath /atelier/; static HTML contains configured title/description/Open Graph text, subpath favicon and font preloads. Built CSS font URLs resolve beneath /atelier/fonts/. Direct subpath refresh renders six projects. Local social preview is exactly 1200×630. Canonical-dependent absolute Open Graph image generation and escaping pass contract tests. Manual Pages workflow is delivered only in deployment/ and was not activated. README and customization guide written against actual fields. Final default relative build verification remains in Phase 7.


Phase 7 verified: final formatting, strict typecheck, ESLint, all 14 contract tests and production build passed. All 60 recorded browser assertions pass, including final relative-base app, centered native dialog, keyboard focus restoration, six repeated final viewport measurements and visible mobile demo label. All eight page images load with zero external runtime resources; final browser console has zero warnings/errors. Final output: JS 262.15 kB (Vite gzip estimate 81.90 kB), CSS 31.18 kB (7.53 kB), HTML 1.59 kB (0.77 kB); total 37 files / 3,100,231 bytes. QA.md records actual evidence, resolved issues, environment limits and unexecuted checks.


Phase 8 verified: README, all 14 customization topics, source/license register, QA report, 60-assertion browser record and representative screenshots reviewed. Workflow source reviewed against official documentation; local YAML validation and remote CI were unavailable, as recorded in QA.md. Final source remains default Atelier demo with disabled delivery; production dist is ready. Owned preview servers stopped and generated QA variant build directories removed after checking the exact absolute cleanup path. Source, local assets, screenshots and reproducible fixture utility retained. No unrelated project was edited and nothing was published. Final handoff report prepared.

