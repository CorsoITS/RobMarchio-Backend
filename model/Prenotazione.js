const { listPrenotazione, prenotazioneExistById, getPrenotazioneById, insertPrenotazione, updatePrenotazione, prenotazioneDeleteById } = require('./prenotazione.dao');
const { logger } = require('../common/logging');


class Prenotazione {
    constructor(p) {
        if (p) {
            if (p.id)                   this.id    =p.id;
            if (p.data)                 this.data  =p.data;
            if (p.sede_id)              this.sede_id =p.sede_id;
            if (p.somministrazione_id)  this.somministrazione_id =p.somministrazione_id;
            if (p.note)                 this.note    =p.note;
            if (p.persona_id)           this.persona_id  =p.persona_id;
        } 
    }    
    
    static async lista() {
        let listaPrenotazioneDAO=await listPrenotazione();
        let res=[];
        logger.debug("Richiesta prenotazione="  );
      
        listaPrenotazioneDAO.forEach( s => {
            res.push(new Prenotazione(s));
        });
        logger.silly("Prenotazione Model: list=" , res);
        return res;
    }

    static async exists(id) {
        return await prenotazioneExistById(id);
    }

    static async get(id) {
        let s=await getPrenotazioneById(id);
        if (s) { return new Prenotazione(s);}
        return null;
    }

    static async delete(id) {
        return await prenotazioneDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw  'id non può essere null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    setData(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Metticela una data';
        this.data=x;
    }
    getData() {
        return this.data;
    }

    setSede_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Metticela na sede, bestia';
        this.sede_id=x;
    }
    getSede_id() {
        return this.sede_id;
    }

    setSomministrazione_id(x) {
        this.somministrazione_id=x;

    }
    getSomministrazione_id() {
        return this.somministrazione_id;
    }

    setNote(x) {
        this.note=x;

    }
    getNote() {
        return this.note;
    }

    setPersona_id(x) {
        this.persona_id=x;

    }

    getPersona_id() {
        return this.persona_id;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updatePrenotazione(this.id, this.data, this.sede_id, this.somministrazione_id, this.note, this.persona_id);
            if (! res) throw 'save Persona failed (update case).'; 
        } else {
            let res= await insertPrenotazione (this.data, this.sede_id, this.somministrazione_id, this.note, this.persona_id);
            this.setId(res);
            if (! res) throw 'save Prenotazione failed (insert case).'; 
        }
    }

}

module.exports = Prenotazione;
