import { useId, useState } from 'react'

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = useId()

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(!isOpen)}
      >
        Show shipping information
      </button>
      <div id={contentId} hidden={!isOpen}>
        <p>Standard shipping usually takes 3-5 business days. Tracking details are sent after dispatch.</p>
      </div>
    </div>
  )
}
