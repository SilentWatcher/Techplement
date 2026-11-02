import { Router } from 'express'
import SiteSettings from '../models/SiteSettings.js'
import Profile from '../models/Profile.js'
import Project from '../models/Project.js'
import Tech from '../models/Tech.js'
import auth from '../middleware/auth.js'
import { defaultSiteSettings } from '../../shared/contentDefaults.js'
import {
  defaultTechList,
  normalizeSettings,
  normalizeProfile,
  normalizeProject,
  normalizeTech,
} from '../content.js'

const router = Router()

async function getSettings() {
  let settings = await SiteSettings.findOne({ key: 'site' })
  if (!settings) {
    settings = await SiteSettings.create(defaultSiteSettings)
  }
  return normalizeSettings(settings)
}

async function getProfile() {
  let profile = await Profile.findOne()
  if (!profile) {
    profile = await Profile.create({})
  }
  return normalizeProfile(profile)
}

router.get('/content', async (_req, res) => {
  try {
    const [settings, profile, projects, tech] = await Promise.all([
      getSettings(),
      getProfile(),
      Project.find().sort({ order: 1 }).lean(),
      Tech.find().sort({ order: 1 }).lean(),
    ])

    res.json({
      schemaVersion: 1,
      settings,
      profile,
      projects: projects.map(normalizeProject),
      tech: (tech.length ? tech : defaultTechList()).map(normalizeTech),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/settings', async (_req, res) => {
  try {
    res.json(await getSettings())
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/settings', auth, async (req, res) => {
  try {
    const current = await getSettings()
    const incoming = req.body || {}
    const merged = { ...current }

    for (const [key, value] of Object.entries(incoming)) {
      if (key === 'key' || key === '_id') continue
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        merged[key] = { ...(current[key] || {}), ...value }
      } else {
        merged[key] = value
      }
    }

    merged.key = 'site'
    const saved = await SiteSettings.findOneAndUpdate(
      { key: 'site' },
      { $set: merged },
      { new: true, upsert: true, runValidators: true }
    )
    res.json(normalizeSettings(saved))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
