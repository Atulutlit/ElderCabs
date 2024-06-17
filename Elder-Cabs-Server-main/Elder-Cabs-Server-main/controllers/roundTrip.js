const RoundTrip = require("../models/RoundTrip");

// create a trip
exports.create = async (req, res) => {
    try {
        const newTrip = req.body;
        const result = await RoundTrip.create(newTrip);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get trips
exports.getAll = async (req, res) => {
    try {
        const result = await RoundTrip.find({})
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
        const result = await RoundTrip.findById(req.query.id).populate('cars').exec();;
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get sources and destinations
exports.getSourcesAndDestinations = async (req, res) => {
    try {
        let sourceCities = await RoundTrip.distinct('sourceCity').exec();
        let destinationCities = await RoundTrip.find({}).select('sourceCity destinations').exec();

        sourceCities = sourceCities.sort();

        const destinationsObj = {};
        for (let destination of destinationCities) {
            if (destinationsObj[destination.sourceCity]) {
                destinationsObj[destination.sourceCity] = [...new Set([...destinationsObj[destination.sourceCity], ...destination.destinations])].sort();
            } else {
                destinationsObj[destination.sourceCity] = [...destination.destinations];
            }
        }

        res.json({ source: sourceCities, destination: destinationsObj });
    } catch (err) {
        res.status(400).send(err);
    }
}

// get by source and destinations
exports.getBySourceDes = async (req, res) => {
    try {
        const { source, destinations } = req.query;

        const result = await RoundTrip.find({
            sourceCity: source,
            destinations: {
                $in: destinations
            },
        }).populate('cars').exec();
        res.json(result)
    } catch (err) {
        res.status(400).send(err);
    }
}

// delete trip 
exports.delete = async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const result = await RoundTrip.findByIdAndDelete(tripId);
        res.status(208).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
}