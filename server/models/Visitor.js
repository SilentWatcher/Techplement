import mongoose from 'mongoose'

const visitorSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, unique: true },
    firstSeen: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default mongoose.model('Visitor', visitorSchema)
