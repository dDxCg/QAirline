const { DBPostgre } = require("../configs");
const { SeatMapToSeatList } = require("../utils");

const initSeats = async (flight_uuid) => {
  const plane_id_res = await DBPostgre.query(
    `SELECT plane_id FROM flights WHERE uuid = $1;`,
    [flight_uuid]
  );

  const seat_map_res = await DBPostgre.query(
    `SELECT seat_map FROM planes WHERE id = $1;`,
    [plane_id_res.rows[0].plane_id]
  );

  const seat_list = SeatMapToSeatList(seat_map_res.rows[0].seat_map);

  //fetch seat class id from seat_classes table
  const seat_classes_res = await DBPostgre.query(
    `SELECT id, class FROM seat_classes;`
  );
  const seat_class_map = {};
  seat_classes_res.rows.forEach((row) => {
    seat_class_map[row.class] = row.id;
  });
  //insert each seat from seat_list into flight_seats table: row to seat_row, column to seat_column, class query to seat_classes get id in seat_class_id
  const insertPromises = seat_list.map(async (seat) => {
    const seat_class_id = seat_class_map[seat.class];
    return DBPostgre.query(
      `INSERT INTO flight_seats (flight_uuid, seat_column, seat_row, seat_class_id)
             VALUES ($1, $2, $3, ($4);`,
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
const updateSeatStatus = async (
  flight_uuid,
  seat_row,
  seat_column,
  is_booked
) => {
  const res = await DBPostgre.query(
    `UPDATE flight_seats 
             SET is_booked = $3 
             WHERE flight_uuid = $4 AND seat_row = $1 AND seat_column = $2 RETURNING *;`,
    [seat_row, seat_column, is_booked, flight_uuid]
  );
  return res.rows[0];
};
const updatePriceByClass = async (flight_uuid, seat_class, price) => {
  const res = await DBPostgre.query(
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
  updateSeatStatus,
  updatePriceByClass,
};
