import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import profileRoutes from './routes/profile.js'
import projectRoutes from './routes/projects.js'
import contentRoutes from './routes/content.js'
import techRoutes from './routes/tech.js'
import metricsRoutes from './routes/metrics.js'
import auth from './middleware/auth.js'
import cloudinary from './cloudinary.js'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith('image/')) {
      return cb(new Error('Only image uploads are allowed'))
    }
    cb(null, true)
  },
})

app.set('trust proxy', 1)
app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Public content API
app.use('/api/v1', contentRoutes)
app.use('/api/v1/tech', techRoutes)
app.use('/api/v1/metrics', metricsRoutes)

// Legacy routes + v1 aliases
app.use('/api/auth', authRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/v1/projects', projectRoutes)

const uploadHandler = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    const dataUri = `data:${req.file.mimetype};base64,${b64}`
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'portfolio',
    })
    res.json({ url: result.secure_url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

app.post('/api/upload', auth, upload.single('image'), uploadHandler)
app.post('/api/v1/upload', auth, upload.single('image'), uploadHandler)

app.use((err, _req, res, next) => {
  if (!err) return next()
  res.status(400).json({ message: err.message || 'Request failed' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`Server on port ${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })
