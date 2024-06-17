const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "Add username"],
  },

  password: {
    type: String,
    required: [true, "Add password"],
  },

  name: {
    type: String,
    required: [true, "Add your full name"],
  },

  email: {
    type: String,
    required: [true, "Add your email"],
  },
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
