const { DBPostgre } = require("../configs");
const { isPresent } = require("../utils");

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
    `
    SELECT 
      f.flight_uuid,
      f.origin,
      f.destination,
      TO_CHAR(f.departure_time, 'DD/MM/YYYY - HH24:MI') AS departure_time,
      TO_CHAR(f.arrival_time, 'DD/MM/YYYY - HH24:MI') AS arrival_time,
      f.status,
      f.plane_id,
      CONCAT(p.manufacturer, ' ', p.model) AS aircraft
    FROM flights f
    JOIN planes p ON f.plane_id = p.id
    WHERE f.origin = $1 AND f.destination = $2;
    `,
    [origin, destination]
  );

  return res.rows;
};

const getAllFlights = async (client) => {
  const res = await client.query(`
    SELECT 
      f.flight_uuid,
      f.origin,
      f.destination,
      TO_CHAR(f.departure_time, 'DD/MM/YYYY - HH24:MI') AS departure_time,
      TO_CHAR(f.arrival_time, 'DD/MM/YYYY - HH24:MI') AS arrival_time,
      f.status,
      f.plane_id,
      CONCAT(p.manufacturer, ' ', p.model) AS aircraft
    FROM flights f
    JOIN planes p ON f.plane_id = p.id;
  `);
  return res.rows;
};

const searchFlight = async (client, origin, destination, departureTime) => {
  let query = `
    SELECT 
      f.flight_uuid,
      f.origin,
      f.destination,
      TO_CHAR(f.departure_time, 'DD/MM/YYYY - HH24:MI') AS departure_time,
      TO_CHAR(f.arrival_time, 'DD/MM/YYYY - HH24:MI') AS arrival_time,
      f.status,
      f.plane_id,
      CONCAT(p.manufacturer, ' ', p.model) AS aircraft
    FROM flights f
    JOIN planes p ON f.plane_id = p.id
    WHERE f.origin = $1 AND f.destination = $2
  `;

  const params = [origin, destination];

  if (departureTime) {
    query += ` AND TO_CHAR(f.departure_time, 'YYYY-MM-DD') = $3`;
    params.push(departureTime);
  }

  const res = await client.query(query, params);
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

const deleteFlightSafe = async (flight_id) => {
  const res = await DBPostgre.query(
    "DELETE FROM flights WHERE flight_uuid = $1 RETURNING *;",
    [flight_id]
  );
  return res.rows[0];
};

const deleteFlightForce = async (client, flight_id) => {
  try {
    await client.query("BEGIN");

    // Delete all tickets associated with the flight
    await client.query("DELETE FROM tickets WHERE flight_uuid = $1;", [
      flight_id,
    ]);

    // Finally delete the flight
    const res = await client.query(
      "DELETE FROM flights WHERE flight_uuid = $1 RETURNING *;",
      [flight_id]
    );

    await client.query("COMMIT");
    return res.rows[0];
  } catch (error) {
    console.error("Error deleting flight:", error);
    if (client) {
      await client.query("ROLLBACK");
    }
    throw new Error("Failed to delete flight");
  } finally {
    if (client) {
      client.release();
    }
  }
};

const getTodayFlights = async (client) => {
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-CA"); // Format date as YYYY-MM-DD
  const res = await client.query(
    `SELECT * FROM flights 
             WHERE departure_time::date = $1;`,
    [todayStr]
  );
  return res.rows;
};

module.exports = {
  createFlight,
  getFlightById,
  getFlightsByOriginAndDestination,
  getAllFlights,
  searchFlight,
  updateFlight,
  deleteFlightSafe,
  deleteFlightForce,
  getTodayFlights,
};
