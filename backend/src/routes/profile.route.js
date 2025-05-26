const express = require("express");
const router = express.Router();
const {
  user_info,
  update,
  deleteAccountController,
} = require("../controllers");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/info", protect, authorizeRoles("admin", "passenger"), user_info);
router.put("/update", protect, authorizeRoles("admin", "passenger"), update);
router.delete(
  "/delete",
  protect,
  authorizeRoles("admin", "passenger"),
  deleteAccountController
);

module.exports = router;
