const express = require("express");
const router = express.Router();

const {
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  updateFlightController,
} = require("../controllers");

router.post("/create", createFlightController);
router.get("/all", getAllFlightsController);
router.get("/search-id", getFlightByIdController);
router.get("/search-locations", getFlightsByOriginAndDestinationController);
router.put("/update", updateFlightController);

module.exports = router;
