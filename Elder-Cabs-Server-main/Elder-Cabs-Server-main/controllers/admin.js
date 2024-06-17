const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// Get Admin
exports.getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.status(200).json({
      count: admin.length,
      data: admin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create Admin
exports.createAdmin = async (req, res) => {
  try {
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json(admin);
  } catch {
    res.status(500).json(err);
  }
};

// Update Admin
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json("Admin Not Found");
    }

    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedAdmin = await Admin.findOneAndUpdate(
      { email: admin.email },
      {
        email: req.body.email,
        password: hashedPassword,
      }
    );

    res.status(200).json(updatedAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update cab data
exports.updateCabData = async (req, res) => {
  try {
    let getAdmin = await Admin.findById(req.params.adminId);
    if (getAdmin) {
      const result = await Admin.findByIdAndUpdate(req.params.adminId, req.body);
      res.json(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

// update terms and conditions
exports.updateConditions = async (req, res) => {
  try {
    let conditions = req.body;
    const adminId = req.params.adminId;
    const getAdmin = await Admin.findById(adminId);

    if (getAdmin.termsAndConditions) {
      conditions = { ...getAdmin.termsAndConditions, ...conditions };
    }

    const result = await Admin.findByIdAndUpdate(adminId, { termsAndConditions: conditions });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(400).send(err);
  }
}

// update surge dates
exports.updateSurgeDates = async (req, res) => {
  try {

    let surgeDates = req.body.surgeDates;
    const adminId = req.params.adminId;
    const getAdmin = await Admin.findById(adminId);

    if (getAdmin.surgeDates) {
      surgeDates = [...new Set(surgeDates)];
    }

    const result = await Admin.findByIdAndUpdate(adminId, { surgeDates });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(400).send(err);
  }
}

// get conditions
exports.getConditions = async (req, res) => {
  try {

    let findQuery = {};

    if (process.env.NODE_ENV === 'palash') {
      findQuery = { adminOf: 'elder_cabs' };
    }

    let result = await Admin.findOne({ ...findQuery }).exec();

    if (result.termsAndConditions) {
      return res.json(result.termsAndConditions);
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

// get surge dates
exports.getSurgeDates = async (req, res) => {
  try {

    let findQuery = {};

    if (process.env.NODE_ENV === 'palash') {
      findQuery = { adminOf: 'elder_cabs' };
    }

    let result = await Admin.findOne({ ...findQuery }).exec();

    if (result.surgeDates) {
      return res.json(result.surgeDates);
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

// Delete Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
