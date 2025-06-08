const { DBPostgre } = require("../configs");
const { SeatMapToSeatList, isPresent } = require("../utils");

const initSeats = async (client, flight_uuid) => {
  const plane_id_res = await client.query(
    `SELECT plane_id FROM flights WHERE flight_uuid = $1;`,
    [flight_uuid]
  );
  if (!isPresent(plane_id_res.rows[0])) {
    throw new Error(`Flight with UUID ${flight_uuid} does not exist.`);
  }
  const seat_map_res = await client.query(
    `SELECT seat_map FROM planes WHERE id = $1;`,
    [plane_id_res.rows[0].plane_id]
  );
  if (!isPresent(seat_map_res.rows[0])) {
    throw new Error(
      `Plane with ID ${plane_id_res.rows[0].plane_id} does not have a seat map.`
    );
  }
  const seat_list = SeatMapToSeatList(seat_map_res.rows[0].seat_map);

  //fetch seat class id from seat_classes table
  const seat_classes_res = await client.query(
    `SELECT id, class FROM seat_classes;`
  );
  const seat_class_map = {};
  seat_classes_res.rows.forEach((row) => {
    seat_class_map[row.class] = row.id;
  });
  if (!isPresent(seat_class_map)) {
    throw new Error("No seat classes found in the database.");
  }
  //insert each seat from seat_list into flight_seats table: row to seat_row, column to seat_column, class query to seat_classes get id in seat_class_id
  const insertPromises = seat_list.map(async (seat) => {
    const seat_class_id = seat_class_map[seat.class];
    return client.query(
      `INSERT INTO flight_seats (flight_uuid, seat_column, seat_row, seat_class_id)
             VALUES ($1, $2, $3, $4);`,
      [flight_uuid, seat.column, seat.row, seat_class_id]
    );
  });
  await Promise.all(insertPromises);

  return {
    success: true,
    message: `Successfully initialized ${seat_list.length} seats for flight ${flight_uuid}.`,
  };
};
const getSeatsByFlightId = async (flight_uuid) => {
  const res = await DBPostgre.query(
    `SELECT seat_row, seat_column, is_booked FROM flight_seats WHERE flight_uuid = $1;`,
    [flight_uuid]
  );
  return res.rows;
};

const updatePriceByClass = async (client, flight_uuid, seat_class, price) => {
  const res = await client.query(
    `UPDATE flight_seats 
             SET price = $2 
             WHERE flight_uuid = $3 AND seat_class_id = (SELECT id FROM seat_classes WHERE class = $1) RETURNING *;`,
    [seat_class, price, flight_uuid]
  );
  return {
    success: true,
    message: `Successfully updated price for class '${seat_class}' on flight ${flight_uuid}.`,
    updatedRows: res.rowCount,
  };
};

module.exports = {
  initSeats,
  getSeatsByFlightId,
  updatePriceByClass,
};
