const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Add title"],
  },

  tags: {
    type: [String],
    required: true,
  },

  category: {
    type: String,
    required: [true, "Add Category"],
  },

  content: {
    type: String,
    required: [true, "Add content"],
  },

  textContent: {
    type: String,
    required: [true, "Add content"],
  },

  image: {
    type: String,
  },

  viewCount: {
    type: Number,
    default: 0
  },

  published: {
    type: Boolean,
    required: [true, "Add published flag"],
  },

}, { timestamps: true });

Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
