import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createSiteConfig } from './src/config/presets.ts'
import { metadataHtml } from './src/config/metadata.ts'
import { themeCss } from './src/config/theme.ts'
import { resolveBuildSettings } from './src/config/build.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const buildEnv = { ...process.env, ...env }
  const deployment = resolveBuildSettings(buildEnv)
  const site = createSiteConfig({
    preset: env.VITE_SITE_PRESET,
    demoMode: env.VITE_DEMO_MODE,
    disabledSections: env.VITE_DISABLED_SECTIONS,
    siteUrl: deployment.siteUrl,
  })
  let base = deployment.base
  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-static-head',
        configResolved(config) {
          resolveBuildSettings({ ...buildEnv, VITE_BASE_PATH: config.base })
          base = config.base
        },
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html.replace(
              '<!-- template:head -->',
              `${metadataHtml(site, base)}\n<style id="template-theme">${themeCss(site.theme)}</style>`,
            )
          },
        },
      },
    ],
    server: { port: 4194, strictPort: true },
    preview: { port: 4194, strictPort: true },
  }
})
