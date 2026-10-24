# Customize the portfolio

Paths below are relative to `atelier-no8/`. Keep the TypeScript contracts in `src/config/types.ts`; changes to copy and data do not require component edits. Restart the dev server if you change environment variables. Configuration files are also imported by Vite to render the static head, so editing them can briefly restart the preview.

## 1. Company name

In `src/config/siteConfig.ts`, edit `atelierConfig.brand`:

```ts
brand: {
  name: 'Your Studio',         // Full accessible name and Open Graph site name
  shortName: 'Y / S',          // Small mark on the hero photograph
  wordmark: 'Your',            // Main text wordmark
  suffix: 'Studio',           // Small raised wordmark suffix
  logo: '',                   // Empty = text wordmark
  tagline: 'Your considered point of view.',
},
```

Update `content.about.paragraphs`, hero lines, footer copyright and `seo` separately when they contain brand-specific copy. They intentionally live in content configuration rather than interpolating prose or silently changing its meaning. Use a concise wordmark; the full legal/company name can remain in `brand.name`.

## 2. Replace the logo and favicon

Place a licensed SVG/PNG/WebP logo in `public/images/your-logo.svg`, then set `brand.logo: 'images/your-logo.svg'`. The wordmark component uses `brand.name` as its image alt text. The header constrains the image to a 190×50px area with `object-fit: contain`; prepare appropriate internal whitespace. Check the footer version too. Do not include `public/` in asset paths.

Replace `public/favicon.svg` or set `seo.favicon` to another local SVG path. The default “A” favicon is a demonstration asset and should be changed for a different studio. Use an SVG for the existing metadata MIME declaration, or update that declaration in `src/config/metadata.ts` if choosing another file type.

## 3. Theme colors

Edit `theme` in `src/config/theme.ts`. Every field maps to a CSS custom property:

| Configuration field | Token | Purpose |
| --- | --- | --- |
| `background` | `--paper` | Main warm background |
| `backgroundSecondary` | `--paper-deep` | Studio and feedback surfaces |
| `text` | `--ink` | Main typography and buttons |
| `muted` | `--muted` | Secondary copy |
| `accent` | `--accent` | Italic emphasis and focus indicators |
| `border` | `--line` | Rules and control borders |
| `surface` | `--surface` | Image loading surfaces |
| `inverse` | `--forest` | Process section background |
| `inverseText` | `--on-forest` | Process section typography |
| `radius` | `--radius` | Control radius (default 0px) |

For example, `accent: '#4f6454'` changes the central emphasis color. Background and foreground pairs must retain readable contrast. Photo overlays use fixed light/dark treatments for the supplied crops; check these if replacing imagery. CSS values must not contain `;`, `{`, `}`, `<` or `>`; the static theme serializer rejects these to prevent style-tag injection. Tailwind consumes paper, ink, accent and font tokens through `@theme inline` in `src/styles.css`. There is no runtime theme editor.

## 4. Typography

Set `displayFont` and `bodyFont` in `src/config/theme.ts`. Existing local faces are Cormorant Garamond 400 regular/italic and DM Sans 400/500. For another licensed typeface:

1. Put its WOFF2 files and license in `public/fonts/`.
2. Update the matching `@font-face` declarations at the top of `src/styles.css`, including style and weight.
3. Change the theme font stacks.
4. Update the two font preloads in `src/config/metadata.ts` to point to the real regular faces.
5. Review wrapping, italic headings and navigation at 320–1920px.

Default faces use `font-display: swap`. Add appropriate character subsets for other languages. Do not leave preload links pointing to removed files.

## 5. Hero and important text

Edit `content.hero` in `src/config/content.ts`: `eyebrow`, `title`, `emphasis`, `intro`, `cta`, `note`, `image`, `imageCaption`, `imageIndex` and `seal`. The main headline has two independently styled lines. `content.hero.cta` links to portfolio only when that section is enabled.

All other important text is in this same file: `nav`, `ui`, `portfolio`, `about`, `services`, `process`, `contact` and `footer`. Strings with `\n` intentionally create editorial line breaks in the relevant headings. Avoid forcing many short lines on mobile. `content.ui.demoShort` supplies the readable small-screen demo marker.

## 6. Add, remove and reorder projects

Edit the `projects` array in `src/config/projects.ts`. Its order is the gallery order. Each `Project` requires:

```ts
{
  id: 'sample-project',          // Unique lowercase slug; validated at startup/build
  title: 'Sample Project',
  category: 'Brand Identity',
  year: '2026',
  description: 'A short summary.',
  brief: 'What the project set out to explore.',
  details: ['A more detailed paragraph.'],
  thumbnail: {
    src: 'images/sample-1200.webp',
    alt: 'Describe the visible subject rather than repeat the project title',
    width: 1200,
    height: 900,
    srcSet: [
      { src: 'images/sample-640.webp', width: 640 },
      { src: 'images/sample-1200.webp', width: 1200 },
    ],
    position: '50% 50%',
  },
  gallery: [],                   // Optional supporting images, same image type
  tags: ['Strategy', 'Identity'], // Optional
  concept: true,                // Keep true for speculative/demo work
  layout: 'landscape',           // landscape | portrait | square
  coverLabel: 'sample',          // Optional decorative text over the thumbnail
}
```

Remove an array entry to remove a project. Move entries to reorder them. No separate route, dialog file or component registration is required. Categories are derived from the array; `content.portfolio.categories` controls preferred filter order, while new categories are automatically appended. The gallery count is derived from the actual array length.

Native project details include title, category/year, brief, description paragraphs, scope, images and a close/back action. Set `concept: false` only when replacing the demo with work you can accurately represent as real. Turning off global demo mode leaves concept disclosures intact.

## 7. Replace images

Use local WebP files in `public/images/` with descriptive alt text, correct width/height and suitable resolution. The `photo()` helper in `src/config/assets.ts` is for the eight registered demo image keys; its sizes come from `src/config/imageManifest.json`. For new client imagery, use an explicit `PortfolioImage` object as above, or extend the `ImageKey` union, preparation source list and single image manifest deliberately.

`srcSet` is optional; keep its width descriptors accurate. `position` controls object cropping. Cards use their configured layout proportions, the hero uses a deliberate responsive crop and gallery images have fixed composition boxes. Check both thumbnails and dialogs. Provide multiple supporting views through `gallery` where available.

Asset paths are relative to `public/` and resolved through Vite's actual base. HTTPS external assets are supported but introduce external runtime requests and hotlink availability risks; local assets are preferable. Unsafe schemes, parent traversal and protocol-relative paths are rejected. Keep image credits/license records current in `ASSET_LICENSES.md` and `public/image-credits.html`. The optional regeneration script replaces the supplied demo imagery; it is not a general image CMS.

## 8. Services

Edit `content.services.items`: `number`, `name`, `description`, optional `detail`. The array controls both order and count. Each entry renders as a keyboard-operable native disclosure. `content.services.title`, `intro` and `eyebrow` control the surrounding copy. If an item has no supporting detail, its short description remains visible.

## 9. Creative process

Edit `content.process.steps`: each step has `title` and `description`. Step numbering is derived from order. The desktop layout is designed for the default five stages; review layout if the count changes substantially. On mobile the stages become editorial rows. Edit the section heading/intro through the adjacent fields.

## 10. Contact information and real email drafts

In `src/config/siteConfig.ts`:

```ts
demoMode: false,
contact: { mode: 'mailto', email: 'hello@your-real-domain.com' },
socials: [{ label: 'Instagram', url: 'https://www.instagram.com/your-real-account/' }],
```

Update `content.contact` for location text, invitation, labels, project types, subject and feedback. Only HTTPS social URLs without embedded credentials are rendered. The default has no pretend social accounts or invented business email.

The form requires a 2–80 character name, valid email, configured project type and 20–3,000 character project message. Validation focuses the first invalid input and associates error text. A valid client enquiry prepares an encoded `mailto:` link; the visitor then explicitly opens the email draft. No backend or delivery guarantee is implied. If no safe destination is configured, the page explains that nothing has been sent. `mode: 'disabled'` is the safe fallback.

For a form-service integration, replace the behavior in `src/components/Contact.tsx` after reviewing service privacy, delivery and error states. No integration or secret endpoint is included. Preserve honest pending/error states and only report success after a real service response. Review legal/privacy copy for the actual client separately.

## 11. Demo mode

Default `atelierConfig.demoMode` is true. Set false for a real client edition only after replacing business information. An optional `VITE_DEMO_MODE=true|false` build input overrides it. Empty or missing input preserves the configuration value.

The delivered Pages workflow explicitly builds the Atelier demonstration with `VITE_DEMO_MODE=true` and no disabled-section override. For an authorized real-client deployment, review those workflow build inputs as well as the local configuration; changing `.env.local` does not change GitHub Actions.

Global demo mode controls the hero/footer indicator and the form's preview behavior. Project `concept` flags are independent. Fictional concept content remains fictional even with the global marker hidden. There are no hidden bookings, checkout actions or simulated mail delivery.

## 12. Enable or disable sections

Set booleans in `atelierConfig.sections`: `hero`, `portfolio`, `about`, `services`, `process`, `contact`. Disabled sections are not rendered and leave no section spacer. Header and mobile links are filtered automatically. Hero's work link and studio's capabilities link disappear if their destination is disabled. Permanent `#home` and `#main` anchors remain valid; an accessible page heading is supplied when hero is disabled.

For a one-off build, `VITE_DISABLED_SECTIONS=about,process` disables those sections. Unknown flags are ignored. This input only disables sections; use the config to re-enable a section whose default is false. Navigation entries live in `content.nav` and must use a typed `SectionId`, so invalid target names fail type checking.

## 13. SEO and social preview

Edit `atelierConfig.seo` in `src/config/siteConfig.ts`: `title`, `description`, `ogTitle`, `ogDescription`, `image`, `canonical`, `favicon`. Set `canonical` to the exact absolute deployed homepage URL, for example `https://your-account.github.io/your-repository/`. Use your real address, not that placeholder.

Alternatively, set the public build input `VITE_SITE_URL` to the exact HTTPS homepage URL. It overrides the configured canonical, normalizes a trailing slash and rejects embedded credentials, query strings or fragments. The Pages workflow supplies it from the actual site's metadata; no placeholder origin is shipped by default. For manual builds, keep its pathname consistent with `VITE_BASE_PATH`.

For Cloudflare Pages, set `VITE_BASE_PATH=/` and use a stable root homepage URL in the Production environment. Leave the Preview URL unset with the default blank canonical. Temporary `CF_PAGES_URL` deployment addresses are deliberately not used as canonical metadata. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for environment scopes and custom domains.

`vite.config.ts` imports the same selected configuration and inserts escaped metadata into `index.html` during dev/build. It captures Vite's resolved base, including CLI overrides. This head does not depend on React running. The canonical URL supplies the origin for the local social preview path; without a canonical, `og:image` and `og:url` are deliberately omitted. A fully qualified HTTPS `seo.image` works independently.

Replace `public/images/social-preview.jpg` with a branded 1200×630 visual and retain relevant asset rights. The default is a screenshot of this demonstration. Project dialogs do not generate individual social metadata. The supplied static image credits page is separate content: update its generic credits/title if required.

## 14. Build and deploy your edition

1. Finish content, image rights, contact and canonical configuration.
2. Use ignored `.env.local` (copy `.env.example`) or build environment inputs for preset/demo/base/public URL. Never put a secret in `VITE_*`: those values are public. `VITE_SITE_PRESET=atelier` is the default. `VITE_SITE_PRESET=nord` selects the documented example in `src/config/examples/nord.ts`; no second application is created.
3. Run `npm run format:check`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run audit:publication` and `npm run build`.
4. For a Pages repository subpath, use `npm run build -- --base=/actual-repository/`. For a root/custom domain, use `/`. The `VITE_BASE_PATH` input is an alternative; CLI `--base` takes precedence.
5. Preview that build over HTTP and repeat keyboard/mobile/contact checks. In PowerShell, temporary inputs can be set with `$env:VITE_SITE_PRESET='nord'`, then removed after building with `Remove-Item Env:VITE_SITE_PRESET`.
6. Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for the primary Cloudflare Pages Git integration, root build and safe source-copy commands. The existing manual GitHub Pages alternative is documented in [PUBLISHING.md](PUBLISHING.md); it discovers root/nested source and validates its own subpath/canonical metadata. Both publish only `dist/`. Do not upload `node_modules`, `.env.local` or test screenshots as the public site.

Always inspect 320, 375, 768, 1024, 1440 and 1920px after replacing long copy, fonts or imagery. [DEPLOYMENT_QA.md](DEPLOYMENT_QA.md) records current final-preparation checks; `QA.md` preserves the earlier implementation snapshot. Neither report claims that a later customized edition has been tested.

The subsequent production cleanup and Cloudflare preparation are recorded in [PRODUCTION_RELEASE_REPORT.md](PRODUCTION_RELEASE_REPORT.md). Earlier plans and QA are dated history.
