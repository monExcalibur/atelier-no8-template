import type { Theme } from './types.ts'

export const theme: Theme = {
  background: '#f7f5ef',
  backgroundSecondary: '#eeebe3',
  text: '#292a25',
  muted: '#68685e',
  accent: '#79533d',
  border: '#d2cec3',
  surface: '#e3dfd4',
  inverse: '#30362d',
  inverseText: '#f7f5ef',
  displayFont: '"Cormorant Garamond", Georgia, serif',
  bodyFont: '"DM Sans", Arial, sans-serif',
  radius: '0px',
}

const tokens: Record<keyof Theme, string> = {
  background: 'paper',
  backgroundSecondary: 'paper-deep',
  text: 'ink',
  muted: 'muted',
  accent: 'accent',
  border: 'line',
  surface: 'surface',
  inverse: 'forest',
  inverseText: 'on-forest',
  displayFont: 'font-display',
  bodyFont: 'font-body',
  radius: 'radius',
}

export function themeCss(value: Theme): string {
  return `:root{${(Object.keys(tokens) as (keyof Theme)[])
    .map((key) => {
      if (/[{};<>]/.test(value[key])) throw new Error(`Unsafe theme value: ${key}`)
      return `--${tokens[key]}:${value[key]}`
    })
    .join(';')}}`
}
