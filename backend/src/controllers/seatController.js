const { getSeatsByFlightId, updatePriceByClass } = require("../models");
const { isPresent } = require("../utils");

const getSeatsByFlightIdController = async (req, res) => {
  const { flight_uuid } = req.body;
  if (!isPresent(flight_uuid)) {
    return res.status(400).json({
      success: false,
      message: "Flight UUID is required.",
    });
  }
  try {
    const seats = await getSeatsByFlightId(flight_uuid);
    return res.status(200).json({
      success: true,
      message: "Seats get successfully.",
      seats: seats,
    });
  } catch (error) {
    console.error("Error get seats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get seats.",
    });
  }
};

const updatePriceByClassController = async (req, res) => {
  const { flight_uuid, seat_class, price } = req.body;
  if (!isPresent(flight_uuid) || !isPresent(seat_class) || !isPresent(price)) {
    return res.status(400).json({
      success: false,
      message: "Flight UUID, seat class, and price are required.",
    });
  }
  try {
    const updatedSeat = await updatePriceByClass(
      flight_uuid,
      seat_class,
      price
    );
    return res.status(200).json({
      success: true,
      message: "Seats price updated successfully.",
      seat: updatedSeat,
    });
  } catch (error) {
    console.error("Error updating seat price:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update seat price.",
    });
  }
};

module.exports = {
  getSeatsByFlightIdController,
  updatePriceByClassController,
};
