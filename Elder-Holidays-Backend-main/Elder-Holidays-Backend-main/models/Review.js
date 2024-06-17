const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  client_img: {
    type: String,
    required: true,
  },

  location_img: {
    type: String,
    required: true,
  },

  assistance_rating: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  tour_rating: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  hotel_rating: {
    type: mongoose.Types.Decimal128,
    required: true,
  },

  total_rating: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
