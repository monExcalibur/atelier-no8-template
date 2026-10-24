import { sectionIds } from './types.ts'
import type { SiteConfig, SectionId } from './types.ts'

export function visibleNavigation(config: SiteConfig) {
  return config.content.nav.filter((item) => config.sections[item.section])
}

export function sectionTarget(config: SiteConfig, preferred: SectionId): string | undefined {
  return config.sections[preferred] ? `#${preferred}` : undefined
}

export function applySectionFlags(config: SiteConfig, disabled = ''): SiteConfig {
  const sections = { ...config.sections }
  for (const id of disabled.split(',').map((value) => value.trim())) {
    if (sectionIds.includes(id as SectionId)) sections[id as SectionId] = false
  }
  return { ...config, sections }
}

export function validContactEmail(email: string): boolean {
  return /^[^\s@<>?&#%]+@[^\s@<>?&#%]+\.[^\s@<>?&#%]+$/.test(email)
}

export interface Enquiry {
  name: string
  email: string
  projectType: string
  message: string
}
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>
export function validateEnquiry(values: Enquiry, config: SiteConfig): EnquiryErrors {
  const errors: EnquiryErrors = {}
  const copy = config.content.contact.errors
  if (values.name.trim().length < 2 || values.name.trim().length > 80) errors.name = copy.name
  if (!validContactEmail(values.email.trim()) || values.email.length > 254)
    errors.email = copy.email
  if (!config.content.contact.types.includes(values.projectType))
    errors.projectType = copy.projectType
  if (values.message.trim().length < 20 || values.message.trim().length > 3000)
    errors.message = copy.message
  return errors
}

export function contactDraft(config: SiteConfig, values: Enquiry): string | undefined {
  if (
    config.demoMode ||
    config.contact.mode !== 'mailto' ||
    !validContactEmail(config.contact.email)
  )
    return undefined
  if (Object.keys(validateEnquiry(values, config)).length) return undefined
  const subject = `${config.content.contact.subject}: ${values.projectType}`
  const body = `${config.content.contact.name}: ${values.name.trim()}\n${config.content.contact.email}: ${values.email.trim()}\n${config.content.contact.projectType}: ${values.projectType}\n\n${values.message.trim()}`
  return `mailto:${config.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function validateProjects(config: SiteConfig): void {
  const ids = new Set<string>()
  for (const project of config.projects) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id) || ids.has(project.id))
      throw new Error(`Invalid or duplicate project ID: ${project.id}`)
    if (
      !project.title ||
      !project.brief ||
      !project.details.length ||
      !project.thumbnail.alt ||
      project.thumbnail.width <= 0 ||
      project.thumbnail.height <= 0
    )
      throw new Error(`Incomplete project: ${project.id}`)
    ids.add(project.id)
  }
}
