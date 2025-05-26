const express = require("express");
const router = express.Router();

const {
  createPlaneController,
  updatePlaneController,
  getPlaneByIdController,
} = require("../controllers");

router.post("/create", createPlaneController);
router.put("/update", updatePlaneController);
router.get("/:plane_id", getPlaneByIdController);

module.exports = router;
