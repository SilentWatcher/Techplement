import 'dotenv/config'
import mongoose from 'mongoose'
import Profile from './models/Profile.js'
import Project from './models/Project.js'
import SiteSettings from './models/SiteSettings.js'
import Tech from './models/Tech.js'
import {
  defaultProfile,
  defaultProjects,
  defaultSiteSettings,
  defaultTech,
  SOCIAL_ICONS,
  slugify,
} from '../shared/contentDefaults.js'

function migrateSocialLinks(profile) {
  const value = profile.socialLinks
  if (Array.isArray(value) && value.length) return value
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([, url]) => !!url)
      .map(([platform, url], index) => ({
        platform,
        label: platform.charAt(0).toUpperCase() + platform.slice(1),
        url,
        icon: SOCIAL_ICONS[platform] || '',
        order: index,
        visible: true,
      }))
  }
  return defaultProfile.socialLinks
}

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected')

  // Site settings — fill in any new fields without overwriting existing edits.
  let settings = await SiteSettings.findOne({ key: 'site' })
  if (!settings) {
    await SiteSettings.create(defaultSiteSettings)
    console.log('Created site settings')
  } else {
    const current = settings.toObject()
    const merged = {
      ...defaultSiteSettings,
      ...current,
      seo: { ...defaultSiteSettings.seo, ...(current.seo || {}) },
      brand: { ...defaultSiteSettings.brand, ...(current.brand || {}) },
      nav: current.nav?.links?.length ? current.nav : defaultSiteSettings.nav,
      hero: { ...defaultSiteSettings.hero, ...(current.hero || {}) },
      about: { ...defaultSiteSettings.about, ...(current.about || {}) },
      tech: { ...defaultSiteSettings.tech, ...(current.tech || {}) },
      projects: { ...defaultSiteSettings.projects, ...(current.projects || {}) },
      footer: { ...defaultSiteSettings.footer, ...(current.footer || {}) },
    }
    merged.key = 'site'
    await SiteSettings.updateOne({ _id: settings._id }, { $set: merged })
    console.log('Updated site settings')
  }

  // Profile — convert old social object + add card metadata.
  let profile = await Profile.findOne()
  if (!profile) {
    await Profile.create(defaultProfile)
    console.log('Created profile')
  } else {
    const current = profile.toObject()
    const cards = (current.aboutCards?.length ? current.aboutCards : defaultProfile.aboutCards).map(
      (card, index) => ({
        title: card.title || '',
        description: card.description || '',
        icon: card.icon || '',
        tags: Array.isArray(card.tags) ? card.tags : defaultProfile.aboutCards[index]?.tags || [],
        order: Number.isFinite(card.order) ? card.order : index,
        visible: card.visible !== false,
      })
    )
    await Profile.updateOne(
      { _id: profile._id },
      {
        $set: {
          name: current.name || defaultProfile.name,
          title: current.title || defaultProfile.title,
          bio: current.bio || defaultProfile.bio,
          aboutParagraph: current.aboutParagraph || defaultProfile.aboutParagraph,
          resumeUrl: current.resumeUrl || defaultProfile.resumeUrl,
          resumeLabel: current.resumeLabel || defaultProfile.resumeLabel,
          email: current.email || defaultProfile.email,
          phone: current.phone || '',
          location: current.location || defaultProfile.location,
          quote: current.quote || defaultProfile.quote,
          socialLinks: migrateSocialLinks(profile),
          aboutCards: cards,
        },
        $unset: { techStacks: 1 },
      }
    )
    console.log('Updated profile')
  }

  // Tech stack — seed once from the current defaults.
  const techCount = await Tech.countDocuments()
  if (techCount === 0) {
    await Tech.insertMany(defaultTech)
    console.log(`Seeded ${defaultTech.length} tech items`)
  } else {
    console.log(`Tech stack already has ${techCount} items`)
  }

  // Projects — add links, techStack, slug, status.
  const projects = await Project.find()
  let updatedProjects = 0
  for (const project of projects) {
    const seedMatch = defaultProjects.find((item) => item.title === project.title)
    const links =
      project.links?.length > 0
        ? project.links
        : [
            ...(project.liveUrl
              ? [{ label: 'Live', url: project.liveUrl, type: 'live', order: 0, visible: true }]
              : []),
            ...(project.sourceCodeUrl
              ? [{ label: 'Code', url: project.sourceCodeUrl, type: 'source', order: 1, visible: true }]
              : []),
          ]

    project.links = links
    project.techStack = project.techStack?.length ? project.techStack : seedMatch?.techStack || []
    project.slug = project.slug || slugify(project.title)
    project.imageAlt = project.imageAlt || project.title
    project.status = project.status || (project.comingSoon ? 'coming-soon' : 'live')
    project.featured = project.featured === true
    await project.save()
    updatedProjects += 1
  }
  console.log(`Updated ${updatedProjects} projects`)

  await mongoose.disconnect()
  console.log('Migration complete')
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
