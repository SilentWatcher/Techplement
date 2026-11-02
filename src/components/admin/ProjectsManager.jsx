import { useEffect, useState } from 'react'
import {
  deleteProject,
  getProjects,
  getPublicMetrics,
  reorderProjects,
  updateProject,
} from '../../api/client.js'
import ProjectForm from './ProjectForm.jsx'
import { PageHeader } from './AdminUI.jsx'

export default function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [metrics, setMetrics] = useState({ projects: {} })
  const [editing, setEditing] = useState(null)
  const [showNew, setShowNew] = useState(false)

  const load = () => {
    getProjects().then(setProjects).catch(() => {})
    getPublicMetrics().then(setMetrics).catch(() => {})
    setEditing(null)
    setShowNew(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this project and its analytics?')) return
    try {
      await deleteProject(id)
      load()
    } catch {
      alert('Delete failed')
    }
  }

  const moveProject = async (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= projects.length) return

    const ids = projects.map((project) => project._id)
    ;[ids[index], ids[target]] = [ids[target], ids[index]]

    try {
      const ordered = await reorderProjects(ids)
      setProjects(ordered)
    } catch {
      alert('Could not change project order')
    }
  }

  const togglePublished = async (project) => {
    const nextPublished = project.ispublished === false
    try {
      const updated = await updateProject(project._id, {
        ...project,
        ispublished: nextPublished,
      })
      setProjects((current) =>
        current.map((item) => (item._id === updated._id ? updated : item))
      )
    } catch {
      alert('Could not update project visibility')
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Projects"
        description="Control details, external links, tech chips, visibility and order."
        actions={
          <button
            type="button"
            onClick={() => { setShowNew(true); setEditing(null) }}
            className="admin-btn admin-btn--primary admin-btn--sm"
          >
            + New Project
          </button>
        }
      />

      {(showNew || editing) && <ProjectForm project={editing} onDone={load} />}

      {projects.length === 0 ? (
        <div className="admin-empty-card">
          <p>No projects yet.</p>
          <button type="button" onClick={() => setShowNew(true)} className="admin-btn admin-btn--primary admin-btn--sm">
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, index) => {
            const stat = metrics.projects?.[project._id] || { views: 0, likes: 0 }
            const isPublished = project.ispublished !== false

            return (
              <article key={project._id} className="admin-project-card">
                <div className="admin-project-media">
                  {project.image ? (
                    <img src={project.image} alt={project.imageAlt || project.title} />
                  ) : (
                    <span className="admin-project-media-fallback">{project.title?.slice(0, 2)}</span>
                  )}
                  <div className="admin-project-media-top">
                    <span className="admin-badge admin-badge--dark">#{String(index + 1).padStart(2, '0')}</span>
                    <span className={`admin-badge ${isPublished ? 'admin-badge--live' : 'admin-badge--muted'}`}>
                      {isPublished ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                </div>

                <div className="admin-project-body">
                  <div className="admin-project-tags">
                    <span>{project.tag || 'Untagged'}</span>
                    {project.status === 'coming-soon' && <span className="admin-badge admin-badge--warn">Coming soon</span>}
                    {project.status === 'archived' && <span className="admin-badge admin-badge--muted">Archived</span>}
                  </div>

                  <h3 className="admin-project-title">{project.title}</h3>
                  <p className="admin-project-desc">{project.description}</p>

                  <div className="admin-project-meta">
                    <span title="Views">◉ {stat.views} views</span>
                    <span title="Likes">♥ {stat.likes} likes</span>
                    <span title="Links">{project.links?.length || 0} links</span>
                  </div>

                  <div className="admin-project-actions">
                    <button
                      type="button"
                      onClick={() => { setEditing(project); setShowNew(false) }}
                      className="admin-btn admin-btn--ghost admin-btn--sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePublished(project)}
                      className={`admin-btn admin-btn--sm ${isPublished ? 'admin-btn--warn' : 'admin-btn--success'}`}
                    >
                      {isPublished ? 'Hide' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(project._id)}
                      className="admin-btn admin-btn--danger admin-btn--sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="admin-project-order">
                  <span>Site order #{index + 1}</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveProject(index, -1)}
                      disabled={index === 0}
                      className="admin-icon-btn admin-icon-btn--xs"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveProject(index, 1)}
                      disabled={index === projects.length - 1}
                      className="admin-icon-btn admin-icon-btn--xs"
                      title="Move down"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
