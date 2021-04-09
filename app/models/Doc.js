import mongoose from 'mongoose'

const docSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  file: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('documents', docSchema)