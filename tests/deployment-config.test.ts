import test from 'node:test'
import assert from 'node:assert/strict'
import { createSiteConfig } from '../src/config/presets.ts'
import { metadataHtml } from '../src/config/metadata.ts'

test('a public build URL supplies static canonical and absolute Open Graph metadata without changing demo content', () => {
  const config = createSiteConfig({ siteUrl: 'https://maker.github.io/atelier-no8' })
  assert.equal(config.seo.canonical, 'https://maker.github.io/atelier-no8/')
  assert.equal(config.demoMode, true)
  assert.equal(config.projects.length, 6)
  assert.ok(
    metadataHtml(config, '/atelier-no8/').includes(
      'https://maker.github.io/atelier-no8/images/social-preview.jpg',
    ),
  )
})
test('unconfigured public origin stays blank; unsafe public URL overrides fail', () => {
  assert.equal(createSiteConfig().seo.canonical, '')
  for (const siteUrl of [
    'http://studio.example',
    'https://user:password@studio.example',
    'https://studio.example?token=x',
    'https://studio.example/#fragment',
  ])
    assert.throws(() => createSiteConfig({ siteUrl }))
})
