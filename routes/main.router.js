const routerSede=require ('./sede-router.js');
const routerPersona=require ('./persona-router.js');
const routerPrenotazione=require('./prenotazione-router.js')
const routerOperatore=require('./operatore-router.js')


function ConnectRouter (app) {
    app.use('/sede', routerSede);
    app.use('/persona', routerPersona)
    app.use('/prenotazione', routerPrenotazione)
    app.use('/operatore', routerOperatore)
}

module.exports = ConnectRouter;