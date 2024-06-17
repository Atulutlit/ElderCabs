const LocalTrip = require("../models/LocalTrip");

// create a trip
exports.create = async (req, res) => {
    try {
        const newTrip = req.body;
        const result = await LocalTrip.create(newTrip);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get trips
exports.getAll = async (req, res) => {
    try {
        const result = await LocalTrip.find({})
            .populate('cars')
            .exec();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get sources cities
exports.getSources = async (req, res) => {
    try {
        let sourceCities = await LocalTrip.distinct('sourceCity').exec();

        sourceCities = sourceCities.sort();

        res.json({ source: sourceCities });
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}

// get by id
exports.getById = async (req, res) => {
    try {
        const result = await LocalTrip.findById(req.query.id).populate('cars').exec();;
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get by source city
exports.getBySource = async (req, res) => {
    try {
        const { source } = req.query;
        const result = await LocalTrip.find({ sourceCity: source }).populate('cars').exec();
        res.json(result)
    } catch (err) {
        res.status(400).send(err);
    }
}

// delete trip 
exports.delete = async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const result = await LocalTrip.findByIdAndDelete(tripId);
        res.status(208).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
}