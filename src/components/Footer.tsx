import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { site } from '../config/index.ts'
import { assetUrl, safeExternalUrl } from '../config/assets.ts'
import { Wordmark } from './Primitives.tsx'

export function Footer() {
  const copy = site.content.footer
  return (
    <footer className="site-footer page-shell">
      <div className="footer-top">
        <Wordmark footer />
        <p>{copy.note}</p>
        <a className="icon-button" href="#home" aria-label={site.content.ui.top}>
          <ArrowUp size={21} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom">
        <p>{copy.copyright}</p>
        {site.demoMode && <p className="footer-demo">{site.content.ui.demo}</p>}
        <div className="footer-links">
          {site.socials.map((link) => {
            const url = safeExternalUrl(link.url)
            return url ? (
              <a href={url} target="_blank" rel="noreferrer" key={link.label}>
                {link.label}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ) : null
          })}
          <a
            href={assetUrl(copy.creditsUrl, import.meta.env.BASE_URL)}
            target="_blank"
            rel="noreferrer"
          >
            {copy.credits}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
