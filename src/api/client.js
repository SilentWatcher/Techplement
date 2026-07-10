import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getProfile = () => api.get('/profile').then((r) => r.data)
export const updateProfile = (data) => api.put('/profile', data).then((r) => r.data)

export const getProjects = () => api.get('/projects').then((r) => r.data)
export const createProject = (data) => api.post('/projects', data).then((r) => r.data)
export const updateProject = (id, data) => api.put(`/projects/${id}`, data).then((r) => r.data)
export const deleteProject = (id) => api.delete(`/projects/${id}`).then((r) => r.data)

export const login = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data)

export const uploadImage = (file) => {
  const fd = new FormData()
  fd.append('image', file)
  return api.post('/upload', fd).then((r) => r.data)
}

export default api
