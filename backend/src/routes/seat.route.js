const express = require("express");
const router = express.Router();

const {
  getSeatsByFlightIdController,
  updatePriceByClassController,
} = require("../controllers");

router.post("/available-seats", getSeatsByFlightIdController);
router.put("/update-price", updatePriceByClassController);

module.exports = router;
