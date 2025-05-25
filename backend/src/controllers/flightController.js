const {
  createFlight,
  getAllFlights,
  getFlightById,
  getFlightsByOriginAndDestination,
  updateFlight,
} = require("../models");
const { get } = require("../routes/profile.route");

const { isPresent } = require("../utils");
require("dotenv").config();

const createFlightController = async (req, res) => {};

const getAllFlightsController = async (req, res) => {};

const getFlightByIdController = async (req, res) => {};

const getFlightsByOriginAndDestinationController = async (req, res) => {};

const updateFlightController = async (req, res) => {};

module.exports = {
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  updateFlightController,
};
