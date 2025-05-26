const { register, login, guest } = require("./authController");
const {
  user_info,
  update,
  deleteAccountController,
} = require("./profileController");
const {
  getSeatsByFlightIdController,
  updatePriceByClassController,
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

module.exports = {
  //authentication
  register,
  login,
  guest,
  //profile
  user_info,
  update,
  deleteAccountController,
  //seat
  getSeatsByFlightIdController,
  updatePriceByClassController,
  //flight
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
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
