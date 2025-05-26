const express = require("express");
const router = express.Router();

const {
  bookingController,
  getTicketByIdController,
  getTicketByUserIdController,
  getPassengerByTicketIdController,
  deleteTicketByIdController,
} = require("../controllers");

router.post("/booking", bookingController);
router.get("/get-id", getTicketByIdController);
router.get("/user-tickets", getTicketByUserIdController);
router.get("/passenger", getPassengerByTicketIdController);
router.delete("/delete", deleteTicketByIdController);

module.exports = router;
