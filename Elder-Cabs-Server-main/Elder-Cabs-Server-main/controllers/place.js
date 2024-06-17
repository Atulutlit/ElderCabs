
// place model
const Place = require('../models/Place');

// create place
exports.create = async (req, res) => {
    try {
        const newPlace = req.body;
        const result = await Place.create(newPlace);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get all place
exports.read = async (req, res) => {
    try {
        const result = await Place.find({}).sort({ createdAt: -1 }).exec();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// place delete by id
exports.delete = async (req, res) => {
    try {
        const result = await Place.findByIdAndDelete(req.params.placeId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}
