import Student from '../models/Student'
import Doc from '../models/Doc'
import Event from '../models/Event'
import Finance from '../models/Finance'
import Worker from '../models/Worker'

async function getAllData(req, res) {
  const student = await Student.find()
  const doc = await Doc.find()
  const event = await Event.find()
  const finance = await Finance.find()
  const worker = await Worker.find()
  return res.json({ student: student, doc: doc, event: event, finance: finance, worker: worker })
}

export default getAllData