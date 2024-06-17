const router = require("express").Router();
const blogController = require("../controllers/blog");

// get all blogs
router.get("/", blogController.getAllBlogs);

// get specific blog by id
router.get("/:id", blogController.getBlogById);

// create new blog
router.post("/", blogController.createBlog);

// update blog
router.put("/:id", blogController.updateBlog);

// delete blog
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
