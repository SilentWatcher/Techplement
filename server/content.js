import { defaultSiteSettings, defaultProfile, defaultTech, SOCIAL_ICONS, slugify } from '../shared/contentDefaults.js'

function isPlainObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)
}

export function deepMerge(base, value) {
  if (Array.isArray(value)) return value
  if (!isPlainObject(value)) return value === undefined || value === null ? base : value
  const out = isPlainObject(base) ? { ...base } : {}
  for (const [key, next] of Object.entries(value)) {
    if (['_id', '__v', 'createdAt', 'updatedAt'].includes(key)) continue
    out[key] = isPlainObject(next) ? deepMerge(out[key], next) : next
  }
  return out
}

function toPlain(doc) {
  return doc && typeof doc.toObject === 'function' ? doc.toObject({ versionKey: false }) : doc
}

export function normalizeSettings(doc) {
  const merged = deepMerge(defaultSiteSettings, toPlain(doc) || {})
  merged.key = 'site'
  merged.nav = merged.nav || { links: [] }
  merged.nav.links = (merged.nav.links || [])
    .map((link, index) => ({
      label: link.label || '',
      href: link.href || '',
      order: Number.isFinite(link.order) ? link.order : index,
      visible: link.visible !== false,
    }))
    .sort((a, b) => a.order - b.order)
  return merged
}

function normalizeSocialLinks(value) {
  if (Array.isArray(value)) {
    return value
      .map((link, index) => ({
        platform: link.platform || '',
        label: link.label || link.platform || '',
        url: link.url || '',
        icon: link.icon || SOCIAL_ICONS[link.platform] || '',
        order: Number.isFinite(link.order) ? link.order : index,
        visible: link.visible !== false,
      }))
      .filter((link) => link.url)
      .sort((a, b) => a.order - b.order)
  }

  if (isPlainObject(value)) {
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

  return []
}

export function normalizeProfile(doc) {
  const raw = toPlain(doc) || defaultProfile
  const merged = deepMerge(defaultProfile, raw)
  merged.socialLinks = normalizeSocialLinks(raw.socialLinks || defaultProfile.socialLinks)
  if (!merged.socialLinks.length) {
    merged.socialLinks = normalizeSocialLinks(defaultProfile.socialLinks)
  }
  merged.aboutCards = (merged.aboutCards || [])
    .map((card, index) => ({
      title: card.title || '',
      description: card.description || '',
      icon: card.icon || '',
      tags: Array.isArray(card.tags) ? card.tags.filter(Boolean) : [],
      order: Number.isFinite(card.order) ? card.order : index,
      visible: card.visible !== false,
    }))
    .filter((card) => card.title || card.description)
    .sort((a, b) => a.order - b.order)
  if (!merged.aboutCards.length) merged.aboutCards = defaultProfile.aboutCards
  return merged
}

export function normalizeProject(doc) {
  const raw = toPlain(doc) || {}
  let links = Array.isArray(raw.links) ? raw.links : []
  if (!links.length) {
    links = []
    if (raw.liveUrl) {
      links.push({ label: 'Live', url: raw.liveUrl, type: 'live', order: 0, visible: true })
    }
    if (raw.sourceCodeUrl) {
      links.push({ label: 'Code', url: raw.sourceCodeUrl, type: 'source', order: 1, visible: true })
    }
  }
  const status =
    raw.status ||
    (raw.comingSoon ? 'coming-soon' : raw.ispublished === false ? 'archived' : 'live')

  return {
    ...raw,
    slug: raw.slug || slugify(raw.title),
    imageAlt: raw.imageAlt || raw.title || '',
    links: links
      .map((link, index) => ({
        label: link.label || 'Link',
        url: link.url || '',
        type: link.type || 'custom',
        order: Number.isFinite(link.order) ? link.order : index,
        visible: link.visible !== false,
      }))
      .filter((link) => link.url)
      .sort((a, b) => a.order - b.order),
    techStack: Array.isArray(raw.techStack) ? raw.techStack.filter(Boolean) : [],
    status,
    comingSoon: status === 'coming-soon',
    featured: raw.featured === true,
    ispublished: raw.ispublished !== false,
  }
}

export function normalizeTech(doc) {
  const raw = toPlain(doc) || {}
  return {
    ...raw,
    name: raw.name || '',
    iconKey: raw.iconKey || '',
    iconUrl: raw.iconUrl || '',
    category: raw.category || 'Tech',
    type: raw.type || 'Tool',
    glow: raw.glow || 'white',
    tier: raw.tier || 'primary',
    order: Number.isFinite(raw.order) ? raw.order : 0,
    visible: raw.visible !== false,
  }
}

export function defaultTechList() {
  return defaultTech.map((tech) => ({ ...tech }))
}
