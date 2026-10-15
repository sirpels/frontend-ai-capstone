import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

const tabs = [
  { label: 'Overview', content: 'Explore a simple product overview and its main features.' },
  { label: 'Details', content: 'Find product dimensions, materials, and care information here.' },
  { label: 'Reviews', content: 'Customer reviews will appear here when they are available.' },
]

export default function Tabs() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabs.length
        break
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = tabs.length - 1
        break
      default:
        return
    }
    event.preventDefault()
    // onFocus activates the newly focused tab immediately.
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div>
      <div role="tablist" aria-label="Product information" className="tab-list">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            ref={(element) => { tabRefs.current[index] = element }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={activeIndex === index}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={activeIndex !== index}
          tabIndex={0}
          className="tab-panel"
        >
          <p>{tab.content}</p>
        </div>
      ))}
    </div>
  )
}
