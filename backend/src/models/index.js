const { getAccountByEmail, createAccount } = require("./Account");
const {
  createFlight,
  getFlightById,
  getFlightsByOriginAndDestination,
  getAllFlights,
  updateFlight,
} = require("./Flight");
const {} = require("./Ticket");
const { createPlane, updatePlane } = require("./Plane");
const {
  updateProfile,
  getProfileById,
  initProfile,
} = require("./User_Profile");

module.exports = {
  createAccount,
  getAccountByEmail,
  createFlight,
  getFlightById,
  getFlightsByOriginAndDestination,
  getAllFlights,
  updateFlight,
  createPlane,
  updatePlane,
  updateProfile,
  getProfileById,
  initProfile,
};
