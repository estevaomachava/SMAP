import { Strategy } from 'passport-local'
import bcryptjs from 'bcryptjs'

import User from '../app/models/User'

function Auth(passport) {

  passport.use(new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email: email })
    if (!user) {
      return done(null, false, { message: 'Esta conta não existe!' })
    }

    const match = await bcryptjs.compare(password, user.password)
    if (!match) {
      return done(null, false, { message: 'Senha incorrecta!' })
    }
    return done(null, user)
  }))

passport.serializeUser((user, done) => { done(null, user.id) })

passport.deserializeUser((id, done) => { User.findById(id, (err, user) => {
    done(err, user)
  })
})

}

export default Auth