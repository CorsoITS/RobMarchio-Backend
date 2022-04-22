const { getConnection } = require('../database/connessione')
const { logger } = require('../common/logging');

const listOperatore = async () => {
  const connection = await getConnection();
  let query='SELECT * FROM opertore';
  logger.debug('Query ListOperatore:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result ListOperatore:', rows);
  return rows;
}


const operatoreExistById = async (id_operatore) => {
    const connection = await getConnection();
    const query = 'SELECT 1 FROM opertore WHERE id = ?';
    const [rows] = await connection.query(query, [id_operatore]);
    return rows.length > 0;
  }


const getOperatoreById = async (id_operatore) => {
    const connection = await getConnection();
    const query = 'SELECT * FROM opertore WHERE id = ?';
    const [rows] = await connection.query(query, [id_operatore]);
    return rows[0];
  }
  
const insertOperatore = async (ruolo, nome, cognome, username, password, sede_id) => {
    const connection = await getConnection();
    const query = `INSERT INTO opertore (ruolo, nome, cognome, username, password, sede_id) VALUES (?,?,?,?,?,?)`;
    const [res] = await connection.query(query, [ruolo, nome, cognome, username, password, sede_id]);
    return res.insertId;
  }
  
  const updateOperatore = async (id, ruolo, nome, cognome, username, password, sede_id) => {
    const connection = await getConnection();
    const query = `UPDATE opertore SE ruolo = ?, nome = ?, cognome = ?, username= ?, password= ?, sede_id= ?  WHERE id = ?`;
    const [res] = await connection.query(query, [ruolo, nome, cognome, username, password, sede_id, id]);
    return res.affectedRows === 1;
  }
  const operatoreDeleteById = async (id_operatore) => {
    const connection = await getConnection();
    const query = 'DELETE FROM opertore WHERE id = ?';
    const [res] = await connection.query(query, [id_operatore]);
    return res.affectedRows === 1;
  }
  
  module.exports = {
    operatoreExistById,
    listOperatore,
    getOperatoreById,
    insertOperatore,
    updateOperatore,
    operatoreDeleteById,
  }





