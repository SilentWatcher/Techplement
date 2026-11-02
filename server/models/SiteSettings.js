import mongoose from 'mongoose'

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    schemaVersion: { type: Number, default: 1 },
    designId: { type: String, default: 'project-1' },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: { type: String, default: '' },
      ogImage: { type: String, default: '' },
      favicon: { type: String, default: '' },
    },
    brand: {
      name: { type: String, default: '' },
      logoText: { type: String, default: '' },
      logoImage: { type: String, default: '' },
    },
    nav: {
      links: [
        {
          label: String,
          href: String,
          order: { type: Number, default: 0 },
          visible: { type: Boolean, default: true },
        },
      ],
    },
    hero: {
      statusLabels: [{ type: String }],
      rotatingWords: [{ type: String }],
      role: { type: String, default: '' },
      headline: { type: String, default: '' },
      headlineAccent: { type: String, default: '' },
      secondaryHeadline: { type: String, default: '' },
      description: { type: String, default: '' },
      subtitleItems: [{ type: String }],
      tagline: {
        text: { type: String, default: '' },
        redWords: [{ type: String }],
        whiteWords: [{ type: String }],
      },
      cornerLabels: {
        left: { type: String, default: '' },
        right: { type: String, default: '' },
      },
      primaryCta: {
        label: { type: String, default: 'View Work' },
        href: { type: String, default: '#project' },
      },
      secondaryCta: {
        label: { type: String, default: '' },
        href: { type: String, default: '' },
      },
      resumeLabel: { type: String, default: 'Resume' },
      socialLabel: { type: String, default: 'Follow' },
      scrollLabel: { type: String, default: 'Scroll' },
    },
    hero: {
      statusLabels: [{ type: String }],
      rotatingWords: [{ type: String }],
      role: { type: String, default: '' },
      headline: { type: String, default: '' },
      headlineAccent: { type: String, default: '' },
      secondaryHeadline: { type: String, default: '' },
      description: { type: String, default: '' },
      subtitleItems: [{ type: String }],
      tagline: {
        text: { type: String, default: '' },
        redWords: [{ type: String }],
        whiteWords: [{ type: String }],
      },
      cornerLabels: {
        left: { type: String, default: '' },
        right: { type: String, default: '' },
      },
      primaryCta: {
        label: { type: String, default: 'View Work' },
        href: { type: String, default: '#project' },
      },
      secondaryCta: {
        label: { type: String, default: '' },
        href: { type: String, default: '' },
      },
      resumeLabel: { type: String, default: 'Resume' },
      socialLabel: { type: String, default: 'Follow' },
      scrollLabel: { type: String, default: 'Scroll' },
    },
    about: {
      badge: { type: String, default: '' },
      title: { type: String, default: 'About' },
      hudLeft: { type: String, default: '' },
      hudRight: { type: String, default: '' },
      image: { type: String, default: '' },
      status: { type: String, default: 'ACTIVE' },
      clearance: { type: String, default: 'LEVEL_5' },
      terminalPath: { type: String, default: '' },
      prompts: [{ type: String }],
      commands: [{ command: { type: String, default: '' }, output: { type: String, default: '' } }],
      availability: { type: String, default: 'Available for work' },
      focusText: { type: String, default: '' },
    },
    tech: {
      systemLabel: { type: String, default: '' },
      title: { type: String, default: 'Tech Stack' },
      subtitle: { type: String, default: '' },
      footerBar: { type: String, default: '' },
      hudLeft: { type: String, default: '' },
      hudRight: { type: String, default: '' },
    },
    projects: {
      badge: { type: String, default: '' },
      title: { type: String, default: 'Projects' },
      subtitleTemplate: { type: String, default: '' },
      emptyText: { type: String, default: 'NO_DEPLOYMENTS_FOUND' },
      liveLabel: { type: String, default: 'LIVE' },
      comingSoonLabel: { type: String, default: 'PENDING' },
      launchLabel: { type: String, default: 'LAUNCH' },
      codeLabel: { type: String, default: 'CODE' },
      techLabel: { type: String, default: 'STACK' },
      inspectLabel: { type: String, default: 'INSPECT' },
    },
    footer: {
      contactLabel: { type: String, default: 'Contact' },
      quoteLabel: { type: String, default: 'Something in mind' },
      heading: { type: String, default: "Let's talk." },
      emailLabel: { type: String, default: 'Drop a mail' },
      followLabel: { type: String, default: 'Follow' },
      copyright: { type: String, default: '' },
      credit: { type: String, default: '' },
    },
  },
  { timestamps: true, minimize: false }
)

export default mongoose.model('SiteSettings', siteSettingsSchema)
