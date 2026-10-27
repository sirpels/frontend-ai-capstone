import { useEffect, useRef, useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const successRef = useRef(null)

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'submitting') return

    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('submitting')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (!response.ok) throw new Error('Form submission failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="contact-success" role="status" tabIndex={-1} ref={successRef}>Message sent successfully.</p>
  }

  return (
    <form className="contact-form" name="contact" method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <div className="contact-fields">
        <div className="contact-field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="contact-field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="5" required />
      </div>
      {status === 'error' && <p className="contact-error" role="alert">We couldn’t send your message. Please try again.</p>}
      <button className="button primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message ↗'}
      </button>
    </form>
  )
}
