const express = require("express");
const router = express.Router();

const {
  getSeatsByFlightIdController,
  updatePriceByClassController,
  getSeatMapByFlightIdController,
} = require("../controllers");

router.post("/available-seats", getSeatsByFlightIdController);
router.put("/update-price", updatePriceByClassController);
router.post("/seat-map", getSeatMapByFlightIdController);

module.exports = router;
