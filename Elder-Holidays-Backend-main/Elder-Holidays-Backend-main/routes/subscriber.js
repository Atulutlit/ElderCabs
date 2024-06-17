const router = require("express").Router();
const subscriberController = require("../controllers/subscriber");

// get all subscribers
router.get("/", subscriberController.getAllSubscribers);

// create new subscriber
router.post("/", subscriberController.createSubscriber);

module.exports = router;
