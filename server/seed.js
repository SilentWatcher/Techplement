import 'dotenv/config'
import mongoose from 'mongoose'
import Admin from './models/Admin.js'
import Profile from './models/Profile.js'
import Project from './models/Project.js'
import SiteSettings from './models/SiteSettings.js'
import Tech from './models/Tech.js'
import {
  defaultProfile,
  defaultProjects,
  defaultSiteSettings,
  defaultTech,
} from '../shared/contentDefaults.js'

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected')

  const exists = await Admin.findOne({ email: 'admin@portfolio.com' })
  if (!exists) {
    await Admin.create({ email: 'admin@portfolio.com', password: 'admin123' })
    console.log('Admin created: admin@portfolio.com / admin123')
  }

  const profile = await Profile.findOne()
  if (!profile) {
    await Profile.create(defaultProfile)
    console.log('Profile seeded')
  }

  const settings = await SiteSettings.findOne({ key: 'site' })
  if (!settings) {
    await SiteSettings.create(defaultSiteSettings)
    console.log('Site settings seeded')
  }

  const techCount = await Tech.countDocuments()
  if (techCount === 0) {
    await Tech.insertMany(defaultTech)
    console.log('Tech stack seeded')
  }

  const projectCount = await Project.countDocuments()
  if (projectCount === 0) {
    await Project.insertMany(defaultProjects)
    console.log('Projects seeded')
  }

  await mongoose.disconnect()
  console.log('Done')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
