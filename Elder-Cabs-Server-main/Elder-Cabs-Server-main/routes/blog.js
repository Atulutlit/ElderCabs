const router = require("express").Router();
const blogController = require("../controllers/blog");
const { fileUpload } = require("../uploads");
const adminMiddleWare = require('../middlewares/auth');

// get all blogs
router.get("/getall", blogController.getAllBlogs);

// get specific blog by id
router.get("/:id", blogController.getBlogById);

// create new blog
router.post("/", adminMiddleWare, fileUpload('uploads/blogs').single('image'), blogController.createBlog);

// update blog
router.put("/:id", adminMiddleWare, fileUpload('uploads/blogs').single('image'), blogController.updateBlog);

// view count
router.put("/viewCount/:id", blogController.viewCount);

// delete blog
router.delete("/:id", adminMiddleWare, blogController.deleteBlog);

module.exports = router;
