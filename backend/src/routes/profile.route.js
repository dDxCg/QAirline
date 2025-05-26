const express = require("express");
const router = express.Router();
const { user_info, update } = require("../controllers");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

router.get("/info", protect, authorizeRoles("admin", "passenger"), user_info);
router.put("/update", protect, authorizeRoles("admin", "passenger"), update);

module.exports = router;
