const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const auth = require("../middlware/auth");

router.get("/verify", auth, async (req, res) => {
  try {
    res.status(200).send("User is authenticated");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
