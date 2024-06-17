const router = require("express").Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    // Check If Admin Exists
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        error: "Invalid Credentials",
      });
    }

    // Check If Password Valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        error: "Invalid Credentials",
      });
    }

    // Generate Token
    const token = await jwt.sign(
      { email: req.body.email, user_id: req.body.user_id },
      process.env.TOKEN_SECRET
    );
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

router.get("/validate", async (req, res) => {
  // Check if Token Corresponds to Admin
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.decode(token);
    const admin = await Admin.findOne({ email: decoded.email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;
