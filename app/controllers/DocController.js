import mongoose from 'mongoose'
import Doc from '../models/Doc'
import deleteFile from "../middlewares/deleteFile"

class DocController {
  async index(req, res) {
    const docs = await Doc.find()

    if (!docs) {
      req.flash('err', 'Não é possível listar os documentos!')
      res.redirect('/documents')
    }

    return res.json(docs)
  }

  async show(req, res) {
    const { id } = req.params
    const docs = await Doc.find({ _id: id })
    if (!docs) {
      req.flash('err', 'Não é possível listar o documento seleccionado!')
      res.redirect('/documents')
    }
    res.render('editDoc', { doc: docs, documents: true, all: true })
  }

  async store(req, res) {
    const { name, description, doc } = req.body
    const { path } = req.file

    const docs = await Doc.create({ name, description, file: path })

    if (!docs) {
      req.flash('err', 'Não foi possível salvar os dados')
      return res.redirect('/documents')
    }
    req.flash('success', 'Os dados foram salvos com successo!')
    return res.redirect('/documents')
  }

  async update(req, res) {
    const { id, name, description } = req.body

    await Doc.findOne({ _id: id }).then(std => {
      std.name = name,
      std.description = description

      const docs = std.save()
      if (!docs) {
        req.flash('err', 'Não foi possível atualizar os dados')
        return res.redirect('/documents')
      }
      req.flash('success', 'Os dados foram atualizados com successo!')
      return res.redirect('/documents')
    })

  }

  async delete(req, res) {
    const { id } = req.params

    const { file } = await Doc.findById(id)
    const docs = await Doc.findByIdAndDelete(id)
    if (!docs) {
      req.flash('err', 'Não foi possível eliminar os dados')
      return res.redirect('/documents')
    }
    deleteFile(file, 'doc')
    req.flash('success', 'Os dados foram eliminados com successo!')
    return res.redirect('/documents')
  }
}

export default new DocController()