const category = require('../models/Category');

exports.read = async (req, res) => {
    try {
        const result = await category.find({}).sort({ name: 'ascending' });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message)
    }
};

exports.create = async (req, res) => {
    const newCategory = req.body;
    try {
        const replace = await category.findOneAndReplace({ name: newCategory.name }, newCategory);
        if (!replace) {
            const result = await category.create(newCategory);
            res.send(result);
        } else {
            res.send(replace);
        }
    } catch (err) {
        res.status(err.status).send(err.message)
    }
};

exports.update = async (req, res) => {
    const categoryId = req.params.id;
    const updateData = req.body;
    try {
        const result = await category.findByIdAndUpdate(categoryId, updateData);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message)
    }
};

exports.delete = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const result = await category.findByIdAndDelete(categoryId);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message)
    }
};