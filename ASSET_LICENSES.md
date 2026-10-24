# Asset sources and usage

Verified 2026-10-23. All photographs are downloaded locally from Pexels, with WebP variants at 640, 1200 and 1800 pixels wide. The implementation does not hotlink or call a photo API at runtime.

The [Pexels license](https://www.pexels.com/license/) permits website and template use, modification and free downloading. Its restrictions still apply: do not imply endorsement, use imagery as a trademark, sell unaltered photo copies or redistribute as a competing stock library. Photography is licensed separately from the application source. Recheck the original terms when redistributing a commercial edition.

| Local image prefix | Photographer | Original source | Use |
| --- | --- | --- | --- |
| `public/images/studio-*` | Cemrecan Yurtman | [Cozy Minimalist Interior with Beige Sofa, 30243611](https://www.pexels.com/photo/cozy-minimalist-interior-with-beige-sofa-30243611/) | Hero, Forma supporting visual |
| `public/images/forma-*` | Alina Skazka | [Minimalist Wire Chair on Beige Carpet, 30650073](https://www.pexels.com/photo/minimalist-wire-chair-on-beige-carpet-30650073/) | Forma |
| `public/images/solstice-*` | Xavier Mallet | [Orange Sand Dunes in a Desert, 18446922](https://www.pexels.com/photo/orange-sand-dunes-in-a-desert-18446922/) | Solstice |
| `public/images/maison-*` | Mikhail Nilov | [White Flower on White Ceramic Vase, 7828310](https://www.pexels.com/photo/white-flower-on-white-ceramic-vase-7828310/) | Maison Élan, Objects & Space supporting visual |
| `public/images/stillwater-*` | Jonathan Borba | [Contemporary resort building with minimalistic design, 5563472](https://www.pexels.com/photo/contemporary-resort-building-with-minimalistic-design-5563472/) | Stillwater, Nord example |
| `public/images/objects-*` | Valentin Ivantsov | [Minimalist Still Life with Ceramic Objects, 34589778](https://www.pexels.com/photo/minimalist-still-life-with-ceramic-objects-34589778/) | Objects & Space, supporting visuals |
| `public/images/vela-*` | Andrzej Gdula | [Bottle with Blank Label, 11441227](https://www.pexels.com/photo/bottle-with-blank-label-11441227/) | Vela styling reference |
| `public/images/light-*` | Mohamed B. | [Sunlit Minimalist Interior with Shadows, 33825710](https://www.pexels.com/photo/sunlit-minimalist-interior-with-shadows-33825710/) | Studio, supporting visuals |

`src/config/imageManifest.json` records exact downloaded URLs, output dimensions and byte sizes. It is the single source used by the template; a redundant public copy is no longer shipped. `npm run assets:prepare` recreates photographs and font copies; it needs network access. Build and runtime do not. It resizes/re-encodes without adding marks, changing identity or erasing existing branding.

The six named projects and both studio brands are fictional creative concepts. Their stock imagery is credited as illustration of a direction, never represented as photography or commissions created by this studio. Do not use these studies to claim real client relationships. `concept: true` preserves project disclosures even if the global demo indicator is disabled.

## Fonts

- Cormorant Garamond, regular and italic 400, local Latin WOFF2. [Official Google Fonts source](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond). Distributed through `@fontsource/cormorant-garamond@5.3.0` under SIL OFL 1.1. Full license: `public/fonts/cormorant-garamond-LICENSE.txt`.
- DM Sans, regular 400 and medium 500, local Latin WOFF2. [Official Google Fonts source](https://github.com/google/fonts/tree/main/ofl/dmsans). Distributed through `@fontsource/dm-sans@5.3.0` under SIL OFL 1.1. Full license: `public/fonts/dm-sans-LICENSE.txt`.
- Default fonts cover the English demo. Add licensed language subsets if adapting to other writing systems.

## Other assets

The favicon, studio sun mark and typographic overlay compositions are code-authored for this template. Lucide icons use ISC plus the included Feather-derived MIT notice. The complete unmodified package notice is shipped in `public/licenses/lucide-LICENSE.txt`. React, React DOM and Scheduler share the MIT notice shipped in `public/licenses/react-MIT.txt`; these copies are retained in the static build, independently of ignored node_modules. Font notices remain in `public/fonts/`.

The social preview is a local screenshot of the implemented template and includes credited Pexels imagery. Keep these photography terms with exported previews. Third-party notices do not specify a license for the application source itself.
