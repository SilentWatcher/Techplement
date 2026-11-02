import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAdminSummary, getProfile, getProjects, getSettings } from '../../api/client.js'
import { PageHeader } from './AdminUI.jsx'

function StatCard({ label, value, hint, icon, accent = false }) {
  return (
    <div className={`admin-stat ${accent ? 'admin-stat--accent' : ''}`}>
      <div className="admin-stat-top">
        <div>
          <p className="admin-stat-label">{label}</p>
          <p className="admin-stat-value">{value}</p>
          {hint && <p className="admin-stat-hint">{hint}</p>}
        </div>
        {icon && <span className="admin-stat-icon">{icon}</span>}
      </div>
    </div>
  )
}

const quickLinks = [
  ['/admin/settings', 'Site Settings', 'Brand, SEO & navigation'],
  ['/admin/hero', 'Hero', 'Headline & tagline'],
  ['/admin/about', 'About', 'Story & HUD copy'],
  ['/admin/sections', 'Section Text', 'Tech & project headings'],
  ['/admin/footer', 'Footer', 'Contact & credits'],
  ['/admin/profile', 'Profile', 'Bio, resume & links'],
  ['/admin/tech', 'Tech Stack', 'Skills & tooling'],
  ['/admin/projects', 'Projects', 'Order, links & visibility'],
]

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [settings, setSettings] = useState(null)
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {})
    getProjects().then(setProjects).catch(() => {})
    getSettings().then(setSettings).catch(() => {})
    getAdminSummary(30).then(setSummary).catch(() => {})
  }, [])

  const published = projects.filter((project) => project.ispublished !== false).length
  const visibleSocials = (profile?.socialLinks || []).filter((link) => link.visible !== false).length

  return (
    <div>
      <PageHeader
        eyebrow="Control Deck"
        title="Dashboard"
        description="Everything on the public site is controlled from this panel."
        actions={
          <Link to="/admin/analytics" className="admin-btn admin-btn--ghost admin-btn--sm">
            Open Analytics
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Views"
          value={summary?.totals?.views ?? '—'}
          hint={`${summary?.totals?.viewsToday ?? 0} today`}
          accent
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              <path d="M2.25 12s3.5-6.75 9.75-6.75S21.75 12 21.75 12 18.25 18.75 12 18.75 2.25 12 2.25 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          }
        />
        <StatCard
          label="Unique Visitors"
          value={summary?.totals?.uniqueVisitors ?? '—'}
          hint={`${summary?.totals?.uniqueVisitorsInRange ?? 0} in last 30 days`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              <circle cx="9" cy="8" r="3.3" />
              <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0M16 5.2a3.3 3.3 0 0 1 0 6.1M18.2 14.3A5.6 5.6 0 0 1 21.2 20" />
            </svg>
          }
        />
        <StatCard
          label="Site Likes"
          value={summary?.totals?.likes ?? '—'}
          hint="Across the whole website"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              <path d="M12 20s-7.5-4.4-9.3-8.5A5 5 0 0 1 12 6.4a5 5 0 0 1 9.3 5.1C19.5 15.6 12 20 12 20Z" />
            </svg>
          }
        />
        <StatCard
          label="Projects"
          value={projects.length}
          hint={`${published} published · ${projects.length - published} hidden`}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
              <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2.5h6.5A2.5 2.5 0 0 1 21 10v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-10Z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="admin-card p-5">
          <div className="admin-card-head">
            <div>
              <h2 className="admin-card-title">Content Status</h2>
              <p className="admin-card-sub">Live data served by the content API</p>
            </div>
            <span className="admin-badge admin-badge--live">Synced</span>
          </div>
          <ul className="admin-kv-list">
            <li>
              <span>Profile</span>
              <strong>{profile?.name || '—'}</strong>
            </li>
            <li>
              <span>Active Design</span>
              <strong className="admin-mono">{settings?.designId || 'project-1'}</strong>
            </li>
            <li>
              <span>Visible Social Links</span>
              <strong>{visibleSocials}</strong>
            </li>
            <li>
              <span>Resume</span>
              <strong className={profile?.resumeUrl ? 'admin-ok' : 'admin-bad'}>
                {profile?.resumeUrl ? 'Configured' : 'Missing'}
              </strong>
            </li>
            <li>
              <span>Projects Published</span>
              <strong>{published} / {projects.length}</strong>
            </li>
          </ul>
        </div>

        <div className="admin-card p-5">
          <div className="admin-card-head">
            <div>
              <h2 className="admin-card-title">Quick Actions</h2>
              <p className="admin-card-sub">Jump straight into a content module</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickLinks.map(([to, label, hint], index) => (
              <Link key={to} to={to} className="admin-quick-link">
                <span className="admin-quick-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="admin-quick-copy">
                  <strong>{label}</strong>
                  <small>{hint}</small>
                </span>
                <span className="admin-quick-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
