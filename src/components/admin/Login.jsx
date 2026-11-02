import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useTheme } from '../../context/ThemeContext.jsx'

function ThemeGlyph({ theme }) {
  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
    </svg>
  )
}

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch {
      setError('Invalid credentials. Check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-auth">
      <div className="admin-ambient" aria-hidden="true" />
      <div className="admin-grid-overlay" aria-hidden="true" />

      <div className="admin-auth-shell">
        <aside className="admin-auth-brand">
          <div className="admin-brand">
            <div className="admin-brand-mark">V</div>
            <div className="admin-brand-copy">
              <p className="admin-brand-name">Vitekari</p>
              <p className="admin-brand-sub">Command Center</p>
            </div>
          </div>

          <div className="admin-auth-hero">
            <p className="admin-eyebrow">Restricted Access</p>
            <h1 className="admin-auth-title">
              Command
              <br />
              Center<span>.</span>
            </h1>
            <p className="admin-auth-copy">
              One control surface for every page, project, link and metric on the public portfolio.
            </p>
          </div>

          <ul className="admin-auth-points">
            <li>
              <span className="admin-status-dot" />
              Content API online
            </li>
            <li>
              <span className="admin-status-dot" />
              Analytics telemetry active
            </li>
            <li>
              <span className="admin-status-dot" />
              Design: project-1
            </li>
          </ul>

          <p className="admin-auth-foot">VITEKARI / CMS v2.0</p>
        </aside>

        <section className="admin-auth-panel">
          <div className="admin-auth-panel-top">
            <span className="admin-badge admin-badge--neutral">Secure Login</span>
            <button
              type="button"
              onClick={toggle}
              className="admin-icon-btn"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <ThemeGlyph theme={theme} />
            </button>
          </div>

          <div className="admin-auth-form-head">
            <p className="admin-eyebrow">Authentication</p>
            <h2>Admin Login</h2>
            <p>Sign in to manage the live portfolio.</p>
          </div>

          {error && <div className="admin-alert admin-alert--error">{error}</div>}

          <form onSubmit={handleSubmit} className="admin-auth-form">
            <div>
              <label className="admin-label" htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="admin@portfolio.com"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="admin-label" htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="admin-btn admin-btn--primary w-full">
              {loading ? 'Authenticating...' : 'Enter Command Center'}
            </button>
          </form>

          <div className="admin-auth-footer">
            <span>Authorized personnel only</span>
            <Link to="/">← Back to site</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
