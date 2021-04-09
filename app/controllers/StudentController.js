import mongoose from 'mongoose'
import Student from '../models/Student'
import deleteFile from '../middlewares/deleteFile'

class StudentController {
  async index(req, res) {

    const students = await Student.find()

    if (!students) {
      req.flash('err', 'Não é possível listar todas as classes!')
      res.redirect('/students')
    }

    return res.json(students)
  }

  async show(req, res) {
    const { classe } = req.body

    const students = await Student.find({ classe }).sort('name')
    if (!students) {
      req.flash('err', 'Não é possível listar a classe seleccionada!')
      res.redirect('/students')
    }
    return res.json(students)
  }

  async store(req, res) {
    const { name, father, mother, year, month, day, bi, city, neighbor, background, gender, civil, classe, enrol, observation, secretary } = req.body
    const { filename: file } = req.file

    const born = new Date(`${year}, ${month}, ${day}`)

    const student = await Student.create({
      name, file, father, mother, born, bi, city, neighbor, background, gender, civil, classe, enrol, observation, secretary })

    if (!student) {
      req.flash('err', 'Não foi possível salvar os dados')
      return res.redirect('/students')
    }
    req.flash('success', 'Os dados foram salvos com successo!')
    return res.redirect('/students')
  }

  async update(req, res) {
    const { id, name, father, mother, bi, city, neighbor, background, gender, civil, classe, enrol, observation, secretary } = req.body

    await Student.findOne({ _id: id }).then(std => {
        std.name = name,
        std.father = father,
        std.mother = mother,
        std.bi = bi,
        std.city = city,
        std.neighbor = neighbor,
        std.background = background,
        std.gender = gender,
        std.civil = civil,
        std.classe = classe,
        std.enrol = enrol,
        std.observation = observation,
        std.secretary = secretary

      const student = std.save()
      if (!student) {
        req.flash('err', 'Não foi possível atualizar os dados')
        return res.redirect('/students')
      }
      req.flash('success', 'Os dados foram atualizados com successo!')
      return res.redirect('/students')
    })


  }

  async delete(req, res) {
    const { id } = req.params
    const { file } = await Student.findById(id)

    deleteFile(file, 'image')
    
    const student = await Student.findByIdAndDelete(id)
    if (!student) {
      req.flash('err', 'Não foi possível eliminar os dados')
      return res.redirect('/students')
    }
    req.flash('success', 'Os dados foram eliminados com successo!')
    return res.redirect('/students')
  }

}

export default new StudentController()