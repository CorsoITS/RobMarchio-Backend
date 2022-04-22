const { listOperatore, operatoreExistById, getOperatoreById, insertOperatore, updateOperatore, operatoreDeleteById } = require('./operatore.dao');
const { logger } = require('../common/logging');


class Operatore {
    constructor(op) {
        if (op) {
            if (op.id)            this.id    =op.id;
            if (op.ruolo)         this.ruolo = op.ruolo;
            if (op.nome)          this.nome = op.nome;
            if (op.cognome)       this.cognome = op.cognome;
            if (op.username)      this.username = op.username;
            if (op.password)      this.password = op.password;
            if (op.sede_id)       this.sede_id = op.sede_id;
           
        } 
    }    
    
    static async lista() {
        let listaOperatoreDAO=await listOperatore();
        let res=[];
        logger.debug("Richiesta operatore="  );
      
        listaOperatoreDAO.forEach( s => {
            res.push(new Operatore(s));
        });
        logger.silly("Operatore Model: list=" , res);
        return res;
    }

    static async exists(id) {
        return await operatoreExistById(id);
    }

    static async get(id) {
        let s=await getOperatoreById(id);
        if (s) { return new Operatore(s);}
        return null;
    }

    static async delete(id) {
        return await operatoreDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw  'id non può essere null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    setRuolo(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Ruolo cannot be null';
        this.ruolo=x;
    }
    getRuolo() {
        return this.ruolo;
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

    setUsername(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Metticelo uno username, bestia';
        this.username=x;
    }
    getUsername() {
        return this.username;
    }

    setPassword(x) {
        this.password=x;

    }
    getPassword() {
        return this.password;
    }

    setSede_id(x) {
        this.sede_id=x;

    }
    getSede_id() {
        return this.sede_id;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updateOperatore(this.id, this.ruolo, this.nome, this.cognome, this.username, this.password, this.sede_id );
            if (! res) throw 'save Persona failed (update case).'; 
        } else {
            let res= await insertOperatore (this.ruolo, this.nome, this.cognome, this.username, this.password, this.sede_id);
            this.setId(res);
            if (! res) throw 'save Operatore failed (insert case).'; 
        }
    }

}

module.exports = Operatore;
