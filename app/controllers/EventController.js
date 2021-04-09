import mongoose from 'mongoose'
import Event from '../models/Event'

class EventController {
  async index(req, res) {
    const events = await Event.find()

    if (!events) {
      req.flash('err', 'Não é possível listar os eventos!')
      res.redirect('/events')
    }

    return res.json(events)
  }

  async show(req, res) {
    const { id } = req.params
    const event = await Event.find({ _id: id })
    if (!event) {
      req.flash('err', 'Não é possível listar o evento seleccionado!')
      res.redirect('/events')
    }
    res.render('editEvent', { event: event, events: true, all: true })
  }

  async store(req, res) {
    const { name, day, month, year, description, reasons, partakers } = req.body

    const date = new Date(`${year}, ${month}, ${day}`)

    const events = await Event.create({
      name, date, description, reasons, partakers
    })

    if (!events) {
      req.flash('err', 'Não foi possível salvar os dados')
      return res.redirect('/events')
    }
    req.flash('success', 'Os dados foram salvos com successo!')
    return res.redirect('/events')
  }

  async update(req, res) {
    const { id, name, day, month, year, description, reasons, partakers } = req.body

    const date = new Date(`${year}, ${month}, ${day}`)

    await Event.findOne({ _id: id }).then(std => {
      std.name = name,
        std.date = date,
        std.description = description,
        std.reasons = reasons,
        std.partakers = partakers

      const event = std.save()
      if (!event) {
        req.flash('err', 'Não foi possível atualizar os dados')
        return res.redirect('/events')
      }
      req.flash('success', 'Os dados foram atualizados com successo!')
      return res.redirect('/events')
    })

  }

  async delete(req, res) {
    const { id } = req.params

    const event = await Event.findByIdAndDelete(id)
    if (!event) {
      req.flash('err', 'Não foi possível eliminar os dados')
      return res.redirect('/events')
    }
    req.flash('success', 'Os dados foram eliminados com successo!')
    return res.redirect('/events')
  }
}

export default new EventController()