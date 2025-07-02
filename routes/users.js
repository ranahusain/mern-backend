const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const auth = require("../middlware/auth");
//read all user

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
