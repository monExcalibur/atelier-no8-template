import { mkdir, writeFile, copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = fileURLToPath(new URL('../', import.meta.url))
const images = [
  ['studio', '30243611'],
  ['forma', '30650073'],
  ['solstice', '18446922'],
  ['maison', '7828310'],
  ['stillwater', '5563472'],
  ['objects', '34589778'],
  ['vela', '11441227'],
  ['light', '33825710'],
]
await mkdir(path.join(root, 'public/images'), { recursive: true })
await mkdir(path.join(root, 'public/fonts'), { recursive: true })
const records = []
for (const [name, id] of images) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`)
  const source = Buffer.from(await response.arrayBuffer())
  const variants = []
  for (const width of [640, 1200, 1800]) {
    const { data, info } = await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toBuffer({ resolveWithObject: true })
    await writeFile(path.join(root, `public/images/${name}-${width}.webp`), data)
    variants.push({ width: info.width, height: info.height, bytes: data.length })
  }
  records.push({ name, id, download: url, variants })
  process.stdout.write(
    `${name}: ${variants.map((item) => `${item.width}w ${Math.round(item.bytes / 1024)}KB`).join(', ')}\n`,
  )
}
await writeFile(
  path.join(root, 'src/config/imageManifest.json'),
  JSON.stringify(records, null, 2) + '\n',
)
for (const [pkg, file, target] of [
  ['cormorant-garamond', 'cormorant-garamond-latin-400-normal.woff2', 'display-regular.woff2'],
  ['cormorant-garamond', 'cormorant-garamond-latin-400-italic.woff2', 'display-italic.woff2'],
  ['dm-sans', 'dm-sans-latin-400-normal.woff2', 'body-regular.woff2'],
  ['dm-sans', 'dm-sans-latin-500-normal.woff2', 'body-medium.woff2'],
]) {
  await copyFile(
    path.join(root, `node_modules/@fontsource/${pkg}/files/${file}`),
    path.join(root, `public/fonts/${target}`),
  )
}
for (const pkg of ['cormorant-garamond', 'dm-sans']) {
  await copyFile(
    path.join(root, `node_modules/@fontsource/${pkg}/LICENSE`),
    path.join(root, `public/fonts/${pkg}-LICENSE.txt`),
  )
}
process.stdout.write('Local font files and OFL licenses copied.\n')
