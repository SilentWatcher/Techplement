import { useState, useEffect } from 'react'
import { getProfile, getProjects } from '../../api/client.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Dashboard() {
  const { logout } = useAuth()
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {})
    getProjects().then(setProjects).catch(() => {})
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-signika text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 md:hidden">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#12121a] p-6 rounded-xl border border-gray-200 dark:border-white/5 transition-colors">
          <h3 className="font-oxygen text-sm text-gray-500 dark:text-gray-400">Profile</h3>
          <p className="font-signika text-xl font-semibold mt-1 text-gray-900 dark:text-white">
            {profile?.name || '—'}
          </p>
        </div>
        <div className="bg-white dark:bg-[#12121a] p-6 rounded-xl border border-gray-200 dark:border-white/5 transition-colors">
          <h3 className="font-oxygen text-sm text-gray-500 dark:text-gray-400">Projects</h3>
          <p className="font-signika text-xl font-semibold mt-1 text-gray-900 dark:text-white">
            {projects.length}
          </p>
        </div>
        <div className="bg-white dark:bg-[#12121a] p-6 rounded-xl border border-gray-200 dark:border-white/5 transition-colors">
          <h3 className="font-oxygen text-sm text-gray-500 dark:text-gray-400">Social Links</h3>
          <p className="font-signika text-xl font-semibold mt-1 text-gray-900 dark:text-white">
            {Object.values(profile?.socialLinks || {}).filter(Boolean).length}
          </p>
        </div>
      </div>
    </div>
  )
}
