const { listPersona, personaExistById, getPersonaById, insertPersona, updatePersona, personaDeleteById } = require('./persona.dao');
const { logger } = require('../common/logging');


class Persona {
    constructor(s) {
        if (s) {
            if (s.id)                this.id    =s.id;
            if (s.nome)              this.nome  =s.nome;
            if (s.cognome)           this.cognome =s.cognome;
            if (s.codice_fiscale)    this.codice_fiscale =s.codice_fiscale;
        } 
    }    
    
    static async lista() {
        let listaPersonaDAO=await listPersona();
        let res=[];
        logger.debug("Richiesta persona="  );
      
        listaPersonaDAO.forEach( s => {
            res.push(new Persona(s));
        });
        logger.silly("Persona Model: list=" , res);
        return res;
    }

    static async exists(id) {
        return await personaExistById(id);
    }

    static async get(id) {
        let s=await getPersonaById(id);
        if (s) { return new Persona(s);}
        return null;
    }

    static async delete(id) {
        return await personaDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw  'id non può essere null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    setNome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.nome=x;
    }
    getNome() {
        return this.nome;
    }

    setCognome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Metticelo un cognome, bestia';
        this.cognome=x;
    }
    getCognome() {
        return this.cognome;
    }

    setCodice_Fiscale(x) {
        this.codice_fiscale=x;

    }
    getCodice_Fiscale() {
        return this.codice_fiscale;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updatePersona(this.id, this.nome, this.cognome, this.codice_fiscale);
            if (! res) throw 'save Persona failed (update case).'; 
        } else {
            let res= await insertPersona (this.nome, this.cognome, this.codice_fiscale);
            this.setId(res);
            if (! res) throw 'save Persona failed (insert case).'; 
        }
    }

}

module.exports = Persona;
