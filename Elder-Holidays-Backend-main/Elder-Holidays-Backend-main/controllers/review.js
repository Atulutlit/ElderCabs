// review model
const Review = require("../models/Review");

// Get All Reviews
exports.getAllReviews = async (req, res) => {
  try {
    const result = await Review.find({}).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get Review By Id
exports.getReviewById = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const result = await Review.findById(reviewId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create Review
exports.createReview = async (req, res) => {
  const newReview = req.body;
  try {
    const insertReview = await Review(newReview);
    insertReview.save((err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.status(500).send(err.message);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const updateData = req.body;
  try {
    const result = await Review.findByIdAndUpdate(reviewId, updateData);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    const result = await Review.findByIdAndDelete(reviewId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
