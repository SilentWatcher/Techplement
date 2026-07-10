import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import profileRoutes from './routes/profile.js'
import projectRoutes from './routes/projects.js'
import cloudinary from './cloudinary.js'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/projects', projectRoutes)

app.post('/api/upload', upload.single('image'), async (req, res) => {
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
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB connected')
  app.listen(PORT, () => console.log(`Server on port ${PORT}`))
}).catch((err) => {
  console.error('MongoDB connection error:', err.message)
  process.exit(1)
})
