const Operatore=require('../model/Operatore');
const { logger } = require('../common/logging');

class OperatoreController { 
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("OperatoreController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico, bestia");
                }
                let p;
                p=await Operatore.exists(req.params.id);
                if (p ) {
                    logger.debug("operatore Controller checkId found",p);
                    next();
                }  else {
                    logger.error("OperatoreController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Operatore - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            logger.error ("ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }

    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return OperatoreController.length(req,res);
        } 
       
        logger.debug ("OperatoreController:" );
        let result=await Operatore.lista();
        return res.json(result)
       
        } 

    static async get (req,res) {
        let result;
        if ( ! req.Operatore) {
            result=await Operatore.get(req.params.id);
        } else {
            result = req.Operatore;
        }
        return res.json(result);
        
    }

    static async crea (req,res) {
        try {
            logger.debug ("OperatoreController: crea: ");
            let ns=new Operatore();
            
            if (req.body.ruolo) ns.setRuolo(req.body.ruolo);
            if (req.body.nome) ns.setNome(req.body.nome);
            if (req.body.cognome) ns.setCognome(req.body.cognome);
            if (req.body.username) ns.setUsername(req.body.username);
            if (req.body.password) ns.setPassword(req.body.password);
            if (req.body.sede_id) ns.setSede_id(req.body.sede_id);
            logger.debug("Creo nuova operatore:", ns);
            await ns.save();
            res.status(201).send("Created");
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Operatore.delete(req.params.id) ) {
                    logger.debug("OperatoreController elimina");
                    res.status(200).send('Ok');
                } else {
                    logger.error("OperatoreControllerErrore - Cancellazione Operatore", req.params.id);
                    res.status(400).send ("Errore Cancellazione Operatore");
                }
        } catch (err) {
            logger.error ("OperatoreController ERRORE:", err);
            res.status(500).send ("Internal Server Error Dio Padre Onnipotente");
        }
    }

    static async edit (req,res) {
        try {
            let ns;
            if ( ! req.Operatore ) {
                ns=await Operatore.get(req.params.id);
            } else {
                ns = req.Operatore;
            }
            logger.debug ("OperatoreControllerEdit ReqBody =  ");
            if (req.body.ruolo) ns.setRuolo(req.body.ruolo);
            if (req.body.nome) ns.setNome(req.body.nome);
            if (req.body.cognome) ns.setCognome(req.body.cognome);
            if (req.body.username) ns.setUsername(req.body.username);
            if (req.body.password) ns.setPassword(req.body.password);
            if (req.body.sede_id) ns.setSede_id(req.body.sede_id);
            logger.debug("Salvo Operatore:", ns);
            await  ns.save();
            res.status(200).send("Ok");
        } catch (err) {
            logger.error ("OperatoreController Edit ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=OperatoreController;