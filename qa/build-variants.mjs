// Local QA utility. It restores the default source even if a fixture build fails.
// Run only when no dev server is using this checkout. No deployment occurs.
import { readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const configPath = path.join(root, 'src/config/siteConfig.ts')
const original = await readFile(configPath, 'utf8')
const fixture = "contact: { email: '', mode: 'disabled' }"
if (!original.includes(fixture)) throw new Error('Default contact configuration changed; inspect fixture before running.')
const vite = path.join(root, 'node_modules/vite/bin/vite.js')
const run = (name, preset, demo, disabled) => {
  execFileSync(process.execPath, [vite, 'build', '--base', `/${name}/`, '--outDir', `qa/variants/${name}`], {
    cwd: root, stdio: 'inherit', env: { ...process.env, VITE_SITE_PRESET: preset, VITE_DEMO_MODE: demo, VITE_DISABLED_SECTIONS: disabled },
  })
}
try {
  run('atelier', 'atelier', 'true', '')
  run('nord', 'nord', 'false', 'about,process')
  run('partial', 'atelier', 'true', 'portfolio,services')
  run('hidden', 'atelier', 'true', 'hero,portfolio,about,services,process,contact')
  await writeFile(configPath, original.replace(fixture, "contact: { email: 'studio@example.com', mode: 'mailto' }"))
  run('client', 'atelier', 'false', '')
} finally {
  await writeFile(configPath, original)
}
process.stdout.write('QA variants built. Default source restored.\n')
