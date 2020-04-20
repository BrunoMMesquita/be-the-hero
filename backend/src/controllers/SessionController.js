const conection = require('../database/conection') 

module.exports = {
    async index(req, res){
        const { id } = req.body;

        const ong = await conection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong){
            return res.json({ error: 'ong not found with id'});
        }

        return res.json(ong);
    }
}