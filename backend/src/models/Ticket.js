const { DBPostgre } = require("../configs");
const { getPriceByTicketID, updateSeatStatus } = require("../utils/seatUtils");
const { isPresent } = require("../utils");

const bookingTicket = async (
  client,
  flight_uuid,
  seat_row,
  seat_column,
  user_uuid
) => {
  const res = await client.query(
    `INSERT INTO tickets(user_uuid, seat_row, seat_column, flight_uuid) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [user_uuid, seat_row, seat_column, flight_uuid]
  );
  const ticket_uuid = res.rows[0].ticket_uuid;
  console.log("Ticket UUID:", ticket_uuid, res.rows[0]);
  const price = await getPriceByTicketID(client, ticket_uuid);
  if (!isPresent(price)) {
    throw new Error("Price not found for the ticket");
  }
  const updateRes = await client.query(
    `UPDATE tickets SET price = $1 WHERE ticket_uuid = $2 RETURNING *;`,
    [price, ticket_uuid]
  );
  return updateRes.rows[0];
};

const createPassengerInfo = async (
  client,
  ticket_uuid,
  full_name,
  email,
  phone_number,
  date_of_birth,
  gender,
  nationality,
  id_number,
  passport_number,
  passport_expiry_date
) => {
  const res = await client.query(
    `INSERT INTO passenger_info(full_name,
    email,
    phone_number,
    date_of_birth,
    gender,
    nationality,
    id_number,
    passport_number,
    passport_expiry_date,
    ticket_uuid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
    [
      full_name,
      email,
      phone_number,
      date_of_birth,
      gender,
      nationality,
      id_number,
      passport_number,
      passport_expiry_date,
      ticket_uuid,
    ]
  );
  return res.rows[0];
};

const fetchPassengerFromUserId = async (client, user_uuid, ticket_uuid) => {
  const getUserProfileQuery = `SELECT
        full_name,
        phone_number,
        date_of_birth,
        gender,
        nationality,
        id_number,
        passport_number,
        passport_expiry_date
    FROM
        user_profiles
    WHERE
        account_uuid = $1;
    `;
  const getProfileRes = await client.query(getUserProfileQuery, [user_uuid]);
  if (!isPresent(getProfileRes.rows[0])) {
    throw new Error("User profile not found");
  }
  const userProfile = getProfileRes.rows[0];

  const getEmailQuery = `
    SELECT email FROM accounts WHERE account_uuid = $1;
  `;
  const getEmailRes = await client.query(getEmailQuery, [user_uuid]);
  if (!isPresent(getEmailRes.rows[0])) {
    throw new Error("Account email not found");
  }
  const email = getEmailRes.rows[0].email;

  const insertPassengerInfoQuery = `
    INSERT INTO passenger_info (
        full_name,
        email,
        phone_number,
        date_of_birth,
        gender,
        nationality,
        id_number,
        passport_number,
        passport_expiry_date,
        ticket_uuid
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *; 
    `;
  const passengerInfoValues = [
    userProfile.full_name,
    email,
    userProfile.phone_number,
    userProfile.date_of_birth,
    userProfile.gender,
    userProfile.nationality,
    userProfile.id_number,
    userProfile.passport_number,
    userProfile.passport_expiry_date,
    ticket_uuid,
  ];
  const passengerInfoRes = await client.query(
    insertPassengerInfoQuery,
    passengerInfoValues
  );
  return passengerInfoRes.rows[0];
};

const getTicketById = async (ticket_id) => {
  const res = await DBPostgre.query(
    `SELECT seat_row, seat_column, price, flight_uuid, ticket_uuid FROM tickets WHERE ticket_uuid = $1;`,
    [ticket_id]
  );
  return res.rows;
};

const getTicketByUserId = async (user_uuid) => {
  const res = await DBPostgre.query(
    `SELECT seat_row, seat_column, price, flight_uuid, ticket_uuid FROM tickets WHERE user_uuid = $1;`,
    [user_uuid]
  );
  return res.rows;
};

const getPassengerByTicketId = async (ticket_id) => {
  const res = await DBPostgre.query(
    `SELECT 
    full_name,
    email,
    phone_number,
    date_of_birth,
    gender,
    nationality,
    id_number,
    passport_number,
    passport_expiry_date,
    ticket_uuid FROM passenger_info WHERE ticket_uuid = $1;`,
    [ticket_id]
  );
  return res.rows[0];
};

const deleteTicketById = async (client, ticket_id) => {
  const res = await client.query(
    `DELETE FROM tickets WHERE ticket_uuid = $1 RETURNING *;`,
    [ticket_id]
  );
  return res.rows[0];
};
module.exports = {
  bookingTicket,
  getTicketById,
  getTicketByUserId,
  getPassengerByTicketId,
  createPassengerInfo,
  fetchPassengerFromUserId,
  deleteTicketById,
};
