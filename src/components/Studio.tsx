import { Plus } from 'lucide-react'
import { site } from '../config/index.ts'
import { sectionTarget } from '../config/helpers.ts'
import { Eyebrow, Picture, TextLink } from './Primitives.tsx'

export function About() {
  const copy = site.content.about
  const services = sectionTarget(site, 'services')
  return (
    <section id="about" className="studio-section section-space" aria-labelledby="studio-title">
      <div className="page-shell">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <div className="studio-grid">
          <figure data-reveal>
            <Picture image={copy.image} sizes="(max-width: 767px) 100vw, 42vw" />
            <figcaption>{copy.caption}</figcaption>
          </figure>
          <div className="studio-copy" data-reveal>
            <h2 id="studio-title">
              {copy.title}
              <em>{copy.emphasis}</em>
            </h2>
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {services && <TextLink href={services}>{copy.cta}</TextLink>}
            <span className="studio-detail">{copy.detail}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  const copy = site.content.services
  return (
    <section
      id="services"
      className="services page-shell section-space"
      aria-labelledby="services-title"
    >
      <div className="section-intro" data-reveal>
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id="services-title">{copy.title}</h2>
        </div>
        <p>{copy.intro}</p>
      </div>
      <div className="service-list">
        {copy.items.map((item) => (
          <details className="service" key={item.number}>
            <summary>
              <span className="service-number">{item.number}</span>
              <h3>{item.name}</h3>
              <span className="service-description">{item.description}</span>
              <Plus className="service-plus" size={22} aria-hidden="true" />
            </summary>
            {item.detail && <p className="service-detail">{item.detail}</p>}
          </details>
        ))}
      </div>
    </section>
  )
}

export function Process() {
  const copy = site.content.process
  return (
    <section id="process" className="process section-space" aria-labelledby="process-title">
      <div className="page-shell">
        <div className="section-intro" data-reveal>
          <div>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 id="process-title">{copy.title}</h2>
          </div>
          <p>{copy.intro}</p>
        </div>
        <ol className="process-list">
          {copy.steps.map((step, index) => (
            <li key={step.title} data-reveal>
              <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
