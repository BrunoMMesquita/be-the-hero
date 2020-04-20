const conection = require('../database/conection')

module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await conection('incidents').count()

        const incidents = await conection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.whatsapp', 
            'ongs.email',
            'ongs.city',
            'ongs.uf'
        ])

        res.header('x-total-count', count['count(*)'])

        return res.json(incidents)
    },

    async create(req, res) {
        const ong_id = req.headers.authorization
        req.body.ong_id = ong_id;
        const [id] = await conection('incidents').insert(req.body)

        return res.json({id});
    },

    async delete (req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization

        const incident = await conection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id !== ong_id){
            return res.status(201).json({ error: 'Operation not permitted'})
        }

        await conection('incidents').where('id', id).delete();

        return res.status(204).send();
    }

}