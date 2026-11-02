import mongoose from 'mongoose'

const visitorDaySchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true },
    scope: { type: String, enum: ['site', 'project'], required: true },
    targetId: { type: String, default: null },
    date: { type: String, required: true },
  },
  { timestamps: true }
)

visitorDaySchema.index({ visitorId: 1, scope: 1, targetId: 1, date: 1 }, { unique: true })
visitorDaySchema.index({ scope: 1, targetId: 1, date: 1 })

export default mongoose.model('VisitorDay', visitorDaySchema)
