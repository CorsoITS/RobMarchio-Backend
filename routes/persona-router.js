const { Router } = require('express');
const routerPersona = Router();
const PersonaController = require ('../controllers/PersonaController');



routerPersona.get('/', PersonaController.lista);
routerPersona.get('/:id', PersonaController.checkId, PersonaController.get)
routerPersona.post('/', PersonaController.crea)
routerPersona.delete('/:id', PersonaController.checkId, PersonaController.elimina)
routerPersona.put('/:id', PersonaController.checkId, PersonaController.edit)

module.exports = routerPersona;
