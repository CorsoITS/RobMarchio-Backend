const Persona=require('../model/Persona');
const { logger } = require('../common/logging');

class PersonaController { 
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("PersonaController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico, bestia");
                }
                let p;
                p=await Persona.exists(req.params.id);
                if (p ) {
                    logger.debug("sede Controller checkId found",p);
                    next();
                }  else {
                    logger.error("PersonaController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Persona - id non fornito");
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
            return PersonaController.length(req,res);
        } 
       
        logger.debug ("PersonaController:" );
        let result=await Persona.lista();
        return res.json(result)
       
        } 

    static async get (req,res) {
        let result;
        if ( ! req.Persona) {
            result=await Persona.get(req.params.id);
        } else {
            result = req.Persona;
        }
        return res.json(result);
        
    }

    static async crea (req,res) {
        try {
            logger.debug ("PersonaController: crea: ");
            let np=new Persona();
            
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.codice_fiscale) np.setCodice_Fiscale(req.body.codice_fiscale);
            logger.debug("Creo nuova sede:", np);
            await np.save();
            res.status(201).send("Created");
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Persona.delete(req.params.id) ) {
                    logger.debug("PersonaController elimina");
                    res.status(200).send('Ok');
                } else {
                    logger.error("PersonaControllerErrore - Cancellazione Persona", req.params.id);
                    res.status(400).send ("Errore Cancellazione Persona");
                }
        } catch (err) {
            logger.error ("PersonaController ERRORE:", err);
            res.status(500).send ("Internal Server Error Dio Padre Onnipotente");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Persona ) {
                np=await Persona.get(req.params.id);
            } else {
                np = req.Persona;
            }
            logger.debug ("PersonaControllerEdit ReqBody =  ");
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.codice_fiscale) np.setCodice_Fiscale(req.body.codice_fiscale);
            logger.debug("Salvo Persona:", np);
            await  np.save();
            res.status(200).send("Ok");
        } catch (err) {
            logger.error ("PersonaController Edit ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=PersonaController;