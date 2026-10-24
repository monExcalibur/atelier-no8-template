import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/index.ts'
import { contactDraft, validContactEmail, validateEnquiry } from '../config/helpers.ts'
import type { Enquiry, EnquiryErrors } from '../config/helpers.ts'
import { Eyebrow } from './Primitives.tsx'

export function Contact() {
  const copy = site.content.contact
  const [values, setValues] = useState<Enquiry>({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [feedback, setFeedback] = useState('')
  const [draft, setDraft] = useState<string>()
  const form = useRef<HTMLFormElement>(null)
  const update = (key: keyof Enquiry, value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setFeedback('')
    setDraft(undefined)
  }
  function submit(event: FormEvent) {
    event.preventDefault()
    const nextErrors = validateEnquiry(values, site)
    setErrors(nextErrors)
    setDraft(undefined)
    if (Object.keys(nextErrors).length) {
      setFeedback(copy.validationIntro)
      const first = Object.keys(nextErrors)[0]
      const field = form.current?.elements.namedItem(first)
      if (field instanceof HTMLElement) field.focus()
      return
    }
    if (site.demoMode) {
      setFeedback(copy.demoFeedback)
      return
    }
    const link = contactDraft(site, values)
    setDraft(link)
    setFeedback(link ? copy.draftFeedback : copy.unavailable)
  }
  const a11y = (key: keyof Enquiry) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })
  return (
    <section
      id="contact"
      className="contact page-shell section-space"
      aria-labelledby="contact-title"
    >
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h2 id="contact-title" data-reveal>
        {copy.title}
        <em>{copy.emphasis}</em>
      </h2>
      <div className="contact-grid">
        <div className="contact-info">
          <p className="contact-intro">{copy.intro}</p>
          <div>
            <Eyebrow>{copy.emailLabel}</Eyebrow>
            {validContactEmail(site.contact.email) ? (
              <a className="contact-email" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <p className="contact-fallback">{copy.emailFallback}</p>
            )}
          </div>
          <div>
            <Eyebrow>{copy.locationLabel}</Eyebrow>
            <p className="contact-location">{copy.location}</p>
          </div>
        </div>
        <form ref={form} onSubmit={submit} noValidate className="contact-form">
          <p className="form-note">
            {site.demoMode
              ? copy.demoNote
              : site.contact.mode === 'mailto' && validContactEmail(site.contact.email)
                ? copy.mailtoNote
                : copy.unavailable}
          </p>
          <div className="form-pair">
            <div className="form-field">
              <label htmlFor="name">{copy.name}</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                maxLength={80}
                required
                onChange={(event) => update('name', event.target.value)}
                {...a11y('name')}
              />
              {errors.name && (
                <p id="name-error" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="email">{copy.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={values.email}
                maxLength={254}
                required
                onChange={(event) => update('email', event.target.value)}
                {...a11y('email')}
              />
              {errors.email && (
                <p id="email-error" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="projectType">{copy.projectType}</label>
            <select
              id="projectType"
              name="projectType"
              value={values.projectType}
              required
              onChange={(event) => update('projectType', event.target.value)}
              {...a11y('projectType')}
            >
              <option value="">{copy.choose}</option>
              {copy.types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            {errors.projectType && (
              <p id="projectType-error" className="field-error">
                {errors.projectType}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="message">{copy.message}</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder={copy.messagePlaceholder}
              value={values.message}
              maxLength={3000}
              required
              onChange={(event) => update('message', event.target.value)}
              {...a11y('message')}
            />
            {errors.message && (
              <p id="message-error" className="field-error">
                {errors.message}
              </p>
            )}
          </div>
          <div className="form-bottom">
            <button className="submit-button" type="submit">
              <span>{site.demoMode ? copy.submitDemo : copy.submitLive}</span>
              <ArrowUpRight size={19} aria-hidden="true" />
            </button>
            <p>{copy.privacy}</p>
          </div>
          <div className="form-feedback" role="status" aria-live="polite" aria-atomic="true">
            {feedback && <p>{feedback}</p>}
            {draft && (
              <a className="text-link" href={draft}>
                <span>{copy.draftLink}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
