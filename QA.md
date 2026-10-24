# Verification report

Historical implementation snapshot. For the subsequent final deployment audit, workflow checks and current totals, see [DEPLOYMENT_QA.md](DEPLOYMENT_QA.md).

Verified 2026-10-23 on Windows, Node 22.19.0, with the available Chromium-based in-app browser. This report describes the delivered default source and the configuration fixtures actually tested, not a later client customization.

## Automated checks

| Check | Executed result |
| --- | --- |
| Fresh dependency installation | 183 packages installed; npm reported zero vulnerabilities at installation time |
| `npm run format:check` | Passed |
| `npm run typecheck` | Passed, strict TypeScript |
| `npm run lint` | Passed, zero errors/warnings |
| `npm test` | 14 tests passed, zero failures |
| `npm run build` | Passed; final default Atelier configuration, relative `./` base |

Contract checks cover six complete/local-image projects, unique IDs, add/remove/reorder data, automatic navigation and CTA targets, all-disabled sections, Nord adaptation, validation lengths/categories, disabled/demo/unconfigured contact, mailto encoding and recipient safety, unsafe URLs, escaped static metadata, absolute canonical/social image resolution, theme serialization and reduced-motion source guards/font licenses.

The final build contains 37 files totaling **3,100,231 bytes**, including all image variants, local fonts/licenses and the 1200×630 JPEG social preview. Vite reported:

| Asset | Build size | Vite gzip estimate |
| --- | ---: | ---: |
| JavaScript | 262.15 kB | 81.90 kB |
| CSS | 31.18 kB | 7.53 kB |
| HTML | 1.59 kB | 0.77 kB |

These are build output sizes, not Lighthouse scores or measured field performance.

## Browser checks

**60 recorded assertions passed** in `qa/browser-checks.json`. Each assertion includes its observed result. Significant checks:

- Default brand, six projects, one page h1, explicit form labels, image alt text/dimensions and no duplicate IDs or invalid local anchors.
- Work navigation, all four category filters and restored “All work” state.
- Every project opens a detail with the correct title, brief, two visuals and concept disclosure.
- Native dialog modality, initial Close focus, forward/reverse Tab cycling, Escape and close-button return focus, body scroll restoration and centered desktop geometry.
- A 320px project dialog fits the viewport without internal horizontal overflow.
- Mobile menu opens with four links, closes with Escape, restores toggle focus, navigates to Studio and closes when the wordmark is activated.
- All five service disclosures expand; keyboard Enter operates the summaries.
- Empty contact submission yields four associated errors and focuses name; malformed email is rejected; valid demo input explicitly reports that nothing was sent or stored.
- A client fixture with reserved `studio@example.com` prepares an encoded draft link without navigation or sending. Changing an input removes the stale draft. No email application was opened.
- Demo=false without a destination explains that enquiries are not configured.
- Nord changes brand, accent, services and portfolio data to three architecture/interiors projects. Disabled Studio/process sections remove navigation and content.
- An all-disabled fixture removes every main section, dependent links and main spacing while keeping valid home/skip anchors and an accessible heading.
- A partial fixture hides work/services while retaining hero/studio; both dependent CTA links disappear without broken anchors.
- Keyboard skip link focuses main. Final mobile inputs use 16px text, the menu touch target is 46px, and the demo label remains visibly readable.
- Eight main-page images loaded locally after scrolling; reveal animations completed; no external scripts/styles/images were present.
- Production browser console: zero warnings/errors in the inspected log.

### Required responsive widths

Document and visible-child bounds were measured at all required widths. The scrollbar occupies 15px in this browser; overflow compares scroll width with client width, not the outer viewport width.

| Viewport | Client width | Scroll width | Horizontal overflow |
| ---: | ---: | ---: | --- |
| 320 | 305 | 305 | None |
| 375 | 360 | 360 | None |
| 768 | 753 | 753 | None |
| 1024 | 1009 | 1009 | None |
| 1440 | 1425 | 1425 | None |
| 1920 | 1905 | 1905 | None |

Nord was additionally checked at 320 and 1440px; the client draft form at 320px. Representative viewport screenshots are saved in `qa/`, including `desktop-1440.jpg`, `mobile-375.jpg`, `mobile-menu.jpg`, `project-forma.jpg`, `project-mobile-320.jpg`, `contact-demo.jpg`, `client-draft.jpg` and `nord-config.jpg`. One whole-page screenshot attempt failed in the browser capture tool; viewport captures and actual page scrolling were used for review instead.

## Static hosting and metadata

- HTTP 200 confirmed before browser use.
- Explicit `/atelier/`, `/nord/`, `/hidden/`, `/partial/` and `/client/` production builds exercised over a plain static HTTP server; no application routing fallback was needed.
- Every one of the 37 files in the `/atelier/` build returned HTTP 200, including photographs, CSS, fonts, licenses, favicon and credits page.
- Built CSS font URLs resolve under `/atelier/fonts/`.
- Static HTML includes configured title, description, Open Graph text, theme values, favicon and font preloads before React runs. The actual CLI base is used.
- Direct refresh under `/atelier/` renders all six projects. The final portable relative-base build was independently served at a root URL and reviewed.
- Canonical and absolute image behavior tested in contract checks. The default intentionally emits no invented canonical or absolute social URL; configure the real deployed address before release.
- Source restored to Atelier, `demoMode: true`, blank email and disabled contact after client fixtures. Default build regenerated last.
- The manual GitHub Pages example remains inactive in `deployment/`; no remote CI run or publication occurred.

## Issues found and resolved

- Native `dialog.close()` during React StrictMode effect replay queued an event that dismissed newly mounted dialogs. Cleanup now relies on DOM removal and restores focus after removal; verified in both dev and final production.
- Tailwind's reset required explicit `margin: auto` to center native dialogs.
- Image dimension metadata was moved from a public import into `src/config/imageManifest.json` to remove Vite development warnings. A transient restart occurred while the file was being created; final clean starts/builds resolve it.
- The mobile demo indicator was changed from an isolated dot to readable text. Main reading copy was enlarged, form boundaries strengthened and footer/home touch targets checked.
- An automated coordinate click during smooth section scrolling missed a contact button. Keyboard activation retested the expected behavior. A mobile display assertion was corrected to test rendered visibility, because a flex item's computed display is block. These retests are identified in the saved evidence.

## Reproducing configuration fixtures

With the dev server stopped, run `node qa/build-variants.mjs` from the project directory. It builds five isolated fixtures into ignored `qa/variants/` directories, temporarily replaces the default contact settings for the reserved example.com client fixture and restores the original source in `finally`. It intentionally requires the exact default contact line; review it before using it on a customized client project. Serve that folder over HTTP for local checks. These generated QA builds are not the deliverable and are excluded from version control; the final deliverable is `dist/`.

## Verification limits

- No Lighthouse run, Core Web Vitals field measurement, real mobile hardware, Firefox, Safari, screen-reader session or full WCAG audit was executed.
- Reduced-motion CSS, the reactive `matchMedia` guard and the source contract were checked; OS-level reduced-motion emulation was unavailable through this browser API, so that runtime preference toggle was not exercised.
- No real email delivery, mail-client integration, backend/form service, booking, purchase or external social account was tested or implied.
- Remote GitHub Actions/Pages deployment and social-crawler cache behavior were not executed. The workflow example was reviewed against official documentation; a local YAML validator was unavailable. Publishing requires the owner's authorization and correct account/repository settings.
- Replacement fonts, long brand copy, new imagery and a later customized edition require their own responsive/accessibility review.

No critical issue remained in the executed checks.
