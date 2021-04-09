import express from 'express'
import handlebars from 'handlebars'
import exphbs from 'express-handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { resolve } from 'path'
import flash from 'connect-flash'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'

import routes from './routes/routes'
import './config/config'
import { port, secret_session } from './database/database'

class App{
  constructor(){
    this.server = express()
    this.middlewares()
    this.routes()
    this.serverSide()
  }

  middlewares(){
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(express.static(resolve(__dirname, 'public')))
    this.server.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(handlebars) }))
    this.server.set('view engine', 'handlebars')
    this.server.use(flash())
    this.server.use(session({
      secret: secret_session,
      resave: false,
      saveUninitialized: false
    }))
    this.server.use(passport.initialize())
    this.server.use(passport.session())
    this.server.use((req, res, next) => {
      res.locals.success = req.flash('success')
      res.locals.err = req.flash('err')
      res.locals.error = req.flash("error")
      next()
    })
  }

  routes(){
    this.server.use(routes)
  }

  serverSide(){
    this.server.listen(port)
  }
}

export default new App().server