import mongoose from 'mongoose'
import Worker from '../models/Worker'

class WorkerController {
  async index(req, res) {
    const workers = await Worker.find().sort('area')

    if (!workers) {
      req.flash('err', 'Não é possível listar o pessoal!')
      res.redirect('/workers')
    }

    return res.json(workers)
  }

  async show(req, res) {
    const { id } = req.params
    const worker = await Worker.find({ _id: id })
    if (!worker) {
      req.flash('err', 'Não é possível listar o funcionário seleccionado!')
      res.redirect('/workers')
    }
    res.render('editWorker', { worker: worker, workers: true, all: true })
  }

  async store(req, res) {
    const { name, area, shift, responsability, observations } = req.body

    const workers = await Worker.create({ name, area, shift, responsability, observations })

    if (!workers) {
      req.flash('err', 'Não foi possível salvar os dados')
      return res.redirect('/workers')
    }
    req.flash('success', 'Os dados foram salvos com successo!')
    return res.redirect('/workers')
  }

  async update(req, res) {
    const { id, name, area, shift, responsability, observations } = req.body

    await Worker.findOne({ _id: id }).then(std => {
      std.name = name,
        std.area = area,
        std.shift = shift,
        std.responsability = responsability,
        std.observations = observations

      const worker = std.save()
      if (!worker) {
        req.flash('err', 'Não foi possível atualizar os dados')
        return res.redirect('/workers')
      }
      req.flash('success', 'Os dados foram atualizados com successo!')
      return res.redirect('/workers')
    })

  }

  async delete(req, res) {
    const { id } = req.params

    const worker = await Worker.findByIdAndDelete(id)
    if (!worker) {
      req.flash('err', 'Não foi possível eliminar os dados')
      return res.redirect('/workers')
    }
    req.flash('success', 'Os dados foram eliminados com successo!')
    return res.redirect('/workers')
  }
}

export default new WorkerController()