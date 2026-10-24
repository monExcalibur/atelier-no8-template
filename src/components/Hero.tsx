import { ArrowDown } from 'lucide-react'
import { site } from '../config/index.ts'
import { sectionTarget } from '../config/helpers.ts'
import { Eyebrow, Picture, StudioMark } from './Primitives.tsx'

export function Hero() {
  const copy = site.content.hero
  const work = sectionTarget(site, 'portfolio')
  return (
    <section id="hero" className="hero page-shell" aria-labelledby="hero-title">
      <div className="hero-topline">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        {site.demoMode && (
          <span className="demo-indicator">
            <span aria-hidden="true" />
            <span className="demo-full">{site.content.ui.demo}</span>
            <span className="demo-short">{site.content.ui.demoShort}</span>
          </span>
        )}
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            {copy.title}
            <em>{copy.emphasis}</em>
          </h1>
          <div className="hero-intro">
            <p>{copy.intro}</p>
            {work && (
              <a className="hero-cta" href={work}>
                <span className="circle-arrow">
                  <ArrowDown size={20} aria-hidden="true" />
                </span>
                <span>{copy.cta}</span>
              </a>
            )}
          </div>
          <p className="hero-note">{copy.note}</p>
        </div>
        <figure className="hero-figure">
          <div className="hero-photo">
            <Picture image={copy.image} eager sizes="(max-width: 767px) 100vw, 42vw" />
            <span className="photo-corner" aria-hidden="true">
              {site.brand.shortName}
            </span>
          </div>
          <figcaption>
            <span>{copy.imageCaption}</span>
            <span>{copy.imageIndex}</span>
          </figcaption>
          <div className="hero-seal">
            <StudioMark />
            <span>{copy.seal}</span>
          </div>
        </figure>
      </div>
      <div className="hero-baseline">
        <span>{site.brand.tagline}</span>
        <span aria-hidden="true">↙</span>
      </div>
    </section>
  )
}
