import { Router } from 'express'
import mongoose from 'mongoose'
import Project from '../models/Project.js'
import Metric from '../models/Metric.js'
import VisitorDay from '../models/VisitorDay.js'
import RecentView from '../models/RecentView.js'
import Like from '../models/Like.js'
import auth from '../middleware/auth.js'
import { normalizeProject } from '../content.js'

const router = Router()

function cleanPayload(body = {}) {
  const normalized = normalizeProject(body)
  delete normalized._id
  delete normalized.__v
  delete normalized.createdAt
  delete normalized.updatedAt
  return normalized
}

router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 }).lean()
    res.json(projects.map(normalizeProject))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.create(cleanPayload(req.body))
    res.status(201).json(normalizeProject(project))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/reorder', auth, async (req, res) => {
  try {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids : []
    const validIds = ids.filter((id) => mongoose.isValidObjectId(id))
    if (validIds.length !== ids.length) {
      return res.status(400).json({ message: 'Invalid project id in order list' })
    }

    if (validIds.length) {
      await Project.bulkWrite(
        validIds.map((id, index) => ({
          updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
        }))
      )
    }

    const projects = await Project.find().sort({ order: 1 }).lean()
    res.json(projects.map(normalizeProject))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, cleanPayload(req.body), {
      new: true,
      runValidators: true,
    })
    if (!project) return res.status(404).json({ message: 'Not found' })
    res.json(normalizeProject(project))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    await Project.findByIdAndDelete(id)
    await Promise.all([
      Metric.deleteMany({ scope: 'project', targetId: id }),
      VisitorDay.deleteMany({ scope: 'project', targetId: id }),
      RecentView.deleteMany({ scope: 'project', targetId: id }),
      Like.deleteMany({ scope: 'project', targetId: id }),
    ])
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
