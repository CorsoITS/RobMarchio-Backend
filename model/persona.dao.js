const { getConnection } = require('../database/connessione')
const { logger } = require('../common/logging');

const listPersona = async () => {
  const connection = await getConnection();
  let query='SELECT * FROM persona';
  logger.debug('Query ListPersona:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result ListPersona:', rows);
  return rows;
}


const personaExistById = async (id_persona) => {
    const connection = await getConnection();
    const query = 'SELECT 1 FROM persona WHERE id = ?';
    const [rows] = await connection.query(query, [id_persona]);
    return rows.length > 0;
  }


const getPersonaById = async (id_persona) => {
    const connection = await getConnection();
    const query = 'SELECT * FROM persona WHERE id = ?';
    const [rows] = await connection.query(query, [id_persona]);
    return rows[0];
  }
  
const insertPersona = async (nome, cognome, codice_fiscale) => {
    const connection = await getConnection();
    const query = `INSERT INTO persona (nome, cognome, codice_fiscale) VALUES (?,?,?)`;
    const [res] = await connection.query(query, [nome, cognome, codice_fiscale]);
    return res.insertId;
  }
  
  const updatePersona = async (id, nome, cognome, codice_fiscale) => {
    const connection = await getConnection();
    const query = `UPDATE persona SET nome = ?, cognome = ?, codice_fiscale= ? WHERE id = ?`;
    const [res] = await connection.query(query, [nome, cognome, codice_fiscale, id]);
    return res.affectedRows === 1;
  }
  const personaDeleteById = async (id_persona) => {
    const connection = await getConnection();
    const query = 'DELETE FROM persona WHERE id = ?';
    const [res] = await connection.query(query, [id_persona]);
    return res.affectedRows === 1;
  }
  
  module.exports = {
    personaExistById,
    listPersona,
    getPersonaById,
    insertPersona,
    updatePersona,
    personaDeleteById,
  }





