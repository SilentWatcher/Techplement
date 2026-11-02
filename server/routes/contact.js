import { Router } from 'express'
import ContactMessage from '../models/ContactMessage.js'

const router = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/', async (req, res) => {
  try {
    const { name, email, missionType, message } = req.body || {}

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' })
    }
    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return res.status(400).json({ message: 'A valid email is required' })
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' })
    }

    const doc = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      missionType: (missionType || 'Other').trim(),
      message: message.trim(),
    })

    res.status(201).json({ success: true, id: doc._id })
  } catch (err) {
    res.status(500).json({ message: err?.message || 'Failed to save message' })
  }
})

export default router
