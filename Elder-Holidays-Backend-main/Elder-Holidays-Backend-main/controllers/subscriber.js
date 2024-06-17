// subscriber model
const Subscriber = require("../models/Subscriber");

// Get All Subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const result = await Subscriber.find({}).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create New Subscriber
exports.createSubscriber = async (req, res) => {
  const newSubscriber = req.body;
  try {
    const insertSubscriber = await Subscriber(newSubscriber);
    insertSubscriber.save((err, result) => {
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
