const { DBPostgre } = require("../configs");
const { isPresent, isValidEmail } = require("../utils");
const { getSeatStatus, updateSeatStatus } = require("../utils/seatUtils");

const {
  bookingTicket,
  getTicketById,
  getTicketByUserId,
  getPassengerByTicketId,
  createPassengerInfo,
  fetchPassengerFromUserId,
  deleteTicketById,
} = require("../models");
const { update } = require("./profileController");

const bookingController = async (req, res) => {
  const {
    is_fetch,
    flight_uuid,
    seat_row,
    seat_column,
    user_uuid,
    full_name,
    email,
    phone_number,
    date_of_birth,
    gender,
    nationality,
    id_number,
    passport_number,
    passport_expiry_date,
  } = req.body;

  if (!isPresent(flight_uuid)) {
    return res.status(400).json({ error: "Flight UUID is required" });
  }
  if (!isPresent(seat_row) || !isPresent(seat_column)) {
    return res.status(400).json({ error: "Seat locate are required" });
  }
  if (!is_fetch) {
    const requiredFields = [];

    if (!isPresent(full_name)) {
      requiredFields.push("full_name");
    }
    if (!isPresent(date_of_birth)) {
      requiredFields.push("date_of_birth");
    }
    if (!isPresent(gender)) {
      requiredFields.push("gender");
    }
    if (!isPresent(nationality)) {
      requiredFields.push("nationality");
    }
    if (requiredFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields for passenger information: ${requiredFields.join(
          ", "
        )}.`,
      });
    }
    if (!isPresent(id_number) && !isPresent(passport_number)) {
      return res
        .status(400)
        .json({ error: "ID number or passport number is required" });
    }
    if (isPresent(passport_number) && !isPresent(passport_expiry_date)) {
      return res
        .status(400)
        .json({ error: "Passport expiry date is required" });
    }
    if (isPresent(email) && !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
  }
  if (is_fetch && !isPresent(user_uuid)) {
    return res
      .status(400)
      .json({ error: "User UUID is required for fetching" });
  }
  const client = await DBPostgre.connect();

  try {
    await client.query("BEGIN");

    const seatStatus = await getSeatStatus(
      client,
      flight_uuid,
      seat_row,
      seat_column
    );
    if (seatStatus) {
      return res.status(400).json({ error: "Seat is already booked" });
    }

    const ticket = await bookingTicket(
      client,
      flight_uuid,
      seat_row,
      seat_column,
      user_uuid
    );
    if (!ticket) {
      return res.status(400).json({ error: "Create Ticket Fail" });
    }
    const updateSeatRes = await updateSeatStatus(
      client,
      flight_uuid,
      seat_row,
      seat_column,
      true
    );
    if (!isPresent(updateSeatRes)) {
      throw new Error("Failed to update seat status");
    }

    if (is_fetch) {
      const fetchRes = await fetchPassengerFromUserId(
        client,
        user_uuid,
        ticket.ticket_uuid
      );
      if (!isPresent(fetchRes)) {
        return res.status(400).json({ error: "Fetch Passenger Fail" });
      }
    } else {
      const createPassengerInfoRes = await createPassengerInfo(
        client,
        ticket.ticket_uuid,
        full_name,
        email,
        phone_number,
        date_of_birth,
        gender,
        nationality,
        id_number,
        passport_number,
        passport_expiry_date
      );
      if (!isPresent(createPassengerInfoRes)) {
        return res.status(400).json({ error: "Create Passenger Info Fail" });
      }
    }
    await client.query("COMMIT");
    return res.status(200).json({
      success: true,
      message: "Booking successful",
      ticket: {
        seat_row: ticket.seat_row,
        seat_column: ticket.seat_column,
        price: ticket.price,
        flight_uuid: ticket.flight_uuid,
        ticket_uuid: ticket.ticket_uuid,
      },
    });
  } catch (error) {
    console.error("Error starting transaction:", error);
    if (client) {
      await client.query("ROLLBACK");
    }
    return res.status(500).json({ error: "Booking Fail" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

const getTicketByIdController = async (req, res) => {
  const { ticket_id } = req.body;
  if (!isPresent(ticket_id)) {
    return res.status(400).json({ error: "Ticket ID is required" });
  }
  const ticket = await getTicketById(ticket_id);
  if (!isPresent(ticket)) {
    return res.status(404).json({ error: "Ticket not found" });
  }
  return res.status(200).json({
    success: true,
    message: "Ticket retrieved successfully",
    ticket: ticket,
  });
};

const getTicketByUserIdController = async (req, res) => {
  const { user_id } = req.body;
  if (!isPresent(user_id)) {
    return res.status(400).json({ error: "User UUID is required" });
  }
  const tickets = await getTicketByUserId(user_id);
  return res.status(200).json({
    success: true,
    message: "Tickets retrieved successfully",
    tickets: tickets,
  });
};

const getPassengerByTicketIdController = async (req, res) => {
  const { ticket_id } = req.body;
  if (!isPresent(ticket_id)) {
    return res.status(400).json({ error: "Ticket ID is required" });
  }
  const passenger = await getPassengerByTicketId(ticket_id);
  if (!isPresent(passenger)) {
    return res.status(404).json({ error: "Passenger not found" });
  }
  return res.status(200).json({
    success: true,
    message: "Passenger retrieved successfully",
    passenger: {
      full_name: passenger.full_name,
      email: passenger.email,
      phone_number: passenger.phone_number,
      date_of_birth: passenger.date_of_birth,
      gender: passenger.gender,
      nationality: passenger.nationality,
      id_number: passenger.id_number,
      passport_number: passenger.passport_number,
      passport_expiry_date: passenger.passport_expiry_date,
    },
  });
};

const deleteTicketByIdController = async (req, res) => {
  const { ticket_id } = req.body;
  if (!isPresent(ticket_id)) {
    return res.status(400).json({ error: "Ticket ID is required" });
  }

  const client = await DBPostgre.connect();
  try {
    await client.query("BEGIN");

    const deleteTicket = await deleteTicketById(client, ticket_id);
    if (!isPresent(deleteTicket)) {
      throw new Error("Failed to delete ticket");
    }

    const updateSeatRes = await updateSeatStatus(
      client,
      deleteTicket.flight_uuid,
      deleteTicket.seat_row,
      deleteTicket.seat_column,
      false
    );
    if (!isPresent(updateSeatRes)) {
      throw new Error("Failed to update seat status");
    }

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    if (client) {
      client.query("ROLLBACK");
    }
    return res.status(500).json({ error: "Delete Fail" });
  } finally {
    if (client) {
      client.release();
    }
  }
};

module.exports = {
  bookingController,
  getTicketByIdController,
  getTicketByUserIdController,
  getPassengerByTicketIdController,
  deleteTicketByIdController,
};
