const { Router } = require('express');
const routerOperatore = Router();
const OperatoreController = require ('../controllers/OperatoreController');



routerOperatore.get('/', OperatoreController.lista);
routerOperatore.get('/:id', OperatoreController.checkId, OperatoreController.get)
routerOperatore.post('/', OperatoreController.crea)
routerOperatore.delete('/:id', OperatoreController.checkId, OperatoreController.elimina)
routerOperatore.put('/:id', OperatoreController.checkId, OperatoreController.edit)

module.exports = routerOperatore;