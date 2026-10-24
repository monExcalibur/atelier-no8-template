export const sectionIds = ['hero', 'portfolio', 'about', 'services', 'process', 'contact'] as const
export type SectionId = (typeof sectionIds)[number]
export type ImageKey =
  'studio' | 'forma' | 'solstice' | 'maison' | 'stillwater' | 'objects' | 'vela' | 'light'
export interface PortfolioImage {
  src: string
  alt: string
  width: number
  height: number
  srcSet?: { src: string; width: number }[]
  position?: string
}
export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  brief: string
  details: string[]
  thumbnail: PortfolioImage
  gallery?: PortfolioImage[]
  tags?: string[]
  concept: boolean
  layout: 'landscape' | 'portrait' | 'square'
  coverLabel?: string
}
export interface Theme {
  background: string
  backgroundSecondary: string
  text: string
  muted: string
  accent: string
  border: string
  surface: string
  inverse: string
  inverseText: string
  displayFont: string
  bodyFont: string
  radius: string
}
export interface Content {
  nav: { section: SectionId; label: string }[]
  ui: {
    skip: string
    openMenu: string
    closeMenu: string
    navigation: string
    home: string
    demo: string
    demoShort: string
    viewProject: string
    closeProject: string
    backToWork: string
    brief: string
    approach: string
    scope: string
    concept: string
    imageryNote: string
    section: string
    top: string
    year: string
  }
  hero: {
    eyebrow: string
    title: string
    emphasis: string
    intro: string
    cta: string
    note: string
    image: PortfolioImage
    imageCaption: string
    imageIndex: string
    seal: string
  }
  portfolio: {
    eyebrow: string
    title: string
    intro: string
    all: string
    categories: string[]
    note: string
  }
  about: {
    eyebrow: string
    title: string
    emphasis: string
    paragraphs: string[]
    cta: string
    image: PortfolioImage
    caption: string
    detail: string
  }
  services: {
    eyebrow: string
    title: string
    intro: string
    items: { name: string; number: string; description: string; detail?: string }[]
  }
  process: {
    eyebrow: string
    title: string
    intro: string
    steps: { title: string; description: string }[]
  }
  contact: {
    eyebrow: string
    title: string
    emphasis: string
    intro: string
    emailLabel: string
    emailFallback: string
    locationLabel: string
    location: string
    name: string
    email: string
    projectType: string
    choose: string
    types: string[]
    message: string
    messagePlaceholder: string
    submitDemo: string
    submitLive: string
    demoNote: string
    mailtoNote: string
    unavailable: string
    validationIntro: string
    errors: { name: string; email: string; projectType: string; message: string }
    demoFeedback: string
    draftFeedback: string
    draftLink: string
    privacy: string
    subject: string
  }
  footer: { note: string; copyright: string; credits: string; creditsUrl: string }
}
export interface SiteConfig {
  brand: {
    name: string
    shortName: string
    wordmark: string
    suffix: string
    logo: string
    tagline: string
  }
  demoMode: boolean
  contact: { email: string; mode: 'disabled' | 'mailto' }
  socials: { label: string; url: string }[]
  sections: Record<SectionId, boolean>
  seo: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    image: string
    canonical: string
    favicon: string
  }
  theme: Theme
  content: Content
  projects: Project[]
}
