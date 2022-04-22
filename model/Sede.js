const { listSede, sedeExistById, getSedeById, insertSede, updateSede, sedeDeleteById } = require('./sede.dao');
const { logger } = require('../common/logging');


class Sede {
    constructor(s) {
        if (s) {
            if (s.id)                this.id    =s.id;
            if (s.nome)              this.nome  =s.nome;
            if (s.citta)             this.citta =s.citta;
            if (s.indirizzo)         this.indirizzo =s.indirizzo;
        } 
    }    
    
    static async lista() {
        let listaSedeDAO=await listSede();
        let res=[];
        logger.debug("Richiesta sede="  );
      
        listaSedeDAO.forEach( s => {
            res.push(new Sede(s));
        });
        logger.silly("Sede Model: list=" , res);
        return res;
    }

    static async exists(id) {
        return await sedeExistById(id);
    }

    static async get(id) {
        let s=await getSedeById(id);
        if (s) { return new Sede(s);}
        return null;
    }

    static async delete(id) {
        return await sedeDeleteById(id);
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

    setCitta(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Metticela na città, bestia';
        this.citta=x;
    }
    getCitta() {
        return this.citta;
    }

    setIndirizzo(x) {
        this.indirizzo=x;

    }
    getIndirizzo() {
        return this.indirizzo;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            let res= await updateSede(this.id, this.nome, this.citta, this.indirizzo);
            if (! res) throw 'save Persona failed (update case).'; 
        } else {
            let res= await insertSede (this.nome, this.citta, this.indirizzo);
            this.setId(res);
            if (! res) throw 'save Sede failed (insert case).'; 
        }
    }

}

module.exports = Sede;
