const router = require("express").Router();
const adminController = require("../controllers/admin");

// admin get route
router.get("/", adminController.getAdmin);

// admin post route
router.post("/", adminController.createAdmin);

// admin put route
router.put("/update", adminController.updateAdmin);

// admin delete route
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
