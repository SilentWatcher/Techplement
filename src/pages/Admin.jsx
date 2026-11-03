import { useEffect, useState, useRef } from 'react'
import { Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar.jsx'
import Dashboard from '../components/admin/Dashboard.jsx'
import Analytics from '../components/admin/Analytics.jsx'
import ProfileEditor from '../components/admin/ProfileEditor.jsx'
import ProjectsManager from '../components/admin/ProjectsManager.jsx'
import SiteSettingsEditor from '../components/admin/SiteSettingsEditor.jsx'
import HeroEditor from '../components/admin/HeroEditor.jsx'
import AboutEditor from '../components/admin/AboutEditor.jsx'
import SectionsEditor from '../components/admin/SectionsEditor.jsx'
import FooterEditor from '../components/admin/FooterEditor.jsx'
import TechManager from '../components/admin/TechManager.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const pageTitles = {
  preview: 'Visual Preview',
  analytics: 'Analytics',
  settings: 'Site Settings',
  hero: 'Hero Section',
  about: 'About Section',
  sections: 'Section Content',
  footer: 'Footer & Contact',
  profile: 'Profile & Links',
  tech: 'Tech Stack',
  projects: 'Projects',
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
    </svg>
  )
}

export default function Admin() {
  const [open, setOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(true)
  const [previewRefresh, setPreviewRefresh] = useState(0)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('adminSidebarCollapsed') === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const handler = () => setPreviewRefresh((k) => k + 1)
    window.addEventListener('content:saved', handler)
    return () => window.removeEventListener('content:saved', handler)
  }, [])

  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggle } = useTheme()
  const segment = location.pathname.split('/')[2] || 'dashboard'
  const title = pageTitles[segment] || 'Dashboard'

  const sectionMap = {
    hero: 'home',
    about: 'about',
    projects: 'project',
    footer: 'contact',
    sections: 'about',
  }
  const previewSection = sectionMap[segment] || 'home'

  const previewIframeRef = useRef(null)
  const isProgrammaticRef = useRef(false)

  const reverseMap = { home: 'hero', about: 'about', project: 'projects', contact: 'footer' }

  useEffect(() => {
    const iframe = previewIframeRef.current
    if (!iframe || !previewOpen) return

    let lastSection = null

    const updateActive = () => {
      const doc = iframe.contentDocument
      const win = iframe.contentWindow
      if (!doc || !win) return
      if (isProgrammaticRef.current) return
      let current = 'home'
      for (const id of ['home', 'about', 'project', 'contact']) {
        const el = doc.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      if (current !== lastSection) {
        lastSection = current
        const targetRoute = reverseMap[current]
        const currentSegment = location.pathname.split('/')[2] || 'dashboard'
        if (targetRoute && targetRoute !== currentSegment) {
          navigate(`/admin/${targetRoute}`, { replace: true })
        }
      }
    }

  const scrollToSection = () => {
    const doc = iframe.contentDocument
    const win = iframe.contentWindow
    if (!doc || !win) return
    const el = doc.getElementById(previewSection)
    if (el) {
      isProgrammaticRef.current = true
      win.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
      setTimeout(() => { isProgrammaticRef.current = false }, 600)
    }
  }

    const onLoad = () => {
      scrollToSection()
      updateActive()
      iframe.contentWindow?.addEventListener('scroll', updateActive, { passive: true })
      iframe.contentWindow?.addEventListener('hashchange', updateActive)
    }

    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      onLoad()
    } else {
      iframe.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      iframe.removeEventListener('load', onLoad)
      iframe.contentWindow?.removeEventListener('scroll', updateActive)
      iframe.contentWindow?.removeEventListener('hashchange', updateActive)
    }
  }, [previewSection, previewOpen, previewRefresh, navigate])

  useEffect(() => {
    setOpen(false)
    const scroller = document.querySelector('.admin-content')
    if (scroller) scroller.scrollTo({ top: 0 })
  }, [location.pathname])

  useEffect(() => {
    try {
      localStorage.setItem('adminSidebarCollapsed', collapsed ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [collapsed])

  return (
    <div className="admin-shell">
      <div className="admin-ambient" aria-hidden="true" />
      <div className="admin-grid-overlay" aria-hidden="true" />

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      {open && <button type="button" className="admin-overlay" onClick={() => setOpen(false)} aria-label="Close navigation" />}

      <div className="admin-content">
        <header className="admin-topbar">
          <button
            type="button"
            className="admin-icon-btn admin-menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-4 h-4">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <nav className="admin-breadcrumb" aria-label="Breadcrumb">
            <span>Admin</span>
            <span className="admin-breadcrumb-sep">/</span>
            <strong>{title}</strong>
          </nav>

          <div className="admin-topbar-actions">
            <span className="admin-live-pill">
              <span className="admin-status-dot" />
              Live
            </span>
            <button
              type="button"
              className="admin-pill"
              onClick={() => setPreviewOpen((v) => !v)}
            >
              {previewOpen ? 'Hide Preview' : 'Show Preview'}
            </button>
            <Link to="/" target="_blank" rel="noopener noreferrer" className="admin-pill">
              View Site
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-3 h-3" aria-hidden="true">
                <path d="M8 16 16 8M9 8h7v7" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="admin-icon-btn"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </header>

        <div className="admin-workspace">
          <main className="admin-main">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<SiteSettingsEditor />} />
            <Route path="hero" element={<HeroEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="sections" element={<SectionsEditor />} />
            <Route path="footer" element={<FooterEditor />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="tech" element={<TechManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>

        {previewOpen && (
          <aside className="admin-preview-pane">
            <div className="admin-preview-pane__head">
              <span className="admin-preview-pane__title">Live Preview — {title}</span>
              <div className="admin-preview-pane__actions">
                <button type="button" className="admin-icon-btn" onClick={() => setPreviewRefresh((k) => k + 1)} aria-label="Refresh preview">
                  ↻
                </button>
                <button type="button" className="admin-icon-btn" onClick={() => setPreviewOpen(false)} aria-label="Hide preview">
                  ✕
                </button>
              </div>
            </div>
            <iframe
              ref={previewIframeRef}
              src={`/?pv=${previewRefresh}`}
              title="Live site preview"
              className="admin-preview-pane__iframe"
            />
          </aside>
        )}
      </div>

      <footer className="admin-footer">
        <span>Vitekari Command Center</span>
        <span className="admin-footer-sep">·</span>
        <span>Content API connected</span>
        <span className="admin-footer-spacer" />
        <span>design: project-1</span>
      </footer>
      </div>
    </div>
  )
}
