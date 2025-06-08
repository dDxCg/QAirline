const { register, login, guest } = require("./authController");
const {
  user_info,
  update,
  deleteAccountController,
  getAccountByEmailController,
} = require("./profileController");
const {
  getSeatsByFlightIdController,
  updatePriceByClassController,
  getSeatMapByFlightIdController,
  getBasePriceController,
} = require("./seatController");
const {
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
  deletePlaneForceController,
  deletePlaneSafeController,
} = require("./planeController");
const {
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  searchFlightController,
  updateFlightController,
  deleteFlightForceController,
  deleteFlightSafeController,
} = require("./flightController");
const {
  bookingController,
  getTicketByIdController,
  getTicketByUserIdController,
  getPassengerByTicketIdController,
  deleteTicketByIdController,
} = require("./bookingController");
const { getSeatMapByFlightId, getBasePrice } = require("../models/FlightSeat");

module.exports = {
  //authentication
  register,
  login,
  guest,
  //profile
  user_info,
  update,
  deleteAccountController,
  getAccountByEmailController,
  //seat
  getSeatsByFlightIdController,
  updatePriceByClassController,
  getSeatMapByFlightIdController,
  getBasePriceController,
  //flight
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  searchFlightController,
  updateFlightController,
  deleteFlightForceController,
  deleteFlightSafeController,
  //plane
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
  deletePlaneForceController,
  deletePlaneSafeController,
  //booking
  bookingController,
  getTicketByIdController,
  getTicketByUserIdController,
  getPassengerByTicketIdController,
  deleteTicketByIdController,
};
