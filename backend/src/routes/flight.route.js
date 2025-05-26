const express = require("express");
const router = express.Router();

const {
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  updateFlightController,
} = require("../controllers");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  createFlightController
);
router.get("/all", getAllFlightsController);
router.get("/search-id", getFlightByIdController);
router.get("/search-locations", getFlightsByOriginAndDestinationController);
router.put("/update", protect, authorizeRoles("admin"), updateFlightController);

module.exports = router;
