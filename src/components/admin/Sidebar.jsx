import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const groups = [
  {
    label: 'Overview',
    links: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
      { to: '/admin/analytics', label: 'Analytics', icon: 'analytics' },
    ],
  },
  {
    label: 'Content',
    links: [
      { to: '/admin/settings', label: 'Site Settings', icon: 'settings' },
      { to: '/admin/hero', label: 'Hero Section', icon: 'hero' },
      { to: '/admin/about', label: 'About Section', icon: 'about' },
      { to: '/admin/sections', label: 'Section Content', icon: 'sections' },
      { to: '/admin/footer', label: 'Footer & Contact', icon: 'footer' },
      { to: '/admin/profile', label: 'Profile & Links', icon: 'profile' },
    ],
  },
  {
    label: 'Library',
    links: [
      { to: '/admin/tech', label: 'Tech Stack', icon: 'tech' },
      { to: '/admin/projects', label: 'Projects', icon: 'projects' },
    ],
  },
]

const icons = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  analytics: (
    <>
      <path d="M3 17.5 8.5 12l4 3.5L21 6.5" />
      <path d="M15.5 6.5H21v5.5" />
    </>
  ),
  settings: (
    <>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2.2" />
      <circle cx="8" cy="17" r="2.2" />
    </>
  ),
  hero: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  sections: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </>
  ),
  footer: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  profile: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="9" cy="10.5" r="2.2" />
      <path d="M5.8 16.5c.7-1.8 1.9-2.7 3.2-2.7s2.5.9 3.2 2.7M15 9.5h3M15 13h3" />
    </>
  ),
  tech: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
    </>
  ),
  projects: (
    <>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2.5h6.5A2.5 2.5 0 0 1 21 10v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-10Z" />
      <path d="M3 10h18" />
    </>
  ),
}

function NavIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="admin-nav-icon"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

export default function Sidebar({ open = false, onClose = () => {}, collapsed = false, onToggleCollapse = () => {}, onOpenPreview = () => {} }) {
  const { logout } = useAuth()
  let counter = 0

  return (
    <aside
      className={`admin-sidebar ${open ? 'admin-sidebar--open' : ''} ${collapsed ? 'admin-sidebar--collapsed' : ''}`}
      aria-label="Admin navigation"
    >
      <div className="admin-brand">
        <div className="admin-brand-mark">V</div>
        {!collapsed && (
          <div className="admin-brand-copy">
            <p className="admin-brand-name">Vitekari</p>
            <p className="admin-brand-sub">Command Center</p>
          </div>
        )}
        <button
          type="button"
          className="admin-sidebar-collapse"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '»' : '«'}
        </button>
        <button type="button" className="admin-sidebar-close" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
      </div>

      <nav className="admin-nav">
        {groups.map((group) => (
          <div className="admin-nav-group" key={group.label}>
            {!collapsed && <p className="admin-nav-label">{group.label}</p>}
            {group.links.map((link) => {
              counter += 1
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
                  title={collapsed ? link.label : undefined}
                >
                  <NavIcon name={link.icon} />
                  {!collapsed && <span className="admin-nav-text">{link.label}</span>}
                  {!collapsed && <span className="admin-nav-index">{String(counter).padStart(2, '0')}</span>}
                  <span className="admin-nav-dot" />
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        {!collapsed && (
          <div className="admin-sidebar-status">
            <span className="admin-status-dot" />
            System online
          </div>
        )}
        <button type="button" onClick={logout} className="admin-logout" title={collapsed ? 'Sign out' : undefined}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4" aria-hidden="true">
            <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
            <path d="M10 8l-4 4 4 4M6 12h9" />
          </svg>
          {!collapsed && 'Sign out'}
        </button>
        {!collapsed && <p className="admin-sidebar-meta">CMS v2.0 · Authenticated</p>}
      </div>
    </aside>
  )
}
