const { Router } = require('express');
const routerPrenotazione = Router();
const PrenotazioneController = require ('../controllers/PrenotazioneController');


routerPrenotazione.get('/', PrenotazioneController.lista);
routerPrenotazione.get('/:id', PrenotazioneController.checkId, PrenotazioneController.get)
routerPrenotazione.post('/', PrenotazioneController.crea)
routerPrenotazione.delete('/:id', PrenotazioneController.checkId, PrenotazioneController.elimina)
routerPrenotazione.put('/:id', PrenotazioneController.checkId, PrenotazioneController.edit)

module.exports = routerPrenotazione;