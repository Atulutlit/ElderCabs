// App Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// App Config
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
const ADMIN_URL = process.env.ADMIN_URL;

app.use(
  cors({
    origin: [
      CLIENT_URL,
      ADMIN_URL,
      "http://localhost:3000",
      "http://locahost:3001",
      "https://elderholidays.com",
      "https://eldercabs.vercel.app",
    ],
  })
);

// App Config
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Authentication Config
app.use("/auth", require("./auth/auth"));
app.use(require("./middlewares/auth"));

// DB Config
require("./models/database/connection");

// Routes Import
const adminRouter = require("./routes/admin");
const packageRouter = require("./routes/package");
const subscriberRouter = require("./routes/subscriber");
const reviewRouter = require("./routes/review");
const blogRouter = require("./routes/blog");
const categoriesRouter = require("./routes/categories");
const themeRouter = require("./routes/theme");

// Routes Config
app.use("/admin", adminRouter);
app.use("/package", packageRouter);
app.use("/subscriber", subscriberRouter);
app.use("/review", reviewRouter);
app.use("/blog", blogRouter);
app.use("/categories", categoriesRouter);
app.use("/theme", themeRouter);

// Mailing Service
app.use("/mail/contact", require("./mails/contact")); // Contact Mail
app.use("/mail/package", require("./mails/package")); // Provided Package Booking
app.use("/mail/custom", require("./mails/custom")); // Custom Package Booking

// File Upload Service
const fileUploadRoutes = require("./uploads/routes");
app.use("/upload", fileUploadRoutes);

// App Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🔌 Server Listening At ${PORT}`);
});
