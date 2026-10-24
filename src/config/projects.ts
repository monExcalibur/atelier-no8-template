import { photo } from './assets.ts'
import type { Project } from './types.ts'

export const projects: Project[] = [
  {
    id: 'forma',
    title: 'Forma',
    category: 'Brand Identity',
    year: '2026',
    description: 'An identity shaped by the beauty of everyday living.',
    brief:
      'Imagine a furniture label where considered form and everyday comfort share equal importance.',
    details: [
      'The concept pairs sculptural typography with a restrained palette borrowed from oak, linen and brushed metal. A flexible wordmark system gives product stories room to breathe.',
      'From a material-led lookbook to quiet digital compositions, each touchpoint explores the balance between useful objects and an expressive point of view.',
    ],
    thumbnail: photo('forma', 'Sculptural wire chair on a warm beige carpet'),
    gallery: [photo('studio', 'Linen sofa and woven stools in a softly lit interior')],
    tags: ['Strategy', 'Visual identity', 'Art direction'],
    concept: true,
    layout: 'landscape',
    coverLabel: 'forma',
  },
  {
    id: 'solstice',
    title: 'Solstice',
    category: 'Photography',
    year: '2026',
    description: 'A study of light, silence and the passing of time.',
    brief:
      'Develop an editorial direction for a photographic journal about the shapes that light leaves behind.',
    details: [
      'Warm dunes and deep shadows set the visual rhythm. Generous margins, subtle folios and an unhurried sequence turn a landscape study into a tactile editorial concept.',
      'The imagery is licensed stock photography, selected to illustrate the direction. This is a fictional publication concept, not a claim of original photography.',
    ],
    thumbnail: photo('solstice', 'Orange Sossusvlei dunes with long, sculptural shadows'),
    gallery: [photo('light', 'Geometric sunlight and shadows across a quiet interior')],
    tags: ['Editorial direction', 'Image curation', 'Layout'],
    concept: true,
    layout: 'portrait',
  },
  {
    id: 'maison-elan',
    title: 'Maison Élan',
    category: 'Brand Identity',
    year: '2025',
    description: 'A warm, expressive world for a considered lifestyle.',
    brief:
      'Create a visual language for an imagined collection of thoughtfully made objects for the home.',
    details: [
      'An expressive serif meets small, precise typography. Ochre, clay and warm white form a palette that feels collected rather than decorated.',
      'A seasonal journal, stationery and an art-directed online presence build a coherent world around simple rituals and tactile materials.',
    ],
    thumbnail: photo(
      'maison',
      'White flower and geometric ceramic forms against an ochre backdrop',
    ),
    gallery: [photo('objects', 'White ceramic vessels arranged on a textured neutral surface')],
    tags: ['Positioning', 'Identity', 'Editorial'],
    concept: true,
    layout: 'portrait',
    coverLabel: 'MAISON ÉLAN',
  },
  {
    id: 'stillwater',
    title: 'Stillwater',
    category: 'Art Direction',
    year: '2025',
    description: 'A quiet identity for a place to slow down.',
    brief:
      'Imagine a boutique retreat with an identity as calm and considered as the space itself.',
    details: [
      'A spacious wordmark, mineral tones and a simple wave motif suggest a slower pace. Architectural imagery anchors the concept in light, water and natural materials.',
      'The identity extends to printed guest notes, an editorial room guide and a welcoming digital experience. The retreat and commission are fictional.',
    ],
    thumbnail: photo(
      'stillwater',
      'Minimal contemporary villa with a reflective pool and natural materials',
    ),
    gallery: [photo('light', 'Sunlight tracing architectural details in a minimalist interior')],
    tags: ['Hospitality', 'Identity', 'Digital direction'],
    concept: true,
    layout: 'landscape',
  },
  {
    id: 'objects-space',
    title: 'Objects & Space',
    category: 'Art Direction',
    year: '2025',
    description: 'Ordinary objects, seen with a different perspective.',
    brief:
      'Build a still-life art direction concept around the dialogue between sculptural objects and negative space.',
    details: [
      'Ceramic silhouettes and gently changing tones create a visual conversation. Cropping, scale and texture become the tools of a restrained but expressive composition.',
      'This study explores a gallery catalogue, campaign layouts and a simple editorial microsite, using licensed images to communicate the intended mood.',
    ],
    thumbnail: photo(
      'objects',
      'Minimal still life of white ceramic vessels on a softly textured background',
    ),
    gallery: [photo('maison', 'Geometric still life with a single white flower')],
    tags: ['Still life', 'Curation', 'Composition'],
    concept: true,
    layout: 'landscape',
  },
  {
    id: 'vela',
    title: 'Vela',
    category: 'Packaging',
    year: '2026',
    description: 'An elemental approach to everyday care.',
    brief:
      'Explore an understated packaging direction for an imagined contemporary skincare brand.',
    details: [
      'Amber glass, botanical references and clear typographic hierarchy create a grounded visual direction. The concept values legibility and a simple, repeatable packaging system.',
      'The bottle photograph is a licensed styling reference. Printed packaging, product formulations and a real commercial launch are outside this demonstration.',
    ],
    thumbnail: photo(
      'vela',
      'Amber glass bottle with a blank label, styled with botanical elements',
    ),
    gallery: [photo('objects', 'Quiet arrangement of white ceramic vessels')],
    tags: ['Packaging direction', 'Identity', 'Product styling'],
    concept: true,
    layout: 'square',
    coverLabel: 'vela',
  },
]
