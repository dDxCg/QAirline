const { register, login, guest } = require("./authController");
const { user_info, update } = require("./profileController");
const {
  getSeatsByFlightIdController,
  updatePriceByClassController,
} = require("./seatController");
const {
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
} = require("./planeController");
const {
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  updateFlightController,
} = require("./flightController");
const {
  bookingController,
  getTicketByIdController,
  getTicketByUserIdController,
  getPassengerByTicketIdController,
  deleteTicketByIdController,
} = require("./bookingController");

module.exports = {
  //authentication
  register,
  login,
  guest,
  //profile
  user_info,
  update,
  //seat
  getSeatsByFlightIdController,
  updatePriceByClassController,
  //flight
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  updateFlightController,
  //plane
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
  //booking
  bookingController,
  getTicketByIdController,
  getTicketByUserIdController,
  getPassengerByTicketIdController,
  deleteTicketByIdController,
};
