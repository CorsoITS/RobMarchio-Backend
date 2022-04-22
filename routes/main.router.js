const routerSede=require ('./sede-router.js');
const routerPersona=require ('./persona-router.js');


function ConnectRouter (app) {
    app.use('/sede', routerSede);
    app.use('/persona', routerPersona)
}

module.exports = ConnectRouter;