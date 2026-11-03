import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api'

const api = axios.create({ baseURL: API_BASE })

function notifyContentSaved() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('content:saved'))
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Public content
export const getContent = () => api.get('/v1/content').then((r) => r.data)
export const getSettings = () => api.get('/v1/settings').then((r) => r.data)
export const updateSettings = (data) => api.put('/v1/settings', data).then((r) => { notifyContentSaved(); return r.data })

export const getProfile = () => api.get('/v1/profile').then((r) => r.data)
export const updateProfile = (data) => api.put('/v1/profile', data).then((r) => { notifyContentSaved(); return r.data })

export const getProjects = () => api.get('/v1/projects').then((r) => r.data)
export const createProject = (data) => api.post('/v1/projects', data).then((r) => { notifyContentSaved(); return r.data })
export const updateProject = (id, data) => api.put(`/v1/projects/${id}`, data).then((r) => { notifyContentSaved(); return r.data })
export const reorderProjects = (ids) => api.put('/v1/projects/reorder', { ids }).then((r) => { notifyContentSaved(); return r.data })
export const deleteProject = (id) => api.delete(`/v1/projects/${id}`).then((r) => { notifyContentSaved(); return r.data })

// Tech stack
export const getTech = () => api.get('/v1/tech').then((r) => r.data)
export const createTech = (data) => api.post('/v1/tech', data).then((r) => { notifyContentSaved(); return r.data })
export const updateTech = (id, data) => api.put(`/v1/tech/${id}`, data).then((r) => { notifyContentSaved(); return r.data })
export const deleteTech = (id) => api.delete(`/v1/tech/${id}`).then((r) => { notifyContentSaved(); return r.data })

// Auth
export const login = (email, password) =>
  api.post('/v1/auth/login', { email, password }).then((r) => r.data)

// Upload
export const uploadImage = (file) => {
  const fd = new FormData()
  fd.append('image', file)
  return api.post('/v1/upload', fd).then((r) => r.data)
}

// Contact
export const sendContactMessage = (data) =>
  api.post('/v1/contact', data).then((r) => r.data)

// Analytics
export const getPublicMetrics = (visitorId) =>
  api.get('/v1/metrics/public', { params: { visitorId } }).then((r) => r.data)
export const trackView = (payload) => api.post('/v1/metrics/view', payload).then((r) => r.data)
export const toggleLike = (payload) => api.post('/v1/metrics/like', payload).then((r) => r.data)
export const getAdminSummary = (days = 30) =>
  api.get('/v1/metrics/admin/summary', { params: { days } }).then((r) => r.data)

export default api
