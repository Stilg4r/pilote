const mysql = require("mysql2/promise");
const {
  mysql: connections,
} = require("../../../zelda_leadhunters/connections");

const getConnection = async (key = null) => {
  const dsn = connections[key];
  if (!dsn) {
    throw new Error("No hay conexión para esa base de datos");
  }
  return await mysql.createPool({
    host: dsn.host,
    port: dsn.port,
    user: dsn.user,
    password: dsn.password,
    database: dsn.database,
  });
};

const getPollConnection = async (key = null) => {
  try {
    const pool = await getConnection(key);
    return await pool.getConnection();
  } catch (error) {
    return error;
  }
};

module.exports = {
  getPollConnection,
  getConnection,
};
