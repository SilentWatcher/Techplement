import { useEffect, useState } from 'react'
import { getAdminSummary } from '../../api/client.js'
import { PageHeader } from './AdminUI.jsx'

function StatsChart({ daily = [] }) {
  const width = 800
  const height = 220
  const padding = 26
  const max = Math.max(1, ...daily.map((day) => day.views))
  const pointFor = (day, index) => {
    const x = padding + (index / Math.max(1, daily.length - 1)) * (width - padding * 2)
    const y = height - padding - (day.views / max) * (height - padding * 2)
    return `${x},${y}`
  }
  const points = daily.map(pointFor).join(' ')
  const area = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[600px] w-full" role="img" aria-label="Daily views chart">
        <defs>
          <linearGradient id="views-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4655" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ff4655" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            x2={width - padding}
            y1={height - padding - ratio * (height - padding * 2)}
            y2={height - padding - ratio * (height - padding * 2)}
            stroke="currentColor"
            className="text-gray-200 dark:text-white/10"
            strokeWidth="1"
          />
        ))}
        {daily.length > 0 && <polygon points={area} fill="url(#views-gradient)" />}
        {daily.length > 0 && (
          <polyline
            points={points}
            fill="none"
            stroke="#ff4655"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        {daily.map((day, index) => {
          const [x, y] = pointFor(day, index).split(',')
          return <circle key={day.date} cx={x} cy={y} r="2.4" fill="#ff4655" />
        })}
      </svg>
      <div className="admin-chart-axis">
        <span>{daily[0]?.date}</span>
        <span>{daily[daily.length - 1]?.date}</span>
      </div>
    </div>
  )
}

export default function Analytics() {
  const [days, setDays] = useState(30)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')
    getAdminSummary(days)
      .then((result) => {
        if (alive) setData(result)
      })
      .catch(() => {
        if (alive) setError('Could not load analytics')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [days])

  const totals = data?.totals || {}
  const stats = [
    ['Total Views', totals.views ?? '—', 'All time', 'views'],
    ['Unique Visitors', totals.uniqueVisitors ?? '—', 'All time', 'visitors'],
    ['Views Today', totals.viewsToday ?? '—', 'Since midnight', 'today'],
    ['Site Likes', totals.likes ?? '—', 'All time', 'likes'],
  ]

  return (
    <div>
      <PageHeader
        eyebrow="Telemetry"
        title="Analytics"
        description="First-party site views, unique visitors and likes. No third-party tracking."
        actions={
          <div className="admin-range">
            {[7, 30, 90].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setDays(value)}
                className={`admin-range-btn ${days === value ? 'active' : ''}`}
              >
                {value}d
              </button>
            ))}
          </div>
        }
      />

      {error && <div className="admin-alert admin-alert--error">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map(([label, value, hint], index) => (
          <div key={label} className={`admin-stat ${index === 0 ? 'admin-stat--accent' : ''}`}>
            <p className="admin-stat-label">{label}</p>
            <p className="admin-stat-value">{value}</p>
            <p className="admin-stat-hint">{hint}</p>
          </div>
        ))}
      </div>

      <div className="admin-card p-5 mb-6">
        <div className="admin-card-head">
          <div>
            <h2 className="admin-card-title">Traffic — last {days} days</h2>
            <p className="admin-card-sub">Daily page views across the public site</p>
          </div>
          <span className="admin-badge admin-badge--neutral">
            {totals.uniqueVisitorsInRange ?? 0} unique in range
          </span>
        </div>
        {loading ? (
          <p className="admin-loading">Loading chart...</p>
        ) : (
          <StatsChart daily={data?.daily || []} />
        )}
      </div>

      <div className="admin-card overflow-hidden">
        <div className="admin-card-head p-5">
          <div>
            <h2 className="admin-card-title">Project Performance</h2>
            <p className="admin-card-sub">Projects with activity in the selected range.</p>
          </div>
        </div>
        {data?.projects?.length ? (
          <div className="overflow-x-auto">
            <table className="admin-table w-full text-left">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Views</th>
                  <th>Unique</th>
                  <th>Likes</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.projects.map((project) => (
                  <tr key={project._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="admin-table-thumb">
                          {project.image ? <img src={project.image} alt="" /> : project.title?.slice(0, 1)}
                        </span>
                        <span className="font-medium">{project.title}</span>
                      </div>
                    </td>
                    <td>◉ {project.views}</td>
                    <td>{project.uniqueVisitors}</td>
                    <td>♥ {project.likes}</td>
                    <td>
                      <span className={`admin-badge ${project.ispublished ? 'admin-badge--live' : 'admin-badge--muted'}`}>
                        {project.ispublished ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-empty">No project activity yet.</p>
        )}
      </div>
    </div>
  )
}
