import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { atelierConfig } from '../src/config/siteConfig.ts'
import { nordConfig } from '../src/config/examples/nord.ts'
import { createSiteConfig } from '../src/config/presets.ts'
import { assetUrl, safeExternalUrl } from '../src/config/assets.ts'
import {
  applySectionFlags,
  contactDraft,
  sectionTarget,
  validContactEmail,
  validateEnquiry,
  validateProjects,
  visibleNavigation,
} from '../src/config/helpers.ts'
import { metadataHtml } from '../src/config/metadata.ts'
import { themeCss } from '../src/config/theme.ts'

const valid = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  projectType: 'Brand identity',
  message: 'A considered identity for a new independent furniture studio.',
}
const client = {
  ...atelierConfig,
  demoMode: false,
  contact: { mode: 'mailto' as const, email: 'studio@example.com' },
}

test('six complete fictional projects use existing local imagery and accurate dimensions', () => {
  validateProjects(atelierConfig)
  assert.equal(atelierConfig.projects.length, 6)
  for (const project of atelierConfig.projects) {
    assert.equal(project.concept, true)
    for (const image of [project.thumbnail, ...(project.gallery ?? [])]) {
      assert.ok(image.alt.length > 15)
      for (const variant of image.srcSet ?? [])
        assert.ok(existsSync(new URL(`../public/${variant.src}`, import.meta.url)))
      assert.ok(image.width > 0 && image.height > 0)
    }
  }
})
test('visible navigation and dependent CTAs omit disabled sections', () => {
  const config = applySectionFlags(atelierConfig, 'portfolio,services,contact')
  assert.deepEqual(
    visibleNavigation(config).map((item) => item.section),
    ['about'],
  )
  assert.equal(sectionTarget(config, 'portfolio'), undefined)
  assert.equal(sectionTarget(config, 'services'), undefined)
  assert.equal(sectionTarget(config, 'about'), '#about')
})
test('all sections can be disabled without mutating the source; unknown flags are ignored', () => {
  const config = applySectionFlags(
    atelierConfig,
    'hero, portfolio,about,services,process,contact,invalid',
  )
  assert.equal(visibleNavigation(config).length, 0)
  assert.equal(Object.values(config.sections).some(Boolean), false)
  assert.equal(atelierConfig.sections.hero, true)
})
test('Nord is a different typed configuration of the same template', () => {
  const nord = createSiteConfig({ preset: 'nord', demoMode: 'false', disabledSections: 'process' })
  assert.equal(nord.brand.name, 'Nord Studio')
  assert.equal(nord.demoMode, false)
  assert.equal(nord.sections.process, false)
  assert.notEqual(nord.theme.accent, atelierConfig.theme.accent)
  assert.notEqual(nord.content.services.items[0].name, atelierConfig.content.services.items[0].name)
  validateProjects(nordConfig)
  assert.equal(atelierConfig.demoMode, true)
})
test('adding, removing and reordering projects needs no component changes', () => {
  const replacement = {
    ...atelierConfig.projects[0],
    id: 'new-commission',
    title: 'New Commission',
    concept: false,
  }
  const config = {
    ...atelierConfig,
    projects: [replacement, ...atelierConfig.projects.slice(1, 3).reverse()],
  }
  validateProjects(config)
  assert.deepEqual(
    config.projects.map((project) => project.id),
    ['new-commission', 'maison-elan', 'solstice'],
  )
})
test('duplicate and unsafe project IDs fail early', () => {
  assert.throws(
    () =>
      validateProjects({
        ...atelierConfig,
        projects: [atelierConfig.projects[0], atelierConfig.projects[0]],
      }),
    /duplicate/,
  )
  assert.throws(
    () =>
      validateProjects({
        ...atelierConfig,
        projects: [{ ...atelierConfig.projects[0], id: 'Bad ID' }],
      }),
    /Invalid/,
  )
})
test('contact validation catches every required field and enforces length/category limits', () => {
  assert.equal(
    Object.keys(
      validateEnquiry({ name: '', email: 'invalid', projectType: '', message: '' }, atelierConfig),
    ).length,
    4,
  )
  assert.deepEqual(validateEnquiry(valid, atelierConfig), {})
  assert.equal(
    Object.keys(
      validateEnquiry(
        { ...valid, name: 'x'.repeat(81), projectType: 'Injected', message: 'x'.repeat(3001) },
        atelierConfig,
      ),
    ).length,
    3,
  )
})
test('demo, disabled or unconfigured contact never produces a mail draft', () => {
  assert.equal(contactDraft({ ...client, demoMode: true }, valid), undefined)
  assert.equal(contactDraft(atelierConfig, valid), undefined)
  assert.equal(
    contactDraft({ ...client, contact: { mode: 'disabled', email: 'hello@example.com' } }, valid),
    undefined,
  )
  assert.equal(
    contactDraft({ ...client, contact: { mode: 'mailto', email: '' } }, valid),
    undefined,
  )
})
test('mailto draft encodes enquiry content and does not add extra recipients or headers', () => {
  const draft = contactDraft(client, {
    ...valid,
    message: 'Hello & thanks?\nProject idea: calm, considered and useful.',
  })!
  const url = new URL(draft)
  assert.equal(url.pathname, 'studio@example.com')
  assert.deepEqual([...url.searchParams.keys()], ['subject', 'body'])
  assert.ok(url.searchParams.get('body')?.includes('Hello & thanks?\nProject idea'))
  assert.equal(contactDraft(client, { ...valid, email: 'bad' }), undefined)
  for (const email of ['a@b.com?bcc=x@y.com', 'a@b.com\r\nBcc:x@y.com', 'a%0abcc@b.com'])
    assert.equal(validContactEmail(email), false)
})
test('unsafe assets and external URLs are rejected; local paths respect repository base', () => {
  assert.equal(assetUrl('images/a.webp', '/portfolio/'), '/portfolio/images/a.webp')
  assert.equal(assetUrl('/images/a.webp', './'), './images/a.webp')
  for (const path of ['javascript:alert(1)', '//evil.test/a', '../secret', 'images/\u0000bad'])
    assert.equal(assetUrl(path), '')
  assert.equal(safeExternalUrl('javascript:alert(1)'), undefined)
  assert.equal(safeExternalUrl('https://user:password@example.com'), undefined)
  assert.equal(safeExternalUrl('https://example.com/work'), 'https://example.com/work')
})
test('static metadata escapes configurable text and uses the resolved build base', () => {
  const html = metadataHtml(
    { ...atelierConfig, seo: { ...atelierConfig.seo, title: '<script>"&' } },
    '/repo/',
  )
  assert.ok(html.includes('&lt;script&gt;&quot;&amp;'))
  assert.ok(html.includes('href="/repo/favicon.svg"'))
  assert.ok(!html.includes('<script>'))
  assert.ok(!html.includes('property="og:image"'))
})
test('a configured canonical deployment emits absolute Open Graph image and URL', () => {
  const html = metadataHtml(
    {
      ...atelierConfig,
      seo: { ...atelierConfig.seo, canonical: 'https://studio.example/portfolio/' },
    },
    '/portfolio/',
  )
  assert.ok(html.includes('https://studio.example/portfolio/images/social-preview.jpg'))
  assert.ok(html.includes('property="og:url"'))
})
test('theme values become centralized tokens and reject style-tag injection', () => {
  assert.ok(themeCss({ ...atelierConfig.theme, accent: '#123456' }).includes('--accent:#123456'))
  assert.throws(() => themeCss({ ...atelierConfig.theme, accent: '</style><script>' }), /Unsafe/)
})
test('reduced-motion disables reveal/hover motion and font licenses ship locally', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
  const hook = readFileSync(new URL('../src/hooks/useReveal.ts', import.meta.url), 'utf8')
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'))
  assert.ok(hook.includes('media.matches'))
  for (const file of ['cormorant-garamond-LICENSE.txt', 'dm-sans-LICENSE.txt'])
    assert.ok(existsSync(new URL(`../public/fonts/${file}`, import.meta.url)))
})
