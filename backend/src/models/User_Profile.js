const { DBPostgre } = require("../configs");

const initProfile = async (account_uuid) => {
  const res = await DBPostgre.query(
    `INSERT INTO user_profiles (account_uuid) 
             VALUES ($1) RETURNING *;`,
    [account_uuid]
  );
  return res.rows[0];
};

const getProfileById = async (account_uuid) => {
  const res = await DBPostgre.query(
    "SELECT * FROM user_profiles WHERE account_uuid = $1;",
    [account_uuid]
  );
  return res.rows[0];
};

const updateProfile = async (
  account_uuid,
  full_name,
  date_of_birth,
  gender,
  nationality,
  id_number,
  passport_number,
  passport_expiry_date,
  phone_number
) => {
  const res = await DBPostgre.query(
    `UPDATE user_profiles 
         SET full_name = $1, 
             date_of_birth = $2,
             gender = $3,
             nationality = $4,
             id_number = $5,
             passport_number = $6,
             passport_expiry_date = $7,
             phone_number = $8
         WHERE account_uuid = $9
         RETURNING *;`,
    [
      full_name,
      date_of_birth,
      gender,
      nationality,
      id_number,
      passport_number,
      passport_expiry_date,
      phone_number,
      account_uuid,
    ]
  );
  return res.rows[0];
};

module.exports = {
  getProfileById,
  updateProfile,
  initProfile,
};
