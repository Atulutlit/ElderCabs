const router = require("express").Router();
const reviewController = require("../controllers/review");

// get all reviews
router.get("/", reviewController.getAllReviews);

// get specific review by id
router.get("/:id", reviewController.getReviewById);

// create new review
router.post("/", reviewController.createReview);

// update review
router.put("/:id", reviewController.updateReview);

// delete review
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
