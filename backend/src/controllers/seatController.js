const {
  getSeatsByFlightId,
  updatePriceByClass,
  getBasePrice,
} = require("../models");
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
  const client = await DBPostgre.connect();
  try {
    const updatedSeat = await updatePriceByClass(
      client,
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
    client.release();
    return res.status(500).json({
      success: false,
      message: "Failed to update seat price.",
    });
  }
};

const getSeatMapByFlightIdController = async (req, res) => {
  const { flight_uuid } = req.body;
  if (!isPresent(flight_uuid)) {
    return res.status(400).json({
      success: false,
      message: "Flight UUID is required.",
    });
  }
  try {
    const seatMap = await getSeatsByFlightId(flight_uuid);
    return res.status(200).json({
      success: true,
      message: "Seat map retrieved successfully.",
      seats: seatMap,
    });
  } catch (error) {
    console.error("Error retrieving seat map:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve seat map.",
    });
  }
};

const getBasePriceController = async (req, res) => {
  const { flight_uuid, seatID } = req.body;
  if (!isPresent(flight_uuid) || !isPresent(seatID)) {
    return res.status(400).json({
      success: false,
      message: "Flight UUID and seat ID are required.",
    });
  }
  const client = await DBPostgre.connect();
  try {
    const basePrice = await getBasePrice(client, flight_uuid, seatID);
    return res.status(200).json({
      success: true,
      message: "Base price retrieved successfully.",
      basePrice: basePrice,
    });
  } catch (error) {
    console.error("Error retrieving base price:", error);
    client.release();
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve base price.",
    });
  }
};

module.exports = {
  getSeatsByFlightIdController,
  updatePriceByClassController,
  getSeatMapByFlightIdController,
  getBasePriceController,
};
