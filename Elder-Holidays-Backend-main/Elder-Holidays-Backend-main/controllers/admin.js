const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// Get Admin
exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json({
      success: true,
      count: admin.length,
      data: admin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Create Admin
exports.createAdmin = async (req, res) => {
  try {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: admin,
    });
  } catch {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Update Admin
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "No admin found",
      });
    }

    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.findOneAndUpdate(
      { email: req.body.email },
      {
        user_id: req.body.user_id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      }
    );

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
