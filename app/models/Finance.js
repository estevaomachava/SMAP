import mongoose from 'mongoose'

const financeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  wage: { type: Number, required: true },
  assistance: { type: Number },
  discounts: { type: Number },
  date: { type: Date, defaultValue: Date.now() }
}, { timestamps: true })

export default mongoose.model('finances', financeSchema)