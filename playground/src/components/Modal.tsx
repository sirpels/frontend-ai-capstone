import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { KeyboardEvent } from 'react'

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const continueRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const headingId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!isOpen) return

    // The portal is outside #root, so only the background becomes inert.
    const appRoot = document.getElementById('root')
    const wasInert = appRoot?.inert ?? false
    const trigger = triggerRef.current
    continueRef.current?.focus()
    if (appRoot) appRoot.inert = true

    return () => {
      if (appRoot) appRoot.inert = wasInert
      trigger?.focus()
    }
  }, [isOpen])

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
    }

    // This demo has exactly two focusable elements: Continue and Close.
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === continueRef.current) {
        event.preventDefault()
        closeRef.current?.focus()
      } else if (!event.shiftKey && document.activeElement === closeRef.current) {
        event.preventDefault()
        continueRef.current?.focus()
      }
    }
  }

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setIsOpen(true)}>
        Open checkout information
      </button>
      {isOpen && createPortal(
        <div className="modal-backdrop">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
            onKeyDown={handleKeyDown}
          >
            <h2 id={headingId}>Checkout information</h2>
            <p id={descriptionId}>
              Review your order and shipping details before continuing to payment.
              This is a demonstration; no order will be placed.
            </p>
            <div className="modal-actions">
              <button ref={continueRef} type="button" onClick={() => setIsOpen(false)}>
                Continue
              </button>
              <button ref={closeRef} type="button" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
