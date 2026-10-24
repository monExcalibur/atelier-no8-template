import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { atelierConfig } from '../src/config/siteConfig.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  cwd: root,
  encoding: 'utf8',
}).trim()
const relative = path.relative(gitRoot, root).replaceAll('\\', '/')
const paths = execFileSync(
  'git',
  [
    'ls-files',
    '--cached',
    '--others',
    '--exclude-standard',
    '-z',
    '--',
    relative || '.',
    '.github/workflows/deploy.yml',
  ],
  { cwd: gitRoot, encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean)
const findings = []
const rules = [
  ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ['github-token', /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,})\b/],
  ['aws-access-key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['service-secret', /\b(?:sk_live_[A-Za-z0-9]{16,}|sk-proj-[A-Za-z0-9_-]{20,})\b/],
  [
    'credential-assignment',
    /(?:api[_-]?(?:key|token)|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][A-Za-z0-9/+=_.-]{12,}["']/i,
  ],
]
let textFilesScanned = 0
for (const name of paths) {
  if (
    (/(?:^|\/)(?:\.env(?:\..+)?|\.dev\.vars(?:\..+)?|\.npmrc)$/.test(name) &&
      !name.endsWith('/.env.example') &&
      name !== '.env.example') ||
    /\.(?:pem|key|p12|pfx)$/i.test(name)
  )
    findings.push({ file: name, line: 0, rule: 'sensitive-file' })
  if (/\.(?:webp|png|jpg|jpeg|woff2|zip|ico)$/i.test(name)) continue
  const data = await readFile(path.join(gitRoot, name))
  if (data.includes(0)) continue
  textFilesScanned += 1
  for (const [index, line] of data.toString('utf8').split(/\r?\n/).entries()) {
    for (const [rule, pattern] of rules) {
      if (pattern.test(line)) findings.push({ file: name, line: index + 1, rule })
    }
  }
}
const images = [
  atelierConfig.content.hero.image,
  atelierConfig.content.about.image,
  ...atelierConfig.projects.flatMap((project) => [project.thumbnail, ...(project.gallery ?? [])]),
]
const required = new Set([
  atelierConfig.seo.favicon,
  atelierConfig.seo.image,
  atelierConfig.content.footer.creditsUrl,
])
for (const image of images) {
  required.add(image.src)
  for (const variant of image.srcSet ?? []) required.add(variant.src)
}
const missingAssets = []
for (const name of required) {
  if (name.startsWith('https://')) continue
  try {
    await readFile(path.join(root, 'public', name))
  } catch {
    missingAssets.push(name)
  }
}
const preservedFiles = {}
for (const directory of ['src/components', 'src/hooks', 'public/images', 'public/fonts']) {
  for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
    if (!entry.isFile()) continue
    const name = `${directory}/${entry.name}`
    preservedFiles[name] = createHash('sha256')
      .update(await readFile(path.join(root, name)))
      .digest('hex')
  }
}
for (const name of [
  'src/styles.css',
  'src/App.tsx',
  'src/config/content.ts',
  'src/config/projects.ts',
  'src/config/theme.ts',
]) {
  preservedFiles[name] = createHash('sha256')
    .update(await readFile(path.join(root, name)))
    .digest('hex')
}
const report = {
  scope: relative || '.',
  candidateFiles: paths.length,
  textFilesScanned,
  findings,
  missingAssets,
  assetsChecked: required.size,
  demo: {
    enabled: atelierConfig.demoMode,
    contactMode: atelierConfig.contact.mode,
    hasContactEmail: Boolean(atelierConfig.contact.email),
    socialLinks: atelierConfig.socials.length,
    conceptProjects: atelierConfig.projects.filter((project) => project.concept).length,
  },
  preservedFiles,
  limitations:
    'Pattern-based local source audit; findings never include secret values. Review staged files before any future publication.',
}
const output = process.argv[2] || 'qa/publication-audit.json'
if (!/^qa\/[a-z0-9-]+\.json$/.test(output))
  throw new Error('Audit output must be a named JSON file inside qa/.')
await mkdir(path.join(root, 'qa'), { recursive: true })
await writeFile(path.join(root, output), JSON.stringify(report, null, 2) + '\n')
process.stdout.write(
  JSON.stringify({
    candidateFiles: paths.length,
    textFilesScanned,
    secretFindings: findings.length,
    missingAssets,
    demo: report.demo,
    report: output,
  }) + '\n',
)
if (findings.length || missingAssets.length) process.exitCode = 1
