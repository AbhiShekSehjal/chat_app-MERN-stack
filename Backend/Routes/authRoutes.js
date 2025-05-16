const { registerUser, loginUser } = require("../Controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);

module.exports = router;