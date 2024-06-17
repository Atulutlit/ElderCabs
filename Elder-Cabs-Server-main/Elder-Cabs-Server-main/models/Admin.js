const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Add your email"],
  },
  password: {
    type: String,
    required: [true, "Add password"],
  },
  adminOf: {
    type: String,
    default: 'elder_cabs',
  },
  termsAndConditions: {
    type: Object,
    default: {},
  },
  surgeDates: [String]
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
