const router = require('express').Router();

const categories = require('../controllers/categories'); // controllers

router.get('/', categories.read); // read all categories

router.post('/', categories.create); // create a category

router.put('/:categoryId', categories.update); // update a category

router.delete('/:categoryId', categories.delete); // delete a category

module.exports = router;