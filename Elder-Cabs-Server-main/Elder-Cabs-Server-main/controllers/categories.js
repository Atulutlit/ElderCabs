
// categories model
const Categories = require('../models/Categories');

// create category
exports.create = async (req, res) => {
    try {
        const newCategory = req.body;
        const result = await Categories.create(newCategory);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// get all categories
exports.read = async (req, res) => {
    try {
        const result = await Categories.find({}).exec();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// category update by id
exports.update = async (req, res) => {
    try {
        const result = await Categories.findByIdAndUpdate(req.params.categoryId, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// category update by id
exports.delete = async (req, res) => {
    try {
        const result = await Categories.findByIdAndDelete(req.params.categoryId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}
