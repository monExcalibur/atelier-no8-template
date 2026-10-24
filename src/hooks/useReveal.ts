import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    const setup = () => {
      observer?.disconnect()
      document.documentElement.classList.remove('reveal-ready')
      if (media.matches || !('IntersectionObserver' in window)) return
      document.documentElement.classList.add('reveal-ready')
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.08 },
      )
      document.querySelectorAll('[data-reveal]').forEach((element) => observer?.observe(element))
    }
    setup()
    media.addEventListener('change', setup)
    return () => {
      observer?.disconnect()
      media.removeEventListener('change', setup)
      document.documentElement.classList.remove('reveal-ready')
    }
  }, [])
}
