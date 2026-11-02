import { useEffect, useRef, useState } from 'react'
import { getSocialLinks } from '../../data/socialIcons.js'
import { sendContactMessage } from '../../api/client.js'

const MISSION_OPTIONS = [
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'Freelance Project',
  'Job Opportunity',
  'Other',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact({ profile }) {
  const email = profile?.email || 'vitekarivikas55@gmail.com'
  const socialIcons = getSocialLinks(profile)

  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    missionType: MISSION_OPTIONS[0],
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Callsign required'
    if (!EMAIL_RE.test(form.email.trim())) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Transmission required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (field) => (ev) => {
    setForm((prev) => ({ ...prev, [field]: ev.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setErrorMessage('')
    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        missionType: form.missionType,
        message: form.message.trim(),
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err?.response?.data?.message || 'Transmission failed. Retry.')
    }
  }

  const reset = () => {
    setForm({ name: '', email: '', missionType: MISSION_OPTIONS[0], message: '' })
    setErrors({})
    setStatus('idle')
    setErrorMessage('')
  }

  const statusText =
    status === 'submitting'
      ? 'TRANSMITTING...'
      : status === 'success'
      ? 'TRANSMISSION RECEIVED'
      : status === 'error'
      ? 'TRANSMISSION FAILED'
      : 'READY TO TRANSMIT'

  const sectionClass = `contact-section${visible ? ' is-visible' : ''}`

  return (
    <section id="contact" ref={sectionRef} className={sectionClass}>
      {/* Background image */}
      <div className="contact-bg" aria-hidden="true" />
      {/* Overlays */}
      <div className="contact-overlay contact-overlay--base" aria-hidden="true" />
      <div className="contact-overlay contact-overlay--burgundy" aria-hidden="true" />
      <div className="contact-overlay contact-overlay--radial" aria-hidden="true" />
      <div className="contact-overlay contact-overlay--vignette" aria-hidden="true" />
      <div className="contact-overlay contact-overlay--grid" aria-hidden="true" />

      {/* Oversized background word */}
      <div className="contact-bigword" aria-hidden="true">
        CONTACT
      </div>

      <div className="contact-container">
        {/* Top metadata row */}
        <div className="contact-meta contact-reveal">
          <div className="contact-meta-left">
            <span className="contact-crosshair" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="1" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="23" />
                <line x1="1" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="23" y2="12" />
              </svg>
            </span>
            <span>PROTOCOL 07 // COMMUNICATION CHANNEL</span>
          </div>
          <div className="contact-meta-right">
            <span className="contact-sys-dot-green" />
            <span>SYSTEM ONLINE</span>
          </div>
        </div>

        <div className="contact-divider" />

        {/* Main stage */}
        <div className="contact-stage">
          {/* Left column */}
          <div className="contact-left">
            <h2 className="contact-headline contact-reveal contact-reveal-delay-1">
              <span className="contact-headline__line">LET'S MAKE</span>
              <span className="contact-headline__impact">AN IMPACT.</span>
            </h2>

            <p className="contact-intro contact-reveal contact-reveal-delay-2">
              Every great project starts with a conversation.
              <br />
              Have an idea, an opportunity, or something ambitious in mind?
              <br />
              Let's build it.
            </p>

            {/* Panels */}
            <div className="contact-panels">
              {/* Panel A */}
              <div className="contact-panel contact-reveal contact-reveal-delay-2">
                <p className="contact-panel-label">DIRECT CONTACT</p>
                <div className="contact-email-row">
                  <svg
                    className="contact-email-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <a href={`mailto:${email}`} className="contact-email-link">
                    {email}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="contact-email-arrow"
                    aria-label="Open email client"
                  >
                    ↗
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="contact-copy-btn"
                  >
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                </div>
              </div>

              {/* Panel B */}
              <div className="contact-panel contact-reveal contact-reveal-delay-3">
                <p className="contact-panel-label">FOLLOW ME</p>
                <div className="contact-socials">
                  {socialIcons.map((social) => (
                    <a
                      key={`${social.platform}-${social.url}`}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                      title={social.label || social.platform}
                    >
                      {social.icon ? (
                        <img
                          src={social.icon}
                          alt={social.label || social.platform}
                          className="contact-social-icon"
                        />
                      ) : (
                        <span className="contact-social-fallback">
                          {social.platform}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability bar */}
            <div className="contact-availability contact-reveal contact-reveal-delay-3">
              <span className="contact-avail-dot" />
              <span>AVAILABLE FOR SELECT PROJECTS</span>
              <span className="contact-avail-sep">|</span>
              <span className="contact-sys-dot" />
              <span>SYSTEM ONLINE</span>
              <span className="contact-stripes" aria-hidden="true" />
            </div>
          </div>

          {/* Right column — form */}
          <div className="contact-right">
            <div className="contact-form-panel contact-reveal contact-reveal-delay-2">
              <div className="contact-form-heading">
                <span className="contact-form-stripe" aria-hidden="true" />
                <h3>INITIATE TRANSMISSION</h3>
              </div>

              <div
                className={`contact-status contact-status--${status}`}
                role="status"
                aria-live="polite"
              >
                <span className="contact-status-dot" />
                <span>{statusText}</span>
              </div>

              {status === 'success' ? (
                <div className="contact-success">
                  <div className="contact-success-check" aria-hidden="true">
                    ✓
                  </div>
                  <p className="contact-success-title">TRANSMISSION RECEIVED</p>
                  <p className="contact-success-msg">
                    Your message has been logged successfully. I'll get back to you
                    shortly.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="contact-submit"
                  >
                    SEND ANOTHER →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="contact-field contact-reveal" style={{ transitionDelay: '0.35s' }}>
                    <label className="contact-label" htmlFor="contact-name">
                      01. YOUR CALLSIGN{' '}
                      <span className="contact-req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className={`contact-input${errors.name ? ' has-error' : ''}`}
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange('name')}
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                    />
                    {errors.name && (
                      <span id="err-name" className="contact-field-error">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="contact-field contact-reveal" style={{ transitionDelay: '0.4s' }}>
                    <label className="contact-label" htmlFor="contact-email">
                      02. EMAIL ADDRESS{' '}
                      <span className="contact-req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className={`contact-input${errors.email ? ' has-error' : ''}`}
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange('email')}
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                    />
                    {errors.email && (
                      <span id="err-email" className="contact-field-error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="contact-field contact-reveal" style={{ transitionDelay: '0.45s' }}>
                    <label className="contact-label" htmlFor="contact-mission">
                      03. MISSION TYPE
                    </label>
                    <div className="contact-select-wrap">
                      <select
                        id="contact-mission"
                        className="contact-select"
                        value={form.missionType}
                        onChange={handleChange('missionType')}
                      >
                        {MISSION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span className="contact-select-arrow" aria-hidden="true">
                        ▾
                      </span>
                    </div>
                  </div>

                  <div className="contact-field contact-reveal" style={{ transitionDelay: '0.5s' }}>
                    <label className="contact-label" htmlFor="contact-message">
                      04. MESSAGE TRANSMISSION{' '}
                      <span className="contact-req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      className={`contact-textarea${errors.message ? ' has-error' : ''}`}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={handleChange('message')}
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'err-message' : undefined}
                    />
                    {errors.message && (
                      <span id="err-message" className="contact-field-error">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="contact-submit contact-reveal"
                    style={{ transitionDelay: '0.55s' }}
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting'
                      ? 'TRANSMITTING...'
                      : 'SEND TRANSMISSION →'}
                  </button>

                  {status === 'error' && errorMessage && (
                    <p className="contact-error" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
