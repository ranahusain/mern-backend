const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();

router.post("/login", async (req, res) => {
  console.log("Received request for POST method");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json("user not found");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;
      res.status(200).json({
        success: true,
        token,
        user,
      });
    }
  } catch (err) {
    console.error("Error while loggin in", err);
  }
});

module.exports = router;
