const { DBPostgre } = require("../configs");

const createAccount = async (username, email, hashedPassword) => {
  const res = await DBPostgre.query(
    `INSERT INTO accounts (username, email, password) 
         VALUES ($1, $2, $3) RETURNING *;`,
    [username, email, hashedPassword]
  );
  return res.rows[0];
};

const getAccountByEmail = async (email) => {
  const res = await DBPostgre.query(
    `SELECT * FROM accounts WHERE email = $1;`,
    [email]
  );
  return res.rows[0];
};

module.exports = {
  createAccount,
  getAccountByEmail,
};
