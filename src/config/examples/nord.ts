import { atelierConfig } from '../siteConfig.ts'
import { photo } from '../assets.ts'
import type { SiteConfig } from '../types.ts'

/** A fictional architecture adaptation of the same template. No separate application. */
export const nordConfig: SiteConfig = {
  ...atelierConfig,
  brand: {
    name: 'Nord Studio',
    shortName: 'N / S',
    wordmark: 'Nord',
    suffix: 'Studio',
    logo: '',
    tagline: 'Spaces for a slower life.',
  },
  theme: { ...atelierConfig.theme, accent: '#4f6454', inverse: '#293a32', background: '#f3f3eb' },
  seo: {
    ...atelierConfig.seo,
    title: 'Nord Studio — Spaces for a slower life.',
    description:
      'A fictional architecture and interiors studio. A configuration example of the Atelier portfolio template.',
    ogTitle: 'Nord Studio — Architecture & Interiors',
    ogDescription:
      'Considered spaces, natural materials and a quieter way of living. Fictional portfolio concepts.',
  },
  content: {
    ...atelierConfig.content,
    hero: {
      ...atelierConfig.content.hero,
      eyebrow: 'Architecture · Interiors · Objects',
      title: 'Considered spaces.',
      emphasis: 'A slower way of life.',
      intro:
        'An imagined architecture and interiors practice exploring the relationship between people, materials and the places we call home.',
    },
    about: {
      ...atelierConfig.content.about,
      title: 'Places that invite',
      emphasis: 'a different pace.',
      paragraphs: [
        'Nord Studio is a fictional architecture and interiors practice. This example shows how the same template adapts to a different discipline.',
        'Natural materials, a close reading of context and a simple palette guide our imagined approach to making spaces feel quietly at home.',
      ],
    },
    services: {
      ...atelierConfig.content.services,
      title: 'From place\nto possibility.',
      intro: 'Architecture, interiors and objects imagined as parts of one thoughtful whole.',
      items: [
        {
          number: '01',
          name: 'Architecture',
          description: 'Context-led concepts for contemporary living.',
          detail: 'Residential concepts · Spatial studies',
        },
        {
          number: '02',
          name: 'Interior Design',
          description: 'Spaces shaped around everyday rituals.',
          detail: 'Spatial planning · Material palettes',
        },
        {
          number: '03',
          name: 'Furniture & Objects',
          description: 'Useful forms with a distinct sense of place.',
          detail: 'Furniture concepts · Object studies',
        },
        {
          number: '04',
          name: 'Material Direction',
          description: 'A sensitive approach to colour and texture.',
          detail: 'Finishes · Material research',
        },
        {
          number: '05',
          name: 'Spatial Identity',
          description: 'A coherent point of view, at every scale.',
          detail: 'Hospitality concepts · Environmental direction',
        },
      ],
    },
    contact: {
      ...atelierConfig.content.contact,
      types: [
        'Architecture',
        'Interiors',
        'Furniture',
        'Materials',
        'Spatial identity',
        'Something else',
      ],
    },
  },
  projects: [
    {
      ...atelierConfig.projects[0],
      id: 'courtyard-house',
      title: 'Courtyard House',
      category: 'Architecture',
      description: 'A home arranged around a quiet centre.',
      brief: 'Imagine a private residence shaped by daylight and natural materials.',
      details: [
        'An architectural concept bringing communal spaces together around a sheltered courtyard. Licensed imagery communicates the intended mood.',
      ],
      thumbnail: photo('stillwater', 'Contemporary villa opening onto a reflective pool'),
      coverLabel: undefined,
    },
    {
      ...atelierConfig.projects[1],
      id: 'linen-residence',
      title: 'Linen Residence',
      category: 'Interiors',
      description: 'Warmth, texture and a little room to breathe.',
      brief: 'Explore a material-led approach to a compact living space.',
      details: [
        'A fictional interior concept in linen, oak and warm stone. Stock photography illustrates the palette.',
      ],
      thumbnail: photo('studio', 'Linen sofa and natural furniture in a warm interior'),
    },
    {
      ...atelierConfig.projects[4],
      id: 'object-studies',
      title: 'Object Studies',
      category: 'Objects',
      description: 'Sculptural forms for simple daily rituals.',
      brief: 'Explore a small collection of useful ceramic forms.',
      details: [
        'An imagined object collection exploring proportion, texture and stillness. Licensed stock imagery illustrates the direction.',
      ],
    },
  ],
}
