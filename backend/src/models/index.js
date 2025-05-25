const { getAccountByEmail, createAccount } = require("./Account");
const {
  createFlight,
  getFlightById,
  getFlightsByOriginAndDestination,
  getAllFlights,
  updateFlight,
} = require("./Flight");
const {} = require("./Ticket");
const { createPlane, updatePlane, getPLaneById } = require("./Plane");
const {
  updateProfile,
  getProfileById,
  initProfile,
} = require("./User_Profile");
const {
  initSeats,
  getSeatsByFlightId,
  updateSeatStatus,
  updatePriceByClass,
} = require("./FlightSeat");

module.exports = {
  //authentication related functions
  createAccount,
  getAccountByEmail,
  //flight related functions
  createFlight,
  getFlightById,
  getFlightsByOriginAndDestination,
  getAllFlights,
  updateFlight,
  //plane related functions
  createPlane,
  updatePlane,
  getPLaneById,
  //profile related functions
  updateProfile,
  getProfileById,
  initProfile,
  //Seats related functions
  initSeats,
  getSeatsByFlightId,
  updateSeatStatus,
  updatePriceByClass,
  //Ticket related functions
};
