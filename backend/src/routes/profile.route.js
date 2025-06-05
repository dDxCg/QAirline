const express = require("express");
const router = express.Router();
const {
  user_info,
  update,
  deleteAccountController,
  getAccountByEmailController,
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
router.post(
  "/account",
  protect,
  authorizeRoles("admin", "passenger"),
  getAccountByEmailController
);

module.exports = router;
