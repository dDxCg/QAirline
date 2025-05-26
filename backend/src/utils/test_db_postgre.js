const pool = require("../configs/db_postgre");

const testDbConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = testDbConnection;
