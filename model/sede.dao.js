const { getConnection } = require('../database/connessione')
const { logger } = require('../common/logging');

const listSede = async () => {
  const connection = await getConnection();
  let query='SELECT * FROM sede';
  logger.debug('Query ListSede:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result ListSede:', rows);
  return rows;
}


const sedeExistById = async (id_sede) => {
    const connection = await getConnection();
    const query = 'SELECT 1 FROM sede WHERE id = ?';
    const [rows] = await connection.query(query, [id_sede]);
    return rows.length > 0;
  }


const getSedeById = async (id_sede) => {
    const connection = await getConnection();
    const query = 'SELECT * FROM sede WHERE id = ?';
    const [rows] = await connection.query(query, [id_sede]);
    return rows[0];
  }
  
const insertSede = async (nome, citta, indirizzo) => {
    const connection = await getConnection();
    const query = `INSERT INTO sede (nome, citta, indirizzo) VALUES (?,?,?)`;
    const [res] = await connection.query(query, [nome, citta, indirizzo]);
    return res.insertId;
  }
  
  const updateSede = async (id, nome, citta, indirizzo) => {
    const connection = await getConnection();
    const query = `UPDATE sede SET nome = ?, citta = ?, indirizzo= ? WHERE id = ?`;
    const [res] = await connection.query(query, [nome, citta, indirizzo, id]);
    return res.affectedRows === 1;
  }
  const sedeDeleteById = async (id_sede) => {
    const connection = await getConnection();
    const query = 'DELETE FROM sede WHERE id = ?';
    const [res] = await connection.query(query, [id_sede]);
    return res.affectedRows === 1;
  }
  
  module.exports = {
    sedeExistById,
    listSede,
    getSedeById,
    insertSede,
    updateSede,
    sedeDeleteById,
  }





