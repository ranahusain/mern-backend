const express = require("express");
const router = express.Router();
//read all user

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
