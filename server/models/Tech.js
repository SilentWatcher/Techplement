import mongoose from 'mongoose'

const techSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    iconKey: { type: String, default: '' },
    iconUrl: { type: String, default: '' },
    category: { type: String, default: 'Tech' },
    type: { type: String, default: 'Tool' },
    glow: { type: String, default: 'white' },
    tier: { type: String, enum: ['primary', 'secondary', 'other'], default: 'primary' },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model('Tech', techSchema)
