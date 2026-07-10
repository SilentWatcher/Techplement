import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tag: { type: String, default: '' },
  image: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  sourceCodeUrl: { type: String, default: '' },
  comingSoon: { type: Boolean, default: false },
  bgColor: { type: String, default: '#dbd6d6' },
  order: { type: Number, default: 0 },
})

export default mongoose.model('Project', projectSchema)
