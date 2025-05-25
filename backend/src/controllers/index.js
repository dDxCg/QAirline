const { register, login } = require("./authController");
const { user_info, update } = require("./profileController");
const {
  getSeatsByFlightIdController,
  updateSeatStatusController,
  updatePriceByClassController,
} = require("./seatController");
const {
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
} = require("./planeController");

module.exports = {
  //authentication
  register,
  login,
  //profile
  user_info,
  update,
  //seat
  getSeatsByFlightIdController,
  updateSeatStatusController,
  updatePriceByClassController,
  //flight
  //plane
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
};
