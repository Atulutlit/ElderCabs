const multer = require("multer");
const path = require("path");
const router = require("express").Router();

// blogs storage
const blogsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blogs");
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const uploadBlogs = multer({ storage: blogsStorage });

// packages storage
const packagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/packages");
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },

  fileFilter: (req, file, cb) => {

    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const uploadPackages = multer({ storage: packagesStorage });

// reviews storage
const reviewsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/reviews");
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const uploadReviews = multer({ storage: reviewsStorage });

// Upload Blog Image
router.post("/blog", uploadBlogs.single("image"), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    console.log(err);
  }
});

// Upload Package Image
router.post("/package", uploadPackages.single("image"), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    console.log(err);
  }
});

// Upload Review Image
router.post("/review", uploadReviews.single("image"), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
