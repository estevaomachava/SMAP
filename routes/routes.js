import { Router } from 'express'
import passport from 'passport'

import Auth from '../config/auth'
import StudentController from '../app/controllers/StudentController'
import EventController from '../app/controllers/EventController'
import WorkerController from '../app/controllers/WorkerController'
import FinanceController from '../app/controllers/FinanceController'
import DocController from '../app/controllers/DocController'
import SettingController from '../app/controllers/SettingController'
import checkAuthentication from '../app/middlewares/checkAuthentication'
import checkNotAuthentication from '../app/middlewares/checkNotAuthentication'
import checkStudentProfile from '../app/middlewares/checkStudentProfile'
import editStudents from '../app/middlewares/editStudents'
import getAllData from '../app/middlewares/getAllData'
import multerConfig from '../config/multerConfig'
import multerDoc from '../config/multerDoc'

Auth(passport)
const routes = new Router()

routes.get('/', checkNotAuthentication, (req, res) => { res.render('login', { login: true }) })
routes.get('/home', checkAuthentication, (req, res) => { res.render('index', { home: true, all: true }) })
routes.get('/students', checkAuthentication, (req, res) => { res.render('student', { students: true, all: true }) })
routes.get('/heads', checkAuthentication, (req, res) => { res.render('heads', { heads: true, all: true }) })
routes.get('/events', checkAuthentication, (req, res) => { res.render('events', { events: true, all: true }) })
routes.get('/workers', checkAuthentication, (req, res) => { res.render('workers', { workers: true, all: true }) })
routes.get('/finances', checkAuthentication, (req, res) => { res.render('finances', { finances: true, all: true }) })
routes.get('/documents', checkAuthentication, (req, res) => { res.render('documents', { documents: true, all: true }) })
routes.get('/statistics', checkAuthentication, (req, res) => { res.render('statistics', { statistics: true, all: true }) })
routes.get('/logout', (req, res) => { req.logout(); res.redirect('/') })
routes.get('/getAllStudents', checkAuthentication, StudentController.index)
routes.get('/editStudent/:id', checkAuthentication, editStudents)
routes.get('/deleteStudent/:id', checkAuthentication, StudentController.delete)
routes.get('/getEvents', checkAuthentication, EventController.index)
routes.get('/editEvent/:id', checkAuthentication, EventController.show)
routes.get('/deleteEvent/:id', checkAuthentication, EventController.delete)
routes.get('/getWorkers', checkAuthentication, WorkerController.index)
routes.get('/editWorker/:id', checkAuthentication, WorkerController.show)
routes.get('/deleteWorker/:id', checkAuthentication, WorkerController.delete)
routes.get('/getFinances', checkAuthentication, FinanceController.index)
routes.get('/editFinance/:id', checkAuthentication, FinanceController.show)
routes.get('/deleteFinance/:id', checkAuthentication, FinanceController.delete)
routes.get('/getDocs', checkAuthentication, DocController.index)
routes.get('/editDoc/:id', checkAuthentication, DocController.show)
routes.get('/deleteDoc/:id', checkAuthentication, DocController.delete)
routes.get('/getAllData', getAllData)

routes.post('/', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }))
routes.post('/students', multerConfig.single('file'), checkStudentProfile, StudentController.store)
routes.post('/events', EventController.store)
routes.post('/workers', WorkerController.store)
routes.post('/finances', FinanceController.store)
routes.post('/docs', multerDoc.single('doc'), DocController.store)
routes.post('/getStudents', StudentController.show)
routes.post('/updateStudent', StudentController.update)
routes.post('/updateEvent', EventController.update)
routes.post('/updateWorker', WorkerController.update)
routes.post('/updateFinance', FinanceController.update)
routes.post('/updateDocs', DocController.update)

routes.get('/getColor', SettingController.index)
routes.post('/updateColor', SettingController.store)


export default routes