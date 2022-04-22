const routerSede=require ('./sede-router.js');
const routerPersona=require ('./persona-router.js');
const routerPrenotazione=require('./prenotazione-router.js')


function ConnectRouter (app) {
    app.use('/sede', routerSede);
    app.use('/persona', routerPersona)
    app.use('/prenotazione', routerPrenotazione)
}

module.exports = ConnectRouter;