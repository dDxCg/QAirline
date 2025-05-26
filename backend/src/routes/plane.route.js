const express = require("express");
const router = express.Router();

const {
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
  deletePlaneForceController,
  deletePlaneSafeController,
} = require("../controllers");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/create", protect, authorizeRoles("admin"), createPlaneController);
router.put("/update", protect, authorizeRoles("admin"), updatePlaneController);
router.get(
  "/:plane_id",
  protect,
  authorizeRoles("admin"),
  getPlaneByIdController
);
router.delete(
  "/delete-safe/:plane_id",
  protect,
  authorizeRoles("admin"),
  deletePlaneSafeController
);
router.delete(
  "/delete-force/:plane_id",
  protect,
  authorizeRoles("admin"),
  deletePlaneForceController
);

module.exports = router;
