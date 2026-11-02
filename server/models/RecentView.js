import mongoose from 'mongoose'

const recentViewSchema = new mongoose.Schema({
  visitorId: { type: String, required: true },
  scope: { type: String, enum: ['site', 'project'], required: true },
  targetId: { type: String, default: null },
  lastAt: { type: Date, default: Date.now },
})

recentViewSchema.index({ visitorId: 1, scope: 1, targetId: 1 }, { unique: true })
recentViewSchema.index({ lastAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 })

export default mongoose.model('RecentView', recentViewSchema)
