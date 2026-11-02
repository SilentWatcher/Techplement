import { Router } from 'express'
import Profile from '../models/Profile.js'
import auth from '../middleware/auth.js'
import { normalizeProfile } from '../content.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) profile = await Profile.create({})
    res.json(normalizeProfile(profile))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/', auth, async (req, res) => {
  try {
    const payload = { ...req.body }
    delete payload._id
    delete payload.__v
    delete payload.createdAt
    delete payload.updatedAt

    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    )
    res.json(normalizeProfile(profile))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
