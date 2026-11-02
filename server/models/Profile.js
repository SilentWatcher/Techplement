import mongoose from 'mongoose'

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, default: '' },
    label: { type: String, default: '' },
    url: { type: String, default: '' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { _id: false }
)

const aboutCardSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    icon: { type: String, default: '' },
    tags: [{ type: String }],
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { _id: false }
)

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Vikas Sr Vitekari' },
    title: { type: String, default: 'UI Designer and Frontend Developer' },
    bio: { type: String, default: '' },
    aboutParagraph: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    resumeLabel: { type: String, default: 'Resume' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    quote: { type: String, default: '' },
    // Legacy object shape kept so old documents can still be read during migration.
    socialLinks: { type: mongoose.Schema.Types.Mixed, default: [] },
    aboutCards: [aboutCardSchema],
  },
  { timestamps: true, minimize: false }
)

export default mongoose.model('Profile', profileSchema)
