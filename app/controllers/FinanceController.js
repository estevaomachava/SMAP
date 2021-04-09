import mongoose from 'mongoose'
import Finance from '../models/Finance'

class FinanceController {
  async index(req, res) {
    const finances = await Finance.find()

    if (!finances) {
      req.flash('err', 'Não é possível listar as finanças!')
      res.redirect('/finances')
    }

    return res.json(finances)
  }

  async show(req, res) {
    const { id } = req.params
    const finance = await Finance.find({ _id: id })
    if (!finance) {
      req.flash('err', 'Não é possível listar o item seleccionado!')
      res.redirect('/workers')
    }
    res.render('editFinance', { finance: finance, finances: true, all: true })
  }

  async store(req, res) {
    const { name, wage, assistance, discounts } = req.body

    const finances = await Finance.create({ name, wage, assistance, discounts })

    if (!finances) {
      req.flash('err', 'Não foi possível salvar os dados')
      return res.redirect('/finances')
    }
    req.flash('success', 'Os dados foram salvos com successo!')
    return res.redirect('/finances')
  }

  async update(req, res) {
    const { id, name, wage, assistance, discounts } = req.body

    await Finance.findOne({ _id: id }).then(std => {
      std.name = name,
      std.wage = wage,
      std.assistance = assistance,
      std.discounts = discounts

      const finance = std.save()
      if (!finance) {
        req.flash('err', 'Não foi possível atualizar os dados')
        return res.redirect('/finances')
      }
      req.flash('success', 'Os dados foram atualizados com successo!')
      return res.redirect('/finances')
    })

  }

  async delete(req, res) {
    const { id } = req.params

    const finance = await Finance.findByIdAndDelete(id)
    if (!finance) {
      req.flash('err', 'Não foi possível eliminar os dados')
      return res.redirect('/finances')
    }
    req.flash('success', 'Os dados foram eliminados com successo!')
    return res.redirect('/finances')
  }
}

export default new FinanceController()