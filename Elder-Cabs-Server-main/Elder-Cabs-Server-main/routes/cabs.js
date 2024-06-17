const router = require("express").Router();
const cabsController = require("../controllers/cabs");
const adminMiddleWare = require('../middlewares/auth');
const { fileUpload } = require("../uploads");

// create new trip
router.post("/tripFare", cabsController.tripFare);

// create new cab
router.post('/', adminMiddleWare, fileUpload('uploads/cabs').single('image'), cabsController.create)

// get all cabs
router.get(`/getall`, cabsController.getAllCabs);

// get cabs by trip
router.get(`/getCabsByTrip`, cabsController.getCabsByTrip);

// get cabs by id
router.get(`/:cabId`, cabsController.getById);

// update cab
router.put(`/:cabId`, adminMiddleWare, fileUpload('uploads/cabs').single('image'), cabsController.update);

// delete cab
router.delete(`/:cabId`, adminMiddleWare, cabsController.delete);

// update trip
// router.put("/:id", cabsController.updateTrip);

// // delete trip
// router.delete("/:id", cabsController.deleteTrip);

module.exports = router;
