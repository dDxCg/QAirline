const express = require("express");
const router = express.Router();
const { user_info, update } = require("../controllers");

router.get("/user_info", user_info);
router.post("/update", update);

module.exports = router;
