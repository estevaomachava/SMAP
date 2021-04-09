import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true }
})

export default mongoose.model('settings', settingSchema)