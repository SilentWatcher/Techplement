import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroEditor from '../components/admin/HeroEditor.jsx'
import AboutEditor from '../components/admin/AboutEditor.jsx'
import ProjectsManager from '../components/admin/ProjectsManager.jsx'
import FooterEditor from '../components/admin/FooterEditor.jsx'
import SectionsEditor from '../components/admin/SectionsEditor.jsx'

const SECTION_MAP = [
  { id: 'home', label: 'Hero Section', route: '/admin/hero', editor: 'hero' },
  { id: 'about', label: 'About Section', route: '/admin/about', editor: 'about' },
  { id: 'project', label: 'Projects', route: '/admin/projects', editor: 'projects' },
  { id: 'contact', label: 'Footer & Contact', route: '/admin/footer', editor: 'footer' },
]

function EditorFor({ section }) {
  switch (section) {
    case 'hero':
      return <HeroEditor />
    case 'about':
      return <AboutEditor />
    case 'projects':
      return <ProjectsManager />
    case 'footer':
      return <FooterEditor />
    default:
      return <SectionsEditor />
  }
}

export default function Preview() {
  const iframeRef = useRef(null)
  const [active, setActive] = useState('home')
  const [refreshKey, setRefreshKey] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const attach = () => {
      const win = iframe.contentWindow
      const doc = iframe.contentDocument
      if (!win || !doc) return

      const update = () => {
        let current = SECTION_MAP[0].id
        for (const section of SECTION_MAP) {
          const el = doc.getElementById(section.id)
          if (!el) continue
          if (el.getBoundingClientRect().top <= 120) current = section.id
        }
        setActive(current)
      }

      win.addEventListener('scroll', update, { passive: true })
      update()

      return () => win.removeEventListener('scroll', update)
    }

    let cleanup
    const onLoad = () => {
      cleanup = attach()
    }
    iframe.addEventListener('load', onLoad)
    // If already loaded
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      cleanup = attach()
    }

    return () => {
      iframe.removeEventListener('load', onLoad)
      if (cleanup) cleanup()
    }
  }, [refreshKey])

  const activeSection = SECTION_MAP.find((s) => s.id === active) || SECTION_MAP[0]

  const scrollToSection = (id) => {
    const iframe = iframeRef.current
    const doc = iframe?.contentDocument
    const el = doc?.getElementById(id)
    if (el) {
      iframe.contentWindow.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }

  return (
    <div className="admin-preview-layout">
      <aside className="admin-preview-sidebar">
        <div className="admin-preview-sidebar-head">
          <h2 className="admin-preview-title">Visual Editor</h2>
          <p className="admin-preview-sub">Scroll the preview to switch sections.</p>
        </div>
        <nav className="admin-preview-nav">
          {SECTION_MAP.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`admin-preview-nav-btn ${active === section.id ? 'is-active' : ''}`}
              onClick={() => {
                setActive(section.id)
                scrollToSection(section.id)
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <div className="admin-preview-actions">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setRefreshKey((k) => k + 1)}>
            Refresh Preview
          </button>
          <button type="button" className="admin-btn admin-btn--primary" onClick={() => navigate(activeSection.route)}>
            Open Full Editor
          </button>
        </div>
      </aside>

      <div className="admin-preview-editor">
        <EditorFor section={active} />
      </div>

      <div className="admin-preview-frame-wrap">
        <iframe
          ref={iframeRef}
          key={refreshKey}
          src={`/?preview=${refreshKey}`}
          title="Site preview"
          className="admin-preview-iframe"
        />
      </div>
    </div>
  )
}
