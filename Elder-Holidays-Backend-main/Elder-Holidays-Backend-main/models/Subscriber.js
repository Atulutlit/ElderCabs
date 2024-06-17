const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Add your full name"],
  },
  email: {
    type: String,
    required: [true, "Add your e-mail"],
  },

  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("subscriber", subscriberSchema);
