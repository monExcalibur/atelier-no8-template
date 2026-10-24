import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { site } from '../config/index.ts'
import { visibleNavigation } from '../config/helpers.ts'
import { Modal } from './Modal.tsx'
import { Wordmark } from './Primitives.tsx'

export function Header() {
  const [open, setOpen] = useState(false)
  const links = visibleNavigation(site)
  const ui = site.content.ui
  return (
    <header className="site-header page-shell">
      <Wordmark />
      <nav className="desktop-nav" aria-label={ui.navigation}>
        {links.map((item) => (
          <a
            key={item.section}
            href={`#${item.section}`}
            className={item.section === 'contact' ? 'nav-contact' : ''}
          >
            {item.label}
            {item.section === 'contact' && <ArrowUpRight size={16} aria-hidden="true" />}
          </a>
        ))}
      </nav>
      {links.length > 0 && (
        <button
          className="menu-toggle icon-button"
          aria-label={ui.openMenu}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls={open ? 'mobile-navigation' : undefined}
          onClick={() => setOpen(true)}
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      )}
      {open && (
        <Modal onClose={() => setOpen(false)} labelId="menu-title" className="menu-modal">
          <div id="mobile-navigation" className="menu-panel">
            <div className="flex items-center justify-between gap-4">
              <Wordmark onNavigate={() => setOpen(false)} />
              <button
                className="icon-button"
                data-initial-focus
                aria-label={ui.closeMenu}
                onClick={() => setOpen(false)}
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <p className="eyebrow" id="menu-title">
              {ui.navigation}
            </p>
            <nav aria-label={ui.navigation}>
              {links.map((item, index) => (
                <a key={item.section} href={`#${item.section}`} onClick={() => setOpen(false)}>
                  <sup>{String(index + 1).padStart(2, '0')}</sup>
                  <span>{item.label}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </nav>
            <p className="menu-note">{site.brand.tagline}</p>
            {site.demoMode && <p className="eyebrow">{ui.demo}</p>}
          </div>
        </Modal>
      )}
    </header>
  )
}
