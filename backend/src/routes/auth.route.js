const express = require("express");
const router = express.Router();
const { register, login, guest } = require("../controllers");

router.post("/register", register);
router.post("/login", login);
router.post("/guest", guest);

module.exports = router;
