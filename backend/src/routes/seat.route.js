const express = require("express");
const router = express.Router();

const {
  getSeatsByFlightIdController,
  updatePriceByClassController,
  updateSeatStatusController,
} = require("../controllers");

router.get("/available-seats", getSeatsByFlightIdController);
router.put("/update-status", updateSeatStatusController);
router.put("/update-price", updatePriceByClassController);

module.exports = router;
