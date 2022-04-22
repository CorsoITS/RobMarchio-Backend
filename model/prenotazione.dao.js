const { getConnection } = require('../database/connessione')
const { logger } = require('../common/logging');

const listPrenotazione = async () => {
  const connection = await getConnection();
  let query='SELECT * FROM prenotazione';
  logger.debug('Query ListPrenotazione:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result ListPrenotazione:', rows);
  return rows;
}


const prenotazioneExistById = async (id_prenotazione) => {
    const connection = await getConnection();
    const query = 'SELECT 1 FROM prenotazione WHERE id = ?';
    const [rows] = await connection.query(query, [id_prenotazione]);
    return rows.length > 0;
  }


const getPrenotazioneById = async (id_prenotazione) => {
    const connection = await getConnection();
    const query = 'SELECT * FROM prenotazione WHERE id = ?';
    const [rows] = await connection.query(query, [id_prenotazione]);
    return rows[0];
  }
  
const insertPrenotazione = async (data, sede_id, somministrazione_id=null, note=null, persona_id) => {
    const connection = await getConnection();
    const query = `INSERT INTO prenotazione (data, sede_id, somministrazione_id, note, persona_id) VALUES (?,?,?,?,?)`;
    const [res] = await connection.query(query, [data, sede_id, somministrazione_id, note, persona_id]);
    return res.insertId;
  }
  
  const updatePrenotazione = async (id, data, sede_id, somministrazione_id, note, persona_id) => {
    const connection = await getConnection();
    const query = `UPDATE prenotazione SET data = ?, sede_id = ?, somministrazione_id= ?, note= ?, persona_id= ? WHERE id = ?`;
    const [res] = await connection.query(query, [data, sede_id, somministrazione_id, note, persona_id, id]);
    return res.affectedRows === 1;
  }
  const prenotazioneDeleteById = async (id_prenotazione) => {
    const connection = await getConnection();
    const query = 'DELETE FROM prenotazione WHERE id = ?';
    const [res] = await connection.query(query, [id_prenotazione]);
    return res.affectedRows === 1;
  }
  
  module.exports = {
    prenotazioneExistById,
    listPrenotazione,
    getPrenotazioneById,
    insertPrenotazione,
    updatePrenotazione,
    prenotazioneDeleteById,
  }





