const express = require("express");
const router = express.Router();

const {
  bookingController,
  getTicketByIdController,
  getTicketByUserIdController,
  getPassengerByTicketIdController,
  deleteTicketByIdController,
} = require("../controllers");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/booking", bookingController);
router.post("/get-id", getTicketByIdController);
router.post(
  "/user-tickets",
  protect,
  authorizeRoles("admin", "passenger"),
  getTicketByUserIdController
);
router.post("/passenger", getPassengerByTicketIdController);
router.delete("/delete", deleteTicketByIdController);

module.exports = router;
