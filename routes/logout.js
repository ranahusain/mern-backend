const express = require("express");
const router = express.Router();
//read all user

router.get("/logout", async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({
    success: true,
    message: "LoggedOut Successfully",
  });
});

module.exports = router;
