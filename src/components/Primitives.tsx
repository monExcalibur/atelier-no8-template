import { ArrowUpRight } from 'lucide-react'
import { assetUrl } from '../config/assets.ts'
import { site } from '../config/index.ts'
import type { PortfolioImage } from '../config/types.ts'

export function Picture({
  image,
  className = '',
  eager = false,
  sizes = '(max-width: 767px) 100vw, 60vw',
}: {
  image: PortfolioImage
  className?: string
  eager?: boolean
  sizes?: string
}) {
  return (
    <img
      className={className}
      src={assetUrl(image.src, import.meta.env.BASE_URL)}
      srcSet={image.srcSet
        ?.map((item) => `${assetUrl(item.src, import.meta.env.BASE_URL)} ${item.width}w`)
        .join(', ')}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      style={{ objectPosition: image.position }}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
    />
  )
}

export function Wordmark({
  footer = false,
  onNavigate,
}: {
  footer?: boolean
  onNavigate?: () => void
}) {
  return (
    <a
      className={`wordmark ${footer ? 'wordmark-footer' : ''}`}
      href="#home"
      onClick={onNavigate}
      aria-label={`${site.brand.name} — ${site.content.ui.home}`}
    >
      {site.brand.logo ? (
        <img
          src={assetUrl(site.brand.logo, import.meta.env.BASE_URL)}
          alt={site.brand.name}
          width="180"
          height="60"
        />
      ) : (
        <>
          <span>{site.brand.wordmark}</span>
          <sup>{site.brand.suffix}</sup>
        </>
      )}
    </a>
  )
}

export function TextLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a className={`text-link ${className}`} href={href}>
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

export function StudioMark() {
  return (
    <svg className="studio-mark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.7" />
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <path
          key={angle}
          d="M50 23V77"
          stroke="currentColor"
          strokeWidth="1.2"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="15" fill="var(--paper)" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  )
}
