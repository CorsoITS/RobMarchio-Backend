const { getConnection } = require('../connessione')

const listSede = async () => {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * FROM sede')
  return rows;
}



module.exports = {
    listSede
  }