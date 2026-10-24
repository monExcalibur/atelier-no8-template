import { atelierConfig } from './siteConfig.ts'
import { nordConfig } from './examples/nord.ts'
import { applySectionFlags, validateProjects } from './helpers.ts'

export function createSiteConfig(
  options: { preset?: string; demoMode?: string; disabledSections?: string; siteUrl?: string } = {},
) {
  const source = options.preset === 'nord' ? nordConfig : atelierConfig
  const config = applySectionFlags(
    {
      ...source,
      demoMode:
        options.demoMode === 'false' ? false : options.demoMode === 'true' ? true : source.demoMode,
    },
    options.disabledSections,
  )
  validateProjects(config)
  if (options.siteUrl?.trim()) {
    const value = options.siteUrl.trim()
    const url = new URL(value)
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      /\s/.test(value)
    )
      throw new Error(
        'VITE_SITE_URL must be an absolute HTTPS URL without credentials, query or fragment.',
      )
    return {
      ...config,
      seo: { ...config.seo, canonical: url.href.endsWith('/') ? url.href : `${url.href}/` },
    }
  }
  return config
}
