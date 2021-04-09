import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import passport from 'passport'

import User from './../models/User'

class UserController{

  async store(req, res){
    const { email, password } = req.body
    const hash = await bcrypt.hash(password.toString(), 10)

    const user = await User.create({
      email,
      password: hash
    })

    if(!user) {
      res.render('login', { error: 'Houve um erro ao salvar o usuário!'})
    }

    res.render('login', { success: 'O usuário salvo com successo!'})
  }
}

export default new UserController()