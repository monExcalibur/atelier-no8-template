import { content } from './content.ts'
import { projects } from './projects.ts'
import { theme } from './theme.ts'
import type { SiteConfig } from './types.ts'

export const atelierConfig: SiteConfig = {
  brand: {
    name: 'Atelier No. 8',
    shortName: 'A / 08',
    wordmark: 'Atelier',
    suffix: 'No. 8',
    logo: '',
    tagline: 'Thoughtful design. Lasting impressions.',
  },
  demoMode: true,
  contact: { email: '', mode: 'disabled' },
  socials: [],
  sections: {
    hero: true,
    portfolio: true,
    about: true,
    services: true,
    process: true,
    contact: true,
  },
  seo: {
    title: 'Atelier No. 8 — Thoughtful design. Lasting impressions.',
    description:
      'A fictional independent creative studio. Explore a considered portfolio of branding, art direction, editorial design and digital experiences.',
    ogTitle: 'Atelier No. 8 — A considered point of view',
    ogDescription:
      'A premium creative portfolio template. Fictional concepts in identity, imagery and experience.',
    image: 'images/social-preview.jpg',
    canonical: '',
    favicon: 'favicon.svg',
  },
  theme,
  content,
  projects,
}
