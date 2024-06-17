const router = require('express').Router();
const AttachTaxiController = require('../controllers/attachTaxi');
const adminMiddleWare = require('../middlewares/auth');

// post route
router.post('/', AttachTaxiController.create);

// get route
router.get(`/getall`, adminMiddleWare, AttachTaxiController.getAll);

module.exports = router;