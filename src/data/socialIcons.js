import { SOCIAL_ICONS } from '../../shared/contentDefaults.js'

export function getSocialLinks(profile) {
  const links = Array.isArray(profile?.socialLinks) ? profile.socialLinks : []
  return links
    .filter((link) => link?.url && link.visible !== false)
    .map((link, index) => ({
      ...link,
      icon: link.icon || SOCIAL_ICONS[link.platform] || '',
      order: Number.isFinite(link.order) ? link.order : index,
    }))
    .sort((a, b) => a.order - b.order)
}

export default SOCIAL_ICONS
