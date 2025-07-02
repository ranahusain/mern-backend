// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");

// router.post("/signup", async (req, res) => {
//   console.log("Received request for POST method");
//   console.log("Request Body:", req.body);
//   try {
//     console.log("Signup request received:", req.body);

//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists with this email",
//       });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     console.log("User saved:", newUser);
//     res.status(200).json({
//       success: true,
//       user: newUser,
//     });

//     //generate JWT token for user and send it
//     const token = jwt.sign(
//       { id: User._id },
//       "shhhh", //use something like process.env.jwtsecret);
//       { expiresIn: "2h" }
//     );
//     User.token = token;
//     User.password = undefined;
//   } catch (err) {
//     console.error("Error while saving user:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token (use ._id from the saved user)
    const token = jwt.sign(
      { id: newUser._id },
      // "shhhh",
      process.env.JWTSECRET, // Ideally: process.env.JWT_SECRET
      { expiresIn: "2h" }
    );

    // Add token and remove password before sending back
    newUser.token = token;
    newUser.password = undefined;

    // Send response with cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      // httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user: newUser,
    });
  } catch (err) {
    console.error("Error while signing up:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
