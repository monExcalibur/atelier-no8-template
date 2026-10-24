import type { ImageKey, PortfolioImage } from './types.ts'
import manifest from './imageManifest.json' with { type: 'json' }

export function photo(key: ImageKey, alt: string, position = '50% 50%'): PortfolioImage {
  const entry = manifest.find((image) => image.name === key)
  const standard = entry?.variants.find((variant) => variant.width === 1200)
  if (!entry || !standard) throw new Error(`Missing 1200px image manifest entry: ${key}`)
  return {
    src: `images/${key}-1200.webp`,
    alt,
    width: standard.width,
    height: standard.height,
    position,
    srcSet: [640, 1200, 1800].map((width) => ({ src: `images/${key}-${width}.webp`, width })),
  }
}

/** Local paths are relative to public/. External assets must use HTTPS. */
export function assetUrl(path: string, base = './'): string {
  if (
    !path ||
    /[<>"]/.test(path) ||
    Array.from(path).some((character) => character.charCodeAt(0) < 32)
  )
    return ''
  if (/^https:\/\//i.test(path)) return path
  if (
    /^[a-z][a-z\d+.-]*:/i.test(path) ||
    path.startsWith('//') ||
    path.includes('..') ||
    path.includes('\\')
  )
    return ''
  return `${base.endsWith('/') ? base : `${base}/`}${path.replace(/^\/+/, '')}`
}

export function safeExternalUrl(value: string): string | undefined {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined
  } catch {
    return undefined
  }
}
