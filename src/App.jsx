import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'
import { MetricsProvider } from './context/MetricsContext.jsx'
import ProtectedRoute from './components/shared/ProtectedRoute.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Admin from './pages/Admin.jsx'
import Login from './components/admin/Login.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ContentProvider>
                <MetricsProvider>
                  <Portfolio />
                </MetricsProvider>
              </ContentProvider>
            }
          />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}
