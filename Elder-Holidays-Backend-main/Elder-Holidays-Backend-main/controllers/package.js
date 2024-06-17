const Package = require("../models/Package");

// get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({}).exec();
    res.send(packages);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// get top 10 packages by click count
exports.getTopTenPackages = async (req, res) => {
  try {
    const result = await Package.find({}).sort({ click_count: -1 }).limit(10).exec();
    res.send(result);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

// get packages by each theme and category
exports.getPackagesByEachCateAndTheme = async (req, res) => {

  try {

    const categories = await Package.find({}).distinct('category');
    const themes = await Package.find({}).distinct('theme');

    let packages = [];

    // loop in categories
    for (const category of categories) {
      const package = await Package.findOne({ category });
      if (Object.keys(package).length > 0) {
        packages.push(package);
      }
    }

    // loop in themes
    for (const theme of themes) {
      const package = await Package.findOne({ theme });
      if (Object.keys(package).length > 0) {
        packages.push(package);
      }
    }

    // delete duplicate packages
    const newPackagesArr = [];
    for (const package of packages) {
      if (!newPackagesArr.find(item => item._id.toString() === package._id.toString())) {
        newPackagesArr.push(package);
      }
    }

    res.send(newPackagesArr);

  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

// search packages
exports.searchPackages = async (req, res) => {
  const searchValue = req.params.queryVal;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`, 'i');
  const searchRgx = rgx(searchValue);
  try {
    const packages = await Package.find({
      title: { $regex: searchRgx }
    });
    res.send(packages);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

// filter packages
exports.filterPackages = async (req, res) => {

  const query = req.query.query;
  const { theme, category } = JSON.parse(query);

  // const operator = theme.length > 0 && category.length > 0 ? '$or' : '$and';
  try {
    const result = await Package.find({
      $and: [
        {
          theme: { [theme.length > 0 ? '$in' : '$nin']: theme }
        },
        {
          category: { [category.length > 0 ? '$in' : '$nin']: category }
        },
      ]
    });
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }

}

// get package by id
exports.getPackageById = async (req, res) => {
  const packageId = req.params.id;
  try {
    const package = await Package.findById(packageId);
    res.send(package);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// get packages by category
exports.getPackagesByCategory = async (req, res) => {
  const categoryName = req.params.category_name;
  try {
    const packages = await Package.find({ category: categoryName }).exec();
    res.send(packages);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// get packages by theme
exports.getPackagesByTheme = async (req, res) => {
  const themeName = req.params.theme_name;
  try {
    const packages = await Package.find({ theme: themeName }).exec();
    res.send(packages);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// create package
exports.createPackage = async (req, res) => {
  const newPackage = req.body;
  try {
    const insertPackage = await Package(newPackage);
    insertPackage.save((err, result) => {
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

// update package
exports.updatePackage = async (req, res) => {
  const packageId = req.params.id;
  const updateData = req.body;
  try {
    await Package.findByIdAndUpdate(packageId, updateData);
    res.send({ message: "package updated successfully." });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// increase click count 
exports.increaseClick = async (req, res) => {
  const id = req.params.id;
  try {
    const getPackage = await Package.findById(id);
    const result = await Package.findByIdAndUpdate(id, { click_count: getPackage?.click_count + 1 });
    res.send(result);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

// delete package
exports.deletePackage = async (req, res) => {
  const packageId = req.params.id;
  try {
    await Package.findByIdAndDelete(packageId);
    res.send({ message: "package delete successfully." });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
