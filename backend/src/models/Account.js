const { DBPostgre } = require("../configs");

const createAccount = async (client, username, email, hashedPassword) => {
  const res = await client.query(
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

const getAccountByID = async (client, account_uuid) => {
  const res = await client.query(
    `SELECT * FROM accounts WHERE account_uuid = $1;`,
    [account_uuid]
  );
  return res.rows[0];
};

const deleteAccount = async (client, account_uuid) => {
  try {
    await client.query("BEGIN");

    // Delete the account
    const res = await client.query(
      `DELETE FROM accounts WHERE account_uuid = $1 RETURNING *;`,
      [account_uuid]
    );

    if (res.rows.length === 0) {
      throw new Error("Account not found");
    }

    // Update booked seats to is_booked = false
    await client.query(
      `UPDATE flight_seats
       SET is_booked = FALSE
       WHERE (seat_row, seat_column, flight_uuid) IN (
         SELECT seat_row, seat_column, flight_uuid
         FROM tickets
         WHERE user_uuid = $1
       );`,
      [account_uuid]
    );

    await client.query("COMMIT");
    return res.rows[0];
  } catch (error) {
    console.error("Error resetting seat status:", error);
    if (client) {
      await client.query("ROLLBACK");
    }
    throw new Error("Failed to delete account");
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = {
  createAccount,
  getAccountByEmail,
  getAccountByID,
  deleteAccount,
};
