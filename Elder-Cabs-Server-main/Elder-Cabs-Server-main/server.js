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
    // origin: '*'
    origin: process.env.NODE_ENV === 'production' ? [CLIENT_URL, ADMIN_URL] : '*',
  })
);

// App Config
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Authentication Config
app.use("/auth", require("./auth/auth"));
// app.use(require("./middlewares/auth"));

// DB Config
require("./models/database/connection");

// Routes Import
const adminRoutes = require("./routes/admin");
const blogRoutes = require("./routes/blog");
const cabsRoutes = require("./routes/cabs");
const categoriesRoutes = require("./routes/categories");
const attachTaxiRoutes = require("./routes/attachTaxi");
const contactRoute = require("./routes/contact");
const placeRoute = require("./routes/place");
const bookingRoute = require("./routes/booking");
const tripsRoute = require("./routes/trips");

// Routes Config
app.use("/admin", adminRoutes);
app.use("/blog", blogRoutes);
app.use("/categories", categoriesRoutes);
app.use("/cabs", cabsRoutes);
app.use("/attachTaxi", attachTaxiRoutes);
app.use("/contact", contactRoute);
app.use("/place", placeRoute);
app.use("/booking", bookingRoute);
app.use("/trips", tripsRoute);

// Mailing Service

// File Upload Service

// App Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🔌 Server Listening At ${PORT}`);
});
