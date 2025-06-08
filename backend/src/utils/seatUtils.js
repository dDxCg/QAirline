const { isPresent } = require("../utils");

const getPriceByTicketID = async (client, ticket_uuid, total_fare) => {
  const ticketRes = await client.query(
    `SELECT * FROM tickets WHERE ticket_uuid = $1;`,
    [ticket_uuid]
  );
  const ticket = ticketRes.rows[0];
  if (!isPresent(ticket)) {
    throw new Error(`Ticket with UUID ${ticket_uuid} does not exist.`);
  }
  const priceRes = await client.query(
    `SELECT price FROM flight_seats 
             WHERE flight_uuid = $1 AND seat_row = $2 AND seat_column = $3;`,
    [ticket.flight_uuid, ticket.seat_row, ticket.seat_column]
  );
  if (!isPresent(priceRes.rows[0])) {
    throw new Error(`Price not found for flight.`);
  }

  finalPrice = priceRes.rows[0].price;

  if (ticket.ticket_type === "round_trip") {
    const returnPriceRes = await client.query(
      `SELECT price FROM flight_seats 
             WHERE flight_uuid = $1 AND seat_row = $2 AND seat_column = $3;`,
      [
        ticket.return_flight_uuid,
        ticket.return_seat_row,
        ticket.return_seat_column,
      ]
    );
    if (!isPresent(returnPriceRes.rows[0])) {
      throw new Error(`Price not found for the return flight.`);
    }
    finalPrice += returnPriceRes.rows[0].price;
    finalPrice = finalPrice * 0.67;
  }
  finalPrice = finalPrice + total_fare;
  return finalPrice;
};

const updateSeatStatus = async (
  client,
  flight_uuid,
  seat_row,
  seat_column,
  is_booked
) => {
  const res = await client.query(
    `UPDATE flight_seats 
             SET is_booked = $3 
             WHERE flight_uuid = $4 AND seat_row = $1 AND seat_column = $2 RETURNING *;`,
    [seat_row, seat_column, is_booked, flight_uuid]
  );
  return res.rows[0];
};

const getSeatStatus = async (client, flight_uuid, seat_row, seat_column) => {
  const res = await client.query(
    `SELECT is_booked FROM flight_seats 
             WHERE flight_uuid = $1 AND seat_row = $2 AND seat_column = $3;`,
    [flight_uuid, seat_row, seat_column]
  );
  if (!isPresent(res.rows[0])) {
    throw new Error(
      `Seat at row ${seat_row}, column ${seat_column} does not exist for flight ${flight_uuid}.`
    );
  }
  return res.rows[0].is_booked;
};

module.exports = {
  getPriceByTicketID,
  updateSeatStatus,
  getSeatStatus,
};
