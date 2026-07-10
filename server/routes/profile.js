import { Router } from 'express'
import Profile from '../models/Profile.js'
import auth from '../middleware/auth.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    let profile = await Profile.findOne()
    if (!profile) {
      profile = await Profile.create({})
    }
    res.json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    )
    res.json(profile)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
