const AttachTaxi = require('../models/AttachTaxi');

// CREATE
exports.create = async (req, res) => {
    try {
        const result = await AttachTaxi.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// READ 
exports.getAll = async (req, res) => {
    try {
        const result = await AttachTaxi.find({}).sort({ createdAt: -1 }).exec();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}