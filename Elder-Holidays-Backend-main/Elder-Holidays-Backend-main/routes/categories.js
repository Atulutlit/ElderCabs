const router = require("express").Router();
const categoryController = require("../controllers/categories");

// get categories
router.get("/", categoryController.read);

// create new category
router.post("/", categoryController.create);

// category update route
router.put("/:id", categoryController.update);

// category delete route
router.delete("/:id", categoryController.delete);

module.exports = router;