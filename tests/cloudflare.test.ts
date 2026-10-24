import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveBuildSettings } from '../src/config/build.ts'
import { createSiteConfig } from '../src/config/presets.ts'
import { metadataHtml } from '../src/config/metadata.ts'

test('Cloudflare defaults to root assets and never invents a canonical from a preview URL', () => {
  const build = resolveBuildSettings({
    CF_PAGES: '1',
    CF_PAGES_URL: 'https://temporary-deployment.example',
  })
  assert.deepEqual(build, { base: '/', siteUrl: undefined })
  const html = metadataHtml(createSiteConfig({ siteUrl: build.siteUrl }), build.base)
  assert.ok(html.includes('href="/favicon.svg"'))
  assert.ok(!html.includes('rel="canonical"'))
  assert.ok(!html.includes('temporary-deployment'))
})

test('Cloudflare rejects repository paths that would break root-hosted assets or metadata', () => {
  for (const base of ['./', '/atelier-no8/', 'https://cdn.example/'])
    assert.throws(
      () => resolveBuildSettings({ CF_PAGES: '1', VITE_BASE_PATH: base }),
      /root domain/,
    )
  assert.throws(
    () =>
      resolveBuildSettings({
        CF_PAGES: '1',
        VITE_SITE_URL: 'https://portfolio.example/repository/',
      }),
    /without a subpath/,
  )
})

test('stable Cloudflare production metadata and existing portable/GitHub builds stay independent', () => {
  const production = resolveBuildSettings({
    CF_PAGES: '1',
    VITE_BASE_PATH: '/',
    VITE_SITE_URL: 'https://portfolio.example/',
  })
  const html = metadataHtml(createSiteConfig({ siteUrl: production.siteUrl }), production.base)
  assert.ok(html.includes('href="https://portfolio.example/"'))
  assert.ok(html.includes('content="https://portfolio.example/images/social-preview.jpg"'))
  assert.deepEqual(resolveBuildSettings({}), { base: './', siteUrl: undefined })
  assert.deepEqual(
    resolveBuildSettings({
      VITE_BASE_PATH: '/repository/',
      VITE_SITE_URL: 'https://maker.github.io/repository/',
    }),
    { base: '/repository/', siteUrl: 'https://maker.github.io/repository/' },
  )
})
