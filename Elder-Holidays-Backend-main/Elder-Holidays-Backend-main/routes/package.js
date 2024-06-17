const router = require("express").Router();
const packageController = require("../controllers/package");

// get all packages
router.get("/", packageController.getAllPackages);

// top ten packages
router.get("/top-packages", packageController.getTopTenPackages);

// get packages by each theme and category
router.get("/packages-category-theme", packageController.getPackagesByEachCateAndTheme);

// get packages by search title
router.get("/search-packages/:queryVal", packageController.searchPackages);

// get filter packages 
router.get("/filter-packages", packageController.filterPackages);

// increase click
router.patch("/click-count/:id", packageController.increaseClick);

// get package by id
router.get("/:id", packageController.getPackageById);

// get packages by category
router.get("/category/:category_name", packageController.getPackagesByCategory);

// get packages by theme
router.get("/theme/:theme_name", packageController.getPackagesByTheme);

// create new package
router.post("/", packageController.createPackage);

// package update route
router.put("/:id", packageController.updatePackage);

// package delete route
router.delete("/:id", packageController.deletePackage);

module.exports = router;
