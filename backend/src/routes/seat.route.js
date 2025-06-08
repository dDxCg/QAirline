const express = require("express");
const router = express.Router();

const {
  getSeatsByFlightIdController,
  updatePriceByClassController,
  getSeatMapByFlightIdController,
  getBasePriceController,
} = require("../controllers");

router.post("/available-seats", getSeatsByFlightIdController);
router.put("/update-price", updatePriceByClassController);
router.post("/seat-map", getSeatMapByFlightIdController);
router.post("/price", getBasePriceController);

module.exports = router;
