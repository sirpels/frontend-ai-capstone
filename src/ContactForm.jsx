import { useState } from 'react'

const NAME_PATTERN = /^(?!.*\d)[\p{L}\p{M}]+(?:[ '’-][\p{L}\p{M}]+)*$/u
const EMAIL_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+(?:\.[A-Za-z]{2,})?$/

function validateFullName(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Full name is required.'
  }

  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters long.'
  }

  if (!NAME_PATTERN.test(trimmed)) {
    return 'Full name can only contain letters, spaces, and common name punctuation.'
  }

  return ''
}

function validateEmail(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Email is required.'
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    return 'Please enter a valid email address, such as name@example.com.'
  }

  return ''
}

function validatePhone(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Phone number is required.'
  }

  const digitsOnly = trimmed.replace(/\D/g, '')

  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return 'Please enter a valid phone number with a reasonable number of digits.'
  }

  return ''
}

function validateMessage(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Message is required.'
  }

  if (trimmed.length < 20) {
    return 'Message must be at least 20 characters long.'
  }

  if (trimmed.length > 1000) {
    return 'Message must be 1000 characters or fewer.'
  }

  return ''
}

function validateForm(values) {
  return {
    fullName: validateFullName(values.fullName),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    message: validateMessage(values.message),
  }
}

const fieldStyles = {
  base: 'mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100',
  error: 'border-red-300 focus:border-red-500 focus:ring-red-100',
}

function ContactForm() {
  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
  }

  const [formValues, setFormValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return validateFullName(value)
      case 'email':
        return validateEmail(value)
      case 'phone':
        return validatePhone(value)
      case 'message':
        return validateMessage(value)
      default:
        return ''
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    if (errors[name]) {
      const nextError = validateField(name, value)
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: nextError,
      }))
    }

    if (submitError) {
      setSubmitError('')
    }

    if (successMessage) {
      setSuccessMessage('')
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    const nextError = validateField(name, value)

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: nextError,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validateForm(formValues)
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      setSuccessMessage('')
      setSubmitError('')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    setSuccessMessage('')

    try {
      await new Promise((resolve, reject) => {
        window.setTimeout(() => {
          const email = formValues.email.toLowerCase()

          if (email.includes('fail')) {
            reject(new Error('Submission failed. Please try again.'))
            return
          }

          resolve()
        }, 1200)
      })

      setFormValues({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      })
      setErrors({})
      setSuccessMessage("Thanks for contacting us! We'll get back to you within 24 hours.")
    } catch {
      setSubmitError('Something went wrong while sending your message. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={formValues.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className={`${fieldStyles.base} ${errors.fullName ? fieldStyles.error : ''}`}
            placeholder="Jane Doe"
            required
          />
          {errors.fullName && (
            <p id="fullName-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${fieldStyles.base} ${errors.email ? fieldStyles.error : ''}`}
            placeholder="name@example.com"
            required
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formValues.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`${fieldStyles.base} ${errors.phone ? fieldStyles.error : ''}`}
            placeholder="+234 803 123 4567"
            required
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <span className="text-xs text-slate-500">{formValues.message.length}/1000</span>
          </div>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formValues.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : 'message-count'}
            className={`${fieldStyles.base} resize-none ${errors.message ? fieldStyles.error : ''}`}
            placeholder="Tell us about your project..."
            maxLength={1000}
            required
          />
          <div className="mt-1 flex items-center justify-between gap-3">
            {errors.message ? (
              <p id="message-error" role="alert" className="text-sm text-red-600">
                {errors.message}
              </p>
            ) : (
              <span id="message-count" className="text-xs text-slate-500">
                Minimum 20 characters.
              </span>
            )}
          </div>
        </div>
      </div>

      {submitError && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      {successMessage && (
        <p role="status" aria-live="polite" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:bg-sky-300"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm
