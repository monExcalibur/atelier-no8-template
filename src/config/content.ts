import { photo } from './assets.ts'
import type { Content } from './types.ts'

export const content: Content = {
  nav: [
    { section: 'portfolio', label: 'Work' },
    { section: 'about', label: 'Studio' },
    { section: 'services', label: 'Services' },
    { section: 'contact', label: 'Contact' },
  ],
  ui: {
    skip: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    navigation: 'Main navigation',
    home: 'Back to home',
    demo: 'Independent studio · Demo template',
    demoShort: 'Demo template',
    viewProject: 'View project',
    closeProject: 'Close project',
    backToWork: 'Back to selected work',
    brief: 'The brief',
    approach: 'The approach',
    scope: 'Project scope',
    concept: 'Concept project',
    imageryNote:
      'Fictional concept. Licensed stock imagery illustrates the creative direction; it is not commissioned client work.',
    section: 'Section',
    top: 'Back to top',
    year: 'Year',
  },
  hero: {
    eyebrow: 'Creative direction · Branding · Digital',
    title: 'Thoughtful design.',
    emphasis: 'Lasting impressions.',
    intro:
      'We create distinctive visual identities and meaningful digital experiences for brands that value thoughtful design.',
    cta: 'Selected work',
    note: 'A considered approach.\nA distinctive point of view.',
    image: photo(
      'studio',
      'Warm minimalist interior with a linen sofa, woven stools and natural textures',
      '50% 54%',
    ),
    imageCaption: 'The beauty of a considered space.',
    imageIndex: 'FIG. 01',
    seal: 'Made with intention',
  },
  portfolio: {
    eyebrow: '01 — Selected work',
    title: 'A few things,\nthoughtfully made.',
    intro:
      'An exploration of identity, imagery and experience. Each project begins with a different question.',
    all: 'All work',
    categories: ['Brand Identity', 'Art Direction', 'Photography', 'Packaging'],
    note: 'A collection of fictional concepts. Stock imagery is used for illustrative purposes.',
  },
  about: {
    eyebrow: '02 — The studio',
    title: 'Good design begins',
    emphasis: 'with a little curiosity.',
    paragraphs: [
      'Atelier No. 8 is an imagined independent creative studio at the intersection of strategy, design and culture.',
      'We believe the most meaningful work comes from looking closer. Finding the small detail, the unexpected connection, the honest story that makes a brand its own.',
      'Our approach is collaborative and considered, balancing a clear point of view with an open mind. Less noise. More meaning.',
    ],
    cta: 'Our capabilities',
    image: photo(
      'light',
      'Natural light casting geometric shadows across a textured architectural interior',
    ),
    caption: 'Finding possibility in the everyday.',
    detail: 'Perspective / Material / Meaning',
  },
  services: {
    eyebrow: '03 — What we do',
    title: 'From a first idea\nto a lasting identity.',
    intro:
      'A considered set of capabilities. Connected by a belief that every detail should belong to the same story.',
    items: [
      {
        number: '01',
        name: 'Brand Identity',
        description: 'Distinctive identities with clarity at their core.',
        detail: 'Positioning · Visual systems · Brand guidelines',
      },
      {
        number: '02',
        name: 'Art Direction',
        description: 'A coherent visual world, from concept to composition.',
        detail: 'Creative concepts · Image direction · Campaign systems',
      },
      {
        number: '03',
        name: 'Editorial Design',
        description: 'Stories given rhythm through type, image and space.',
        detail: 'Publications · Lookbooks · Print collateral',
      },
      {
        number: '04',
        name: 'Photography',
        description: 'A thoughtful lens on objects, spaces and everyday rituals.',
        detail: 'Concept development · Shoot direction · Image selection',
      },
      {
        number: '05',
        name: 'Digital Experiences',
        description: 'Intuitive places for brands to tell their stories.',
        detail: 'Web design · Interaction design · Creative development',
      },
    ],
  },
  process: {
    eyebrow: '04 — How we work',
    title: 'Considered at\nevery step.',
    intro:
      'A clear process leaves room for discovery. Here is how a conversation becomes something tangible.',
    steps: [
      {
        title: 'Discover',
        description: 'Listen closely. Understand the context, the people and the possibility.',
      },
      {
        title: 'Define',
        description: 'Find the central idea. Give the project a clear and purposeful direction.',
      },
      {
        title: 'Create',
        description: 'Explore freely. Translate strategy into a distinctive visual language.',
      },
      {
        title: 'Refine',
        description: 'Look closer. Test, question and shape every detail together.',
      },
      {
        title: 'Deliver',
        description: 'Bring it to life. Build a thoughtful system, ready for the next chapter.',
      },
    ],
  },
  contact: {
    eyebrow: '05 — Start a conversation',
    title: 'Something in mind?',
    emphasis: 'Let’s make it matter.',
    intro:
      'A new idea, a fresh perspective, or a project waiting to take shape. We would love to hear about it.',
    emailLabel: 'A note to the studio',
    emailFallback: 'Contact details available in a client edition.',
    locationLabel: 'Our perspective',
    location: 'Thoughtful by nature.\nOpen to what’s next.',
    name: 'Your name',
    email: 'Email address',
    projectType: 'What are you thinking?',
    choose: 'Select a project type',
    types: [
      'Brand identity',
      'Art direction',
      'Editorial design',
      'Photography',
      'Digital experience',
      'Something else',
    ],
    message: 'A little about your project',
    messagePlaceholder: 'Tell us about the idea, the ambition, the possibilities…',
    submitDemo: 'Preview enquiry',
    submitLive: 'Prepare email',
    demoNote: 'Demo form — try it out. No message will be sent or stored.',
    mailtoNote: 'This form prepares a draft in your email app. You review and send it yourself.',
    unavailable: 'Enquiries are not configured for this edition. No message has been sent.',
    validationIntro: 'Please review the highlighted fields.',
    errors: {
      name: 'Please enter your name (2–80 characters).',
      email: 'Please enter a valid email address.',
      projectType: 'Please choose a project type.',
      message: 'Please add 20–3,000 characters about your project.',
    },
    demoFeedback:
      'Your enquiry is ready to preview. This is a demonstration: nothing has been sent or stored.',
    draftFeedback:
      'Your email draft is ready. Open it in your email app, review it, then send it yourself. Nothing has been sent by this website.',
    draftLink: 'Open email draft',
    privacy: 'Your details stay in this page until you choose to open an email draft.',
    subject: 'New project enquiry',
  },
  footer: {
    note: 'A little intention goes a long way.',
    copyright: '© 2026. All things considered.',
    credits: 'Image credits',
    creditsUrl: 'image-credits.html',
  },
}
