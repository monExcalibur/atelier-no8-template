import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function Modal({
  children,
  onClose,
  labelId,
  className = '',
}: {
  children: ReactNode
  onClose: () => void
  labelId: string
  className?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!openerRef.current && document.activeElement instanceof HTMLElement) {
      openerRef.current = document.activeElement
    }
    const previousOverflow = document.body.style.overflow
    if (!element.open) element.showModal()
    document.body.style.overflow = 'hidden'
    element.querySelector<HTMLElement>('[data-initial-focus]')?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      // Removing a native dialog closes it. Avoid a queued close event during
      // StrictMode's effect replay, which would otherwise dismiss a fresh modal.
      queueMicrotask(() => {
        if (!element.isConnected && openerRef.current?.isConnected) openerRef.current.focus()
      })
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={labelId}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const focusable = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
          ),
        ).filter((element) => element.getClientRects().length > 0)
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
    >
      {children}
    </dialog>
  )
}
