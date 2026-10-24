import { useState } from 'react'
import { ArrowUpRight, ArrowLeft, X } from 'lucide-react'
import { site } from '../config/index.ts'
import type { Project } from '../config/types.ts'
import { Eyebrow, Picture } from './Primitives.tsx'
import { Modal } from './Modal.tsx'

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const ui = site.content.ui
  return (
    <Modal onClose={onClose} labelId={`detail-${project.id}`} className="project-modal">
      <article className="project-detail">
        <div className="detail-toolbar">
          <button className="text-link" onClick={onClose}>
            <ArrowLeft size={17} aria-hidden="true" />
            <span>{ui.backToWork}</span>
          </button>
          <button
            className="icon-button"
            aria-label={ui.closeProject}
            data-initial-focus
            onClick={onClose}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <div className="detail-heading">
          <div>
            <Eyebrow>
              {project.category} / {project.year}
            </Eyebrow>
            <h2 id={`detail-${project.id}`}>{project.title}</h2>
          </div>
          {project.concept && <span className="concept-label">{ui.concept}</span>}
        </div>
        <p className="detail-deck">{project.description}</p>
        <div className={`detail-cover detail-cover-${project.id}`}>
          <Picture image={project.thumbnail} eager sizes="(max-width: 767px) 100vw, 85vw" />
        </div>
        <div className="detail-copy">
          <div>
            <Eyebrow>{ui.brief}</Eyebrow>
            <p className="brief-text">{project.brief}</p>
            {project.tags?.length ? (
              <div className="detail-scope">
                <Eyebrow>{ui.scope}</Eyebrow>
                <ul>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div>
            <Eyebrow>{ui.approach}</Eyebrow>
            {project.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        {project.gallery?.map((image) => (
          <figure key={image.src} className="detail-gallery">
            <Picture image={image} sizes="(max-width: 767px) 100vw, 85vw" />
          </figure>
        ))}
        {project.concept && <p className="detail-disclosure">{ui.imageryNote}</p>}
        <button className="text-link detail-back" onClick={onClose}>
          <ArrowLeft size={17} aria-hidden="true" />
          <span>{ui.backToWork}</span>
        </button>
      </article>
    </Modal>
  )
}

export function Portfolio() {
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState<Project | null>(null)
  const copy = site.content.portfolio
  const present = [...new Set(site.projects.map((project) => project.category))]
  const categories = [
    ...copy.categories.filter((category) => present.includes(category)),
    ...present.filter((category) => !copy.categories.includes(category)),
  ]
  const projects = filter
    ? site.projects.filter((project) => project.category === filter)
    : site.projects
  return (
    <section
      id="portfolio"
      className="portfolio page-shell section-space"
      aria-labelledby="work-title"
    >
      <div className="section-intro" data-reveal>
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id="work-title">{copy.title}</h2>
        </div>
        <p>{copy.intro}</p>
      </div>
      <div className="work-filters" role="group" aria-label={copy.all}>
        {['', ...categories].map((category) => (
          <button
            key={category}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category || copy.all}
            {category === '' && <sup>{String(site.projects.length).padStart(2, '0')}</sup>}
          </button>
        ))}
      </div>
      <div className="portfolio-grid" aria-live="polite" aria-atomic="false">
        {projects.map((project, index) => (
          <article className={`project-card project-${project.layout}`} key={project.id}>
            <button
              className="project-open"
              onClick={() => setSelected(project)}
              aria-label={`${site.content.ui.viewProject}: ${project.title}`}
            >
              <span className={`project-visual visual-${project.id}`}>
                <Picture
                  image={project.thumbnail}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 60vw"
                />
                {project.coverLabel && (
                  <span className="cover-label" aria-hidden="true">
                    {project.coverLabel}
                  </span>
                )}
                <span className="project-hover">
                  <ArrowUpRight size={24} aria-hidden="true" />
                </span>
              </span>
              <span className="project-meta">
                <span className="project-name">
                  {project.title}
                  <span className="project-category">
                    {project.category} / {project.year}
                  </span>
                </span>
                <span className="project-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                  <ArrowUpRight size={19} />
                </span>
              </span>
            </button>
            <p className="project-description">{project.description}</p>
            {project.concept && <span className="project-concept">{site.content.ui.concept}</span>}
          </article>
        ))}
      </div>
      {site.projects.some((project) => project.concept) && (
        <p className="portfolio-note">{copy.note}</p>
      )}
      {selected && (
        <ProjectDetail key={selected.id} project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
