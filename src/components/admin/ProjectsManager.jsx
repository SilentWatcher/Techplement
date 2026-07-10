import { useState, useEffect } from 'react'
import { getProjects, deleteProject } from '../../api/client.js'
import ProjectForm from './ProjectForm.jsx'

export default function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [showNew, setShowNew] = useState(false)

  const load = () => {
    getProjects().then(setProjects).catch(() => {})
    setEditing(null)
    setShowNew(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await deleteProject(id)
      load()
    } catch {
      alert('Delete failed')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-signika text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <button
          onClick={() => { setShowNew(true); setEditing(null) }}
          className="bg-gray-900 dark:bg-violet-600 text-white px-4 py-2 rounded-lg font-signika text-sm hover:bg-gray-800 dark:hover:bg-violet-500 transition-colors"
        >
          + New Project
        </button>
      </div>

      {(showNew || editing) && (
        <div className="mb-8">
          <ProjectForm project={editing} onDone={load} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p._id} className="bg-white dark:bg-[#12121a] rounded-xl border border-gray-200 dark:border-white/5 overflow-hidden transition-colors">
            {p.image && (
              <img src={p.image} alt={p.title} className="h-32 w-full object-cover" />
            )}
            <div className="p-4">
              <span className="text-xs bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{p.tag}</span>
              <h3 className="font-signika font-semibold text-lg mt-1 text-gray-900 dark:text-white">{p.title}</h3>
              <p className="font-oxygen text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{p.description}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { setEditing(p); setShowNew(false) }}
                  className="text-sm bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-sm bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
