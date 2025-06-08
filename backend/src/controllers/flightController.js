const {
  createFlight,
  getAllFlights,
  getFlightById,
  getFlightsByOriginAndDestination,
  updateFlight,
  searchFlight,
  initSeats,
  deleteFlightForce,
  deleteFlightSafe,
  updatePriceByClass,
} = require("../models");
const {
  getTotalFlightsByDate,
  getTotalBookingsByDate,
} = require("../models/Statistic");

const { isPresent } = require("../utils");
const { DBPostgre } = require("../configs");
const { getIO } = require("../utils/socketServices");
require("dotenv").config();

const createFlightController = async (req, res) => {
  const {
    origin,
    destination,
    departureTime,
    arrivalTime,
    plane_id,
    economy_price,
    premium_economy_price,
    business_price,
    first_class_price,
  } = req.body;
  if (
    !isPresent(origin) ||
    !isPresent(destination) ||
    !isPresent(departureTime) ||
    !isPresent(plane_id)
  ) {
    return res.status(400).json({
      success: false,
      message: "Origin, Destination, DepartureTime ,PlaneID are required.",
      data: {
        origin,
        destination,
        departureTime,
        arrivalTime,
        plane_id,
      },
    });
  }

  const client = await DBPostgre.connect();
  try {
    await client.query("BEGIN");
    const flight = await createFlight(
      client,
      origin,
      destination,
      departureTime,
      arrivalTime,
      plane_id
    );

    await initSeats(client, flight.flight_uuid);
    await updatePriceByClass(
      client,
      flight.flight_uuid,
      "economy",
      economy_price || 0
    );
    await updatePriceByClass(
      client,
      flight.flight_uuid,
      "premium_economy",
      premium_economy_price || 0
    );
    await updatePriceByClass(
      client,
      flight.flight_uuid,
      "business",
      business_price || 0
    );
    await updatePriceByClass(
      client,
      flight.flight_uuid,
      "first",
      first_class_price || 0
    );
    const io = getIO();
    const allFlights = await getAllFlights(client);
    const flightStats = await getTotalFlightsByDate(client, new Date());
    const bookingStats = await getTotalBookingsByDate(client, new Date());
    const dashboard = {
      booking_today: bookingStats.total_bookings,
      revenue_today: bookingStats.revenue,
      active_flights_today: flightStats.total_flights,
      booking_change: bookingStats.change_bookings,
      revenue_change: bookingStats.change_revenue,
      active_flights_change: flightStats.change_flights,
    };
    io.emit("flightsUpdate", allFlights);
    io.emit("dashboardUpdate", dashboard);

    await client.query("COMMIT");
    return res.status(200).json({
      success: true,
      message: "Flight created successfully.",
      flight,
    });
  } catch (error) {
    console.error("Error creating flight:", error);
    await client.query("ROLLBACK");
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  } finally {
    client.release();
  }
};

const getAllFlightsController = async (req, res) => {
  const client = await DBPostgre.connect();
  try {
    const flights = await getAllFlights(client);
    return res.status(200).json({
      success: true,
      message: "Flights retrieved successfully.",
      flights,
    });
  } catch (error) {
    console.error("Error retrieving flights:", error);
    client.release();
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve flights.",
    });
  }
};

const getFlightByIdController = async (req, res) => {
  const { flight_id } = req.body;
  if (!isPresent(flight_id)) {
    return res.status(400).json({
      success: false,
      message: "Flight ID is required.",
    });
  }
  try {
    const flight = await getFlightById(flight_id);
    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Get flight successfully.",
      flight,
    });
  } catch (error) {
    console.error("Error retrieving flight by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve flight.",
    });
  }
};

const getFlightsByOriginAndDestinationController = async (req, res) => {
  const { origin, destination } = req.body;
  if (!isPresent(origin) || !isPresent(destination)) {
    return res.status(400).json({
      success: false,
      message: "Origin and Destination are required.",
    });
  }
  try {
    const flights = await getFlightsByOriginAndDestination(origin, destination);
    return res.status(200).json({
      success: true,
      message: "Flights retrieved successfully.",
      flights,
    });
  } catch (error) {
    console.error("Error retrieving flights by origin and destination:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve flights.",
    });
  }
};

const searchFlightController = async (req, res) => {
  const { origin, destination, departureTime } = req.body;
  const client = await DBPostgre.connect();
  try {
    const flights = await searchFlight(
      client,
      origin,
      destination,
      departureTime
    );
    return res.status(200).json({
      success: true,
      message: "Flights retrieved successfully.",
      flights,
    });
  } catch (error) {
    console.error("Error searching flight:", error);
    client.release();
    return res.status(500).json({
      success: false,
      message: "Failed to search flight.",
    });
  }
};

const updateFlightController = async (req, res) => {
  const {
    flightId,
    origin,
    destination,
    departureTime,
    arrivalTime,
    planeId,
    status,
  } = req.body;

  if (!isPresent(flightId)) {
    return res.status(400).json({
      success: false,
      message: "Flight UUID is required.",
    });
  }

  try {
    const flight = await updateFlight(
      origin,
      destination,
      departureTime,
      arrivalTime,
      planeId,
      status,
      flightId
    );

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Flight updated successfully.",
      flight,
    });
  } catch (error) {
    console.error("Error updating flight:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update flight.",
    });
  }
};

const deleteFlightSafeController = async (req, res) => {
  const { flight_id } = req.body;

  if (!isPresent(flight_id)) {
    return res.status(400).json({
      success: false,
      message: "Flight ID is required.",
    });
  }

  try {
    const flight = await deleteFlightSafe(flight_id);
    return res.status(200).json({
      success: true,
      message: "Flight deleted successfully.",
      flight,
    });
  } catch (error) {
    console.error("Error deleting flight:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete flight.",
    });
  }
};

const deleteFlightForceController = async (req, res) => {
  const { flight_id } = req.body;

  if (!isPresent(flight_id)) {
    return res.status(400).json({
      success: false,
      message: "Flight ID is required.",
    });
  }

  const client = await DBPostgre.connect();
  try {
    const flight = await deleteFlightForce(client, flight_id);
    return res.status(200).json({
      success: true,
      message: "Flight deleted successfully.",
      flight,
    });
  } catch (error) {
    console.error("Error deleting flight forcefully:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete flight.",
    });
  }
};

module.exports = {
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  searchFlightController,
  updateFlightController,
  deleteFlightForceController,
  deleteFlightSafeController,
};
