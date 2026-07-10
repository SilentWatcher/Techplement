import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
