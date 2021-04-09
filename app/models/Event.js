import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  reasons: { type: String },
  partakers: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('events', eventSchema)