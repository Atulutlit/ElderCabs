const router = require("express").Router();
const adminController = require("../controllers/admin");
const adminMiddleWare = require('../middlewares/auth')

// admin get route
router.get("/", adminMiddleWare, adminController.getAdmin);

// admin post route
router.post("/", adminMiddleWare, adminController.createAdmin);

// admin put route
router.put("/:id", adminMiddleWare, adminController.updateAdmin);

// admin put route
router.put("/updateCab/:adminId", adminMiddleWare, adminController.updateCabData);

// admin terms and conditions update
router.put("/termsAndConditions/:adminId", adminMiddleWare, adminController.updateConditions);

// admin surge dates update
router.put("/surgeDates/:adminId", adminMiddleWare, adminController.updateSurgeDates);

// admin delete route
router.delete("/:id", adminMiddleWare, adminController.deleteAdmin);

module.exports = router;
