const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Add title"],
  },

  content: {
    type: String,
    required: [true, "Add content"],
  },

  image: {
    type: String,
  },

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  published: {
    type: Boolean,
    required: [true, "Add published flag"],
  },
});

Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
