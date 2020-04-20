const knex = require('knex')
const configurarion = require('../../knexfile')

const conection = knex(configurarion.development)

module.exports = conection