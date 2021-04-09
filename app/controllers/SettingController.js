import mongoose from 'mongoose'
import Setting from '../models/Setting'

class SettingControler {
  async index(req, res) {
    const color = await Setting.find()
    if (!color) { return res.json({ name:'Infância', color: 'back1.jpg'}) }

    return res.json(color)
  }

  async store(req, res) {
    const { name, color } = req.body

    const { deletedCount } = await Setting.deleteMany()
    if(deletedCount > 0){
      const colors = await Setting.create({ name, color })
      if (!colors) { 
        return res.json({ message: 'There is an error'}) 
      }
      return res.json({ message: 'Ok'})
    }else{
      return res.json({ message: 'There is an error'})
    }


  }

  async update(req, res) {
    const { name, color } = req.body

    await Setting.findOne({ _id: _id }).then(std => {
      std.name = name,
      std.color = color

      const colors = std.save()
      if (!colors) { return res.json({ message: 'There is an error'}) }

      return res.json({ message: 'There is an error'})

    })

  }
}

export default new SettingControler()