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

    //check if the password matches
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (isPasswordValid) {
    //   return res.json({ success: true, user });
    // } else {
    //   return res.json({ success: false });
    // }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWTSECRET, //use something like process.env.jwtsecret);
        { expiresIn: "2h" }
      );

      user.token = token;
      user.password = undefined;

      //send token in user Cookie
      //cookie section
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true, //by this only Server Side can Manipulate the Cookie
        secure: true,
        sameSite: "None",
      };
      res.status(200).cookie("token", token, options).json({
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
