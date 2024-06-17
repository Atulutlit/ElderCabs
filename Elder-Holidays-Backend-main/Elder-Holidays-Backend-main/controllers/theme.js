const theme = require('../models/Theme');

exports.read = async (req, res) => {
    try {
        const result = await theme.find({}).sort({ name: 'ascending' });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message)
    }
};

exports.create = async (req, res) => {
    const newTheme = req.body;
    try {
        const replace = await theme.findOneAndReplace({ name: newTheme.name }, newTheme);
        if (!replace) {
            const result = await theme.create(newTheme);
            res.send(result);
        } else {
            res.send(replace);
        }
    } catch (err) {
        res.status(err.status).send(err.message)
    }
};

exports.update = async (req, res) => {
    const themeId = req.params.id;
    const updateData = req.body;
    try {
        const result = await theme.findByIdAndUpdate(themeId, updateData);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message)
    }
};

exports.delete = async (req, res) => {
    const themeId = req.params.id;
    try {
        const result = await theme.findByIdAndDelete(themeId);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message)
    }
};