const Prenotazione=require('../model/Prenotazione');
const { logger } = require('../common/logging');

class PrenotazioneController { 
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("PrenotazioneController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico, bestia");
                }
                let p;
                p=await Prenotazione.exists(req.params.id);
                if (p ) {
                    logger.debug("prenotazione Controller checkId found",p);
                    next();
                }  else {
                    logger.error("PrenotazioneController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Prenotazione - id non fornito");
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
            return PrenotazioneController.length(req,res);
        } 
       
        logger.debug ("PrenotazioneController:" );
        let result=await Prenotazione.lista();
        return res.json(result)
       
        } 

    static async get (req,res) {
        let result;
        if ( ! req.Prenotazione) {
            result=await Prenotazione.get(req.params.id);
        } else {
            result = req.Prenotazione;
        }
        return res.json(result);
        
    }

    static async crea (req,res) {
        try {
            logger.debug ("PrenotazioneController: crea: ");
            let np=new Prenotazione();
            
            if (req.body.data) np.setData(req.body.data);
            if (req.body.sede_id) np.setSede_id(req.body.sede_id);
            if (req.body.somministrazione_id) np.setSomministrazione_id(req.body.somministrazione_id);
            if (req.body.note) np.setNote(req.body.note);
            if (req.body.persona_id) np.setPersona_id(req.body.persona_id);
            logger.debug("Creo nuova prenotazione:", np);
            await np.save();
            res.status(201).send("Created");
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Prenotazione.delete(req.params.id) ) {
                    logger.debug("PrenotazioneController elimina");
                    res.status(200).send('Ok');
                } else {
                    logger.error("PrenotazioneControllerErrore - Cancellazione Prenotazione", req.params.id);
                    res.status(400).send ("Errore Cancellazione Prenotazione");
                }
        } catch (err) {
            logger.error ("PrenotazioneController ERRORE:", err);
            res.status(500).send ("Internal Server Error Dio Padre Onnipotente");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Prenotazione ) {
                np=await Prenotazione.get(req.params.id);
            } else {
                np = req.Prenotazione;
            }
            logger.debug ("PrenotazioneControllerEdit ReqBody =  ");
            if (req.body.data) np.setData(req.body.data);
            if (req.body.sede_id) np.setSede_id(req.body.sede_id);
            if (req.body.somministrazione_id) np.setSomministrazione_id(req.body.somministrazione_id);
            if (req.body.note) np.setNote(req.body.note);
            if (req.body.persona_id) np.setPersona_id(req.body.persona_id);
            logger.debug("Salvo Prenotazione:", np);
            await  np.save();
            res.status(200).send("Ok");
        } catch (err) {
            logger.error ("PrenotazioneController Edit ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=PrenotazioneController;