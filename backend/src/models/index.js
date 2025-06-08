const {
  getAccountByEmail,
  getAccountByID,
  createAccount,
  deleteAccount,
} = require("./Account");
const {
  createFlight,
  getFlightById,
  getFlightsByOriginAndDestination,
  getAllFlights,
  searchFlight,
  updateFlight,
  deleteFlightForce,
  deleteFlightSafe,
} = require("./Flight");
const {
  createPlane,
  updatePlane,
  getPLaneById,
  deletePlaneForce,
  deletePlaneSafe,
} = require("./Plane");
const {
  updateProfile,
  getProfileById,
  initProfile,
} = require("./User_Profile");
const {
  initSeats,
  getSeatsByFlightId,
  updatePriceByClass,
  getSeatMapByFlightId,
  getBasePrice,
} = require("./FlightSeat");
const {
  bookingTicket,
  getTicketById,
  getTicketByUserId,
  getPassengerByTicketId,
  createPassengerInfo,
  fetchPassengerFromUserId,
  deleteTicketById,
} = require("./Ticket");

module.exports = {
  //Account related functions
  createAccount,
  getAccountByEmail,
  deleteAccount,
  getAccountByID,
  //flight related functions
  createFlight,
  getFlightById,
  getFlightsByOriginAndDestination,
  getAllFlights,
  searchFlight,
  updateFlight,
  deleteFlightForce,
  deleteFlightSafe,
  //plane related functions
  createPlane,
  updatePlane,
  getPLaneById,
  deletePlaneForce,
  deletePlaneSafe,
  //profile related functions
  updateProfile,
  getProfileById,
  initProfile,
  //Seats related functions
  initSeats,
  getSeatsByFlightId,
  updatePriceByClass,
  getSeatMapByFlightId,
  getBasePrice,
  //Ticket related functions
  bookingTicket,
  getTicketById,
  getTicketByUserId,
  getPassengerByTicketId,
  createPassengerInfo,
  fetchPassengerFromUserId,
  deleteTicketById,
  //statistic related functions
};
