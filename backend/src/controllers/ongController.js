
const crypto = require('crypto')
const conection = require('../database/conection')

module.exports = {

    async index(req, res){
        const ongs =  await conection('ongs').select('*')

        return res.json(ongs)
    },

    async create(req, res){
        const id = crypto.randomBytes(4).toString("HEX")
    
        req.body.id = id;
    
        await conection('ongs').insert(req.body)
     
        return res.json({ id });
    }
};