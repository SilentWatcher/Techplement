import { useEffect, useState } from 'react'
import { deleteTech, getTech } from '../../api/client.js'
import TechForm from './TechForm.jsx'
import { PageHeader } from './AdminUI.jsx'
import { getTechIconUrl } from '../../data/techIcons.js'

export default function TechManager() {
  const [tech, setTech] = useState([])
  const [editing, setEditing] = useState(null)
  const [showNew, setShowNew] = useState(false)

  const load = () => {
    getTech().then(setTech).catch(() => {})
    setEditing(null)
    setShowNew(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this tech item?')) return
    try {
      await deleteTech(id)
      load()
    } catch {
      alert('Delete failed')
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Tech Stack"
        description="These cards appear in the Tech Stack section on the public site."
        actions={
          <button
            type="button"
            onClick={() => { setShowNew(true); setEditing(null) }}
            className="admin-btn admin-btn--primary admin-btn--sm"
          >
            + New Tech
          </button>
        }
      />

      {(showNew || editing) && <TechForm tech={editing} onDone={load} />}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tech.map((item) => {
          const icon = item.iconUrl || getTechIconUrl(item.name) || getTechIconUrl(item.iconKey)
          return (
            <article key={item._id} className="admin-tech-card">
              <div className="flex items-center gap-3">
                <span className="admin-tech-icon">
                  {icon ? <img src={icon} alt={item.name} /> : item.name.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="admin-tech-name">{item.name}</h3>
                  <p className="admin-tech-meta">{item.category} · {item.type}</p>
                </div>
                <span className={`admin-badge ${item.visible !== false ? 'admin-badge--live' : 'admin-badge--muted'}`}>
                  {item.visible !== false ? 'Visible' : 'Hidden'}
                </span>
              </div>

              <div className="admin-tech-footer">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setEditing(item); setShowNew(false) }}
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="admin-btn admin-btn--danger admin-btn--sm"
                  >
                    Delete
                  </button>
                </div>
                <span className="admin-tech-order">#{item.order}</span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
