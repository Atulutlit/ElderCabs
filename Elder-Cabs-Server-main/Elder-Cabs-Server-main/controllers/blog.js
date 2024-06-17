// blog model
const Blog = require("../models/Blog");
const { fileDelete } = require("../uploads");

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    let { pageNo, limit } = req.query;
    pageNo = parseInt(pageNo);
    limit = parseInt(limit);

    const totalItems = await Blog.countDocuments({});
    const result = await Blog.find({})
      .sort({ createdAt: -1 })
      .skip((pageNo - 1) * limit)
      .limit(limit)
      .exec();
    res.json({ count: totalItems, rows: result });
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
  const file = req.file;
  if (file) {
    newBlog.image = file.path.replace(/\\/g, '/');
  }

  try {
    const result = await Blog.create(newBlog);
    res.json(result);
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
};

// blog view count
exports.viewCount = async (req, res) => {
  try {
    const blogId = req.params.id;
    const getBlog = await Blog.findById(blogId);
    const result = await Blog.findByIdAndUpdate(blogId, { viewCount: getBlog.viewCount + 1 });
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
}

// Update Blog
exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const updateData = req.body;
  const file = req.file;
  try {

    if (file) {
      const getBlog = await Blog.findById(blogId).exec();
      getBlog.image && fileDelete(getBlog.image);
      updateData.image = file.path;
    }

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
    const getBlog = await Blog.findById(blogId).exec();
    getBlog.image && fileDelete(getBlog.image);
    const result = await Blog.findByIdAndDelete(blogId);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
