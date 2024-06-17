const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const adminExists = async (token) => {
  // Check if Token Corresponds to Admin
  try {
    const decoded = await jwt.decode(token);
    const admin = await Admin.findOne({ email: decoded.email });
    if (!admin) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = (req, res, next) => {
  try {
    console.log("REQ:", req.headers);

    const token = req.headers.authorization.split(" ")[1];
    console.log("MIDDLEWARE IN PROGRESS");
    console.log("INCOMING TOKEN", token);
    console.log("ENV TOKEN", process.env.API_KEY);

    if (token === process.env.API_KEY || adminExists(token)) next();
    else res.status(401).json({ message: "Unauthorized!" });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized!" });
  }
};
