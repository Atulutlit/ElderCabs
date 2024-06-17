const router = require('express').Router();
const placeController = require('../controllers/place');
const adminMiddleWare = require('../middlewares/auth')

// create
router.post('/', adminMiddleWare, placeController.create);

// read
router.get('/', placeController.read);

// delete
router.delete('/:placeId', adminMiddleWare, placeController.delete);


module.exports = router;