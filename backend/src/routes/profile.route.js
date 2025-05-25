const express = require("express");
const router = express.Router();
const { user_info, update } = require("../controllers");

router.get("/info", user_info);
router.put("/update", update);

module.exports = router;
