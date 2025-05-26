const { DBPostgre } = require("../configs");

const createFlight = async (
  client,
  origin,
  destination,
  departureTime,
  arrivalTime,
  plane_id
) => {
  const res = await client.query(
    `INSERT INTO flights (origin, destination, departure_time, arrival_time, plane_id) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [origin, destination, departureTime, arrivalTime, plane_id]
  );
  return res.rows[0];
};

const getFlightById = async (flight_id) => {
  const res = await DBPostgre.query(
    "SELECT * FROM flights WHERE flight_uuid = $1;",
    [flight_id]
  );
  return res.rows[0];
};

const getFlightsByOriginAndDestination = async (origin, destination) => {
  const res = await DBPostgre.query(
    "SELECT * FROM flights WHERE origin = $1 AND destination = $2;",
    [origin, destination]
  );
  return res.rows;
};

const getAllFlights = async () => {
  const res = await DBPostgre.query("SELECT * FROM flights;");
  return res.rows;
};

const updateFlight = async (
  origin,
  destination,
  departure_time,
  arrival_time,
  plane_id,
  status,
  flight_id
) => {
  const res = await DBPostgre.query(
    `UPDATE flights 
             SET origin = $1, destination = $2, departure_time = $3, arrival_time = $4, plane_id = $5, status = $6 
             WHERE flight_uuid = $7 RETURNING *;`,
    [
      origin,
      destination,
      departure_time,
      arrival_time,
      plane_id,
      status,
      flight_id,
    ]
  );
  return res.rows[0];
};

module.exports = {
  createFlight,
  getFlightById,
  getFlightsByOriginAndDestination,
  getAllFlights,
  updateFlight,
};
