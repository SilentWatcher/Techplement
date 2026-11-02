import mongoose from 'mongoose'

const projectLinkSchema = new mongoose.Schema(
  {
    label: { type: String, default: '' },
    url: { type: String, default: '' },
    type: { type: String, default: 'custom' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { _id: false }
)

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, default: '' },
    description: { type: String, default: '' },
    tag: { type: String, default: '' },
    image: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
    links: [projectLinkSchema],
    techStack: [{ type: String }],
    status: {
      type: String,
      enum: ['live', 'coming-soon', 'archived'],
      default: 'live',
    },
    featured: { type: Boolean, default: false },
    comingSoon: { type: Boolean, default: false },
    ispublished: { type: Boolean, default: true },
    bgColor: { type: String, default: '#dbd6d6' },
    order: { type: Number, default: 0 },
    // Legacy URL fields kept for migration compatibility.
    liveUrl: { type: String, default: '' },
    sourceCodeUrl: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
