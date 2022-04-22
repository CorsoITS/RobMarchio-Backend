const { Router } = require('express');
const routerSede = Router();
const SedeController = require ('../controllers/SedeController');


// routerSede.get('/', async (req, res) => {
//     const persone = await listSede();
//     return res.json(persone).send()
//  })

routerSede.get('/', SedeController.lista);
routerSede.get('/:id', SedeController.checkId, SedeController.get)
routerSede.post('/', SedeController.crea)
routerSede.delete('/:id', SedeController.checkId, SedeController.elimina)
routerSede.put('/:id', SedeController.checkId, SedeController.edit)

module.exports = routerSede;