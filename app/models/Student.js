import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  file: { type: String, required: true },
  father: { type: String, required: true },
  mother: { type: String, required: true },
  born: { type: Date, required: true },
  bi: { type: String, required: true },
  city: { type: String, required: true },
  neighbor: { type: String, required: true },
  background: { type: String, required: true },
  gender: { type: String, required: true },
  civil: { type: String, required: true },
  classe: { type: String, required: true },
  enrol: { type: String, required: true },
  observation: { type: String, required: true },
  secretary: { type: String, required: true },
  assignDate: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model('students', studentSchema)