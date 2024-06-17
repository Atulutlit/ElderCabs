const TransferTrip = require("../models/TransferTrip");

// create a trip
exports.create = async (req, res) => {
    try {
        const newTrip = req.body;
        const result = await TransferTrip.create(newTrip);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get trips
exports.getAll = async (req, res) => {
    try {
        const result = await TransferTrip.find({})
            .populate('cars')
            .exec();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get by id
exports.getById = async (req, res) => {
    try {
        const result = await TransferTrip.findById(req.query.id).populate('cars').exec();;
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get sources and destinations
exports.getSourcesAndDestinations = async (req, res) => {
    try {
        let sourceCities = await TransferTrip.distinct('sourceCity').exec();
        let destinationCities = await TransferTrip.find({}).select('sourceCity destination').exec();

        sourceCities = sourceCities.sort();

        const destinationsObj = {};
        for (let destination of destinationCities) {
            if (destinationsObj[destination.sourceCity]) {
                destinationsObj[destination.sourceCity] = [...new Set([...destinationsObj[destination.sourceCity], destination.destination])].sort();
            } else {
                destinationsObj[destination.sourceCity] = [destination.destination];
            }
        }

        res.json({ source: sourceCities, destination: destinationsObj });
    } catch (err) {
        res.status(400).send(err);
    }
}

// get trip by source and destination
exports.getBySourceDes = async (req, res) => {
    try {
        const { source, destination } = req.query;
        const result = await TransferTrip.find({
            sourceCity: source,
            destination: destination
        }).populate('cars').exec();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// delete trip 
exports.delete = async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const result = await TransferTrip.findByIdAndDelete(tripId);
        res.status(208).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
}