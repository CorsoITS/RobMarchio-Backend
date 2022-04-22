const { Router } = require('express');
const routerSede = Router();
const { listSede} = require('../database/dao/sede.dao');

routerSede.get('/', async (req, res) => {
    const persone = await listSede();
    return res.json(persone).send()
  })



module.exports = routerSede;