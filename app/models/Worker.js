import mongoose from 'mongoose'

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  shift: { type: String },
  responsability: { type: String, required: true },
  observations: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('workers', workerSchema)