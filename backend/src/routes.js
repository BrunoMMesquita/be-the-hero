const express = require('express')
const routes = express.Router()
const ongController = require('./controllers/ongController')
const incidentsController = require('./controllers/incidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.post('/session', SessionController.index)

routes.get('/ongs', ongController.index)

routes.post('/ongs', ongController.create)

routes.get('/profile', ProfileController.index)

routes.post('/incidents', incidentsController.create)
routes.get('/incidents', incidentsController.index)
routes.delete('/incidents/:id', incidentsController.delete)
module.exports = routes;