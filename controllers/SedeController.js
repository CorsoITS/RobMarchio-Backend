const Sede=require('../model/Sede');
const { logger } = require('../common/logging');

class SedeController { 
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("SedeController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico, bestia");
                }
                let p;
                p=await Sede.exists(req.params.id);
                if (p ) {
                    logger.debug("sede Controller checkId found",p);
                    next();
                }  else {
                    logger.error("SedeController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Sede - id non fornito");
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
            return SedeController.length(req,res);
        } 
       
        logger.debug ("SedeController:" );
        let result=await Sede.lista();
        return res.json(result)
       
        } 

    static async get (req,res) {
        let result;
        if ( ! req.Sede) {
            result=await Sede.get(req.params.id);
        } else {
            result = req.Sede;
        }
        return res.json(result);
        
    }

    static async crea (req,res) {
        try {
            logger.debug ("SedeController: crea: ");
            let ns=new Sede();
            
            if (req.body.nome) ns.setNome(req.body.nome);
            if (req.body.citta) ns.setCitta(req.body.citta);
            if (req.body.indirizzo) ns.setIndirizzo(req.body.indirizzo);
            logger.debug("Creo nuova sede:", ns);
            await ns.save();
            res.status(201).send("Created");
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Sede.delete(req.params.id) ) {
                    logger.debug("SedeController elimina");
                    res.status(200).send('Ok');
                } else {
                    logger.error("SedeControllerErrore - Cancellazione Sede", req.params.id);
                    res.status(400).send ("Errore Cancellazione Sede");
                }
        } catch (err) {
            logger.error ("SedeController ERRORE:", err);
            res.status(500).send ("Internal Server Error Dio Padre Onnipotente");
        }
    }

    static async edit (req,res) {
        try {
            let ns;
            if ( ! req.Sede ) {
                ns=await Sede.get(req.params.id);
            } else {
                ns = req.Sede;
            }
            logger.debug ("SedeControllerEdit ReqBody =  ");
            if (req.body.nome) ns.setNome(req.body.nome);
            if (req.body.citta) ns.setCitta(req.body.citta);
            if (req.body.indirizzo) ns.setIndirizzo(req.body.indirizzo);
            logger.debug("Salvo Sede:", ns);
            await  ns.save();
            res.status(200).send("Ok");
        } catch (err) {
            logger.error ("SedeController Edit ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=SedeController;