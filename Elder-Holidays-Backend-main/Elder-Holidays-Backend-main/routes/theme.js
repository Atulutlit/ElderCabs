const router = require("express").Router();
const themeController = require("../controllers/theme");

// get categories
router.get("/", themeController.read);

// create new category
router.post("/", themeController.create);

// category update route
router.put("/:id", themeController.update);

// category delete route
router.delete("/:id", themeController.delete);

module.exports = router;