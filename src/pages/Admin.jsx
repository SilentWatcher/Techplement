import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar.jsx'
import Dashboard from '../components/admin/Dashboard.jsx'
import ProfileEditor from '../components/admin/ProfileEditor.jsx'
import ProjectsManager from '../components/admin/ProjectsManager.jsx'

export default function Admin() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-8 max-md:p-4">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="projects" element={<ProjectsManager />} />
        </Routes>
      </main>
    </div>
  )
}
