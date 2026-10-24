import { assetUrl, safeExternalUrl } from './assets.ts'
import type { SiteConfig } from './types.ts'

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
  )
}

export function metadataHtml(config: SiteConfig, base: string): string {
  const seo = config.seo
  const canonical = safeExternalUrl(seo.canonical)
  const localImage = assetUrl(seo.image, base)
  // Social crawlers require an absolute image URL. A canonical deployment URL supplies it.
  const image =
    safeExternalUrl(seo.image) ??
    (canonical && localImage
      ? new URL(
          seo.image.replace(/^\/+/, ''),
          canonical.endsWith('/') ? canonical : `${canonical}/`,
        ).href
      : undefined)
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(config.brand.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`,
    `<meta name="theme-color" content="${escapeHtml(config.theme.background)}" />`,
    `<link rel="icon" type="image/svg+xml" href="${escapeHtml(assetUrl(seo.favicon, base))}" />`,
    `<link rel="preload" href="${escapeHtml(assetUrl('fonts/display-regular.woff2', base))}" as="font" type="font/woff2" crossorigin />`,
    `<link rel="preload" href="${escapeHtml(assetUrl('fonts/body-regular.woff2', base))}" as="font" type="font/woff2" crossorigin />`,
  ]
  if (canonical)
    tags.push(
      `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
      `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    )
  if (image)
    tags.push(
      `<meta property="og:image" content="${escapeHtml(image)}" />`,
      `<meta property="og:image:alt" content="${escapeHtml(config.brand.tagline)}" />`,
    )
  return tags.join('\n    ')
}
