const express = require("express");
const router = express.Router();

const {
  createFlightController,
  getAllFlightsController,
  getFlightByIdController,
  getFlightsByOriginAndDestinationController,
  searchFlightController,
  updateFlightController,
  deleteFlightForceController,
  deleteFlightSafeController,
} = require("../controllers");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post(
  "/create",
  protect,
  authorizeRoles("admin"),
  createFlightController
);
router.get("/all", getAllFlightsController);
router.post("/search-id", getFlightByIdController);
router.post("/search-locations", getFlightsByOriginAndDestinationController);
router.put("/update", protect, authorizeRoles("admin"), updateFlightController);

router.delete(
  "/delete-safe",
  protect,
  authorizeRoles("admin"),
  deleteFlightSafeController
);
router.delete(
  "/delete-force",
  protect,
  authorizeRoles("admin"),
  deleteFlightForceController
);
router.post("/search", searchFlightController);

module.exports = router;
