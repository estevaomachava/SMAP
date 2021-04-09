import mongoose from 'mongoose'
import Student from '../models/Student'

async function editStudents(req, res) {
  const { id } = req.params
    const student = await Student.find({ _id:id })
    if(!student){
      req.flash('err', 'Não é possível listar o estudante seleccionado!')
      res.redirect('/students')
    }
    res.render('editStudent', { student: student, students: true, all: true })
}

export default editStudents