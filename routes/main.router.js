const routerSede=require ('./sede-router.js');


function ConnectRouter (app) {
    app.use('/sede', routerSede);
}

module.exports = ConnectRouter;