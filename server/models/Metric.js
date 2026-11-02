import mongoose from 'mongoose'

const metricSchema = new mongoose.Schema(
  {
    scope: { type: String, enum: ['site', 'project'], required: true },
    targetId: { type: String, default: null },
    date: { type: String, required: true },
    views: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
  },
  { timestamps: true }
)

metricSchema.index({ scope: 1, targetId: 1, date: 1 }, { unique: true })

export default mongoose.model('Metric', metricSchema)
