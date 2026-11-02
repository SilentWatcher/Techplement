import { Router } from 'express'
import Tech from '../models/Tech.js'
import auth from '../middleware/auth.js'
import { normalizeTech } from '../content.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const tech = await Tech.find().sort({ order: 1 }).lean()
    res.json(tech.map(normalizeTech))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

function cleanPayload(body = {}) {
  const payload = { ...body }
  delete payload._id
  delete payload.__v
  delete payload.createdAt
  delete payload.updatedAt
  return payload
}

router.post('/', auth, async (req, res) => {
  try {
    const tech = await Tech.create(cleanPayload(req.body))
    res.status(201).json(normalizeTech(tech))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const tech = await Tech.findByIdAndUpdate(req.params.id, cleanPayload(req.body), {
      new: true,
      runValidators: true,
    })
    if (!tech) return res.status(404).json({ message: 'Not found' })
    res.json(normalizeTech(tech))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Tech.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
