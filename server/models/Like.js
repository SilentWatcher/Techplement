import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true },
    scope: { type: String, enum: ['site', 'project'], required: true },
    targetId: { type: String, default: null },
  },
  { timestamps: true }
)

likeSchema.index({ visitorId: 1, scope: 1, targetId: 1 }, { unique: true })
likeSchema.index({ scope: 1, targetId: 1 })

export default mongoose.model('Like', likeSchema)
