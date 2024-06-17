// blog model
const Blog = require("../models/Blog");

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const result = await Blog.find({}).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get Blog By Id
exports.getBlogById = async (req, res) => {
  const blogId = req.params.id;
  try {
    const result = await Blog.findById(blogId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create Blog
exports.createBlog = async (req, res) => {
  const newBlog = req.body;
  try {
    const insertBlog = await Blog(newBlog);
    insertBlog.save((err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.status(500).send(err.message);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const updateData = req.body;
  try {
    const result = await Blog.findByIdAndUpdate(blogId, updateData);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const result = await Blog.findByIdAndDelete(blogId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
