const {
  createFlight,
  getAllFlights,
  getFlightById,
  getFlightsByOriginAndDestination,
  updateFlight,
  initSeats,
  deleteFlightForce,
  deleteFlightSafe,
} = require("../models");

const { isPresent } = require("../utils");
const { DBPostgre } = require("../configs");
require("dotenv").config();

const createFlightController = async (req, res) => {
  const { origin, destination, departureTime, arrivalTime, plane_id } =
    req.body;
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
    const flight = await createFlight(
      client,
      origin,
      destination,
      departureTime,
      arrivalTime,
      plane_id
    );

    await initSeats(client, flight.flight_uuid);

    return res.status(200).json({
      success: true,
      message: "Flight created successfully.",
      flight,
    });
  } catch (error) {
    console.error("Error creating flight:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getAllFlightsController = async (req, res) => {
  try {
    const flights = await getAllFlights();
    return res.status(200).json({
      success: true,
      message: "Flights retrieved successfully.",
      flights,
    });
  } catch (error) {
    console.error("Error retrieving flights:", error);
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
  updateFlightController,
  deleteFlightForceController,
  deleteFlightSafeController,
};
