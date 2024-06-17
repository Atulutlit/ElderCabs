const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  image: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  duration: {
    type: String,
    required: true,
  },

  theme: {
    type: String,
  },

  category: {
    type: String,
  },

  car: {
    type: String,
    required: true,
  },

  hotel: {
    type: String,
    required: true,
  },

  activities: {
    type: [],
    required: true,
  },

  price_range: {
    type: String,
    required: true,
  },

  click_count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Package = mongoose.model("package", packageSchema);
module.exports = Package;
