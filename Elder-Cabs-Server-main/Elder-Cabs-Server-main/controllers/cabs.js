const { default: axios } = require("axios");
const local = require("../utils/local");
const multiCity = require("../utils/multiCity");
const oneWay = require("../utils/oneWay");
const roundTrip = require("../utils/roundTrip");
const transfer = require("../utils/transfer");
const Admin = require("../models/Admin");
const {
  getLocation,
  getDistanceFromTwoLocations,
  getRoadDistance,
} = require("../utils/google_maps/mapsConfig");
const Cabs = require("../models/Cabs");
const { fileDelete } = require("../uploads");

// Create Cab Ride
exports.tripFare = async (req, res) => {
  let {
    trip,
    sourceCity,
    destination,
    destinations,
    pickupDate,
    pickupTime,
    returnDate,
    days,
  } = req.body;

  // const { isIntracity, isRoundTrip, sourceLocation, dropLocations, pickupDateTime, returnDateTime } = req.body;

  const admin = await Admin.findOne();

  const getDistanceFromDestinations = (destinations, destination) =>
    new Promise(async (resolve, reject) => {
      try {
        let distance = 0;
        let duration = 0;
        let index = 0;
        for (let item of destinations) {
          if (index === 0) {
            const result = await getRoadDistance(destination, item);
            if (result) {
              distance += result.distanceInKm;
              duration += result.duration;
            }
          } else {
            const result = await getRoadDistance(destinations[index - 1], item);
            if (result) {
              distance += result.distanceInKm;
              duration += result.duration;
            }
          }
          index++;
        }
        // destinations.map(async (item, index) => {

        // });
        resolve({ distance, duration });
      } catch (err) {
        reject(err);
      }
    });

  try {

    // one way trip
    if (trip === 'one_way_trip') {


      const location = await getRoadDistance(sourceCity, destination);

      if (!location) {
        return res.status(400).send({ message: 'Route not found' })
      } else {

        const { distanceInKm, duration } = location;

        const result = await oneWay(distanceInKm, admin.oneWayTrip);

        return res.json({ ...result, sourceCity, destination });
      }

      // const distance = await getRoadDistance(sourceCity, destination);

      // const result = await oneWay(distance, sourceCity, destination, pickupDate, pickupTime);

      // console.log(result)
      // return res.json(result);
    }

    // local trip
    if (trip === "local_trip") {

      const result = await local(admin.localTrip);
      return res.json(result);

      // const location = await getRoadDistance(sourceCity, destination);
      // if (!location) {
      //     return res.status(400).send({ message: 'Route not found' })
      // } else {

      //     const { distanceInKm, duration } = location;

      //     return res.json({ ...result, sourceCity, destination, pickupDate, pickupTime });
      // }
    }

    // // round trip
    // if (trip === 'round_trip') {

    //     const location = await getRoadDistance(sourceCity, destination);
    //     if (!location) {
    //         return res.status(400).send({ message: 'Route not found' })
    //     } else {

    //         const { distanceInKm, duration } = location;
    //         const totalDistance = distanceInKm * 2;

    //         const result = await roundTrip(totalDistance, pickupDate + ' ' + pickupTime, returnDate, admin.roundTrip);
    //         return res.json({ ...result, sourceCity, destination, pickupDate, pickupTime, returnDate });
    //     }
    // }

    // multi city
    if (trip === "round_trip") {

      let distance = 0;
      let duration = 0;
      const location = await getRoadDistance(sourceCity, destination);

      if (!location) {
        return res.status(400).send({ message: "Route not found" });
      } else {

        distance = location.distanceInKm;
        duration = location.duration;

        if (Array.isArray(destinations)) {

          const destinationsDistance = await getDistanceFromDestinations(
            destinations,
            destination
          );
          if (destinationsDistance) {
            distance += destinationsDistance.distance;
            duration += destinationsDistance.duration;
          }
        }

        const totalDistance = distance * 2;

        const result = await roundTrip(totalDistance, days, admin.roundTrip);
        return res.json({ ...result });
      }
    }

    // transfer
    if (trip === "transfer_trip") {
      const location = await getRoadDistance(sourceCity, destination);
      if (!location) {
        return res.status(400).send({ message: "Route not found" });
      } else {
        const { distanceInKm, duration } = location;

        const result = await transfer(distanceInKm, admin.transferTrip);

        return res.json({
          ...result,
          sourceCity,
          destination,
          pickupDate,
          pickupTime,
        });
      }
    }

    // if (isRoundTrip && isIntracity) {
    //     const result = await local(sourceLocation, dropLocations, pickupDateTime)
    //     console.log(result, 'result');
    //     res.status(200).json({
    //         success: true,
    //         result,
    //     });
    // }
    // else if (!isRoundTrip && isIntracity) {
    //     const result = await transfer(sourceLocation, dropLocations, pickupDateTime)
    //     console.log(result, 'result');
    //     res.status(200).json({
    //         success: true,
    //         result,
    //     });
    // }
    // else if (isRoundTrip && !isIntracity) {
    //     if (dropLocations.length > 1) {
    //         const result = await multiCity(sourceLocation, dropLocations, pickupDateTime, returnDateTime)
    //         console.log(result, 'result');
    //         res.status(200).json({
    //             success: true,
    //             result,
    //         });
    //     } else {
    //         const result = await roundTrip(sourceLocation, dropLocations, pickupDateTime, returnDateTime)
    //         console.log(result, 'result');
    //         res.status(200).json({
    //             success: true,
    //             result,
    //         });
    //     }
    // }
    // else {

    // }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message, success: false });
  }
};

// create cab
exports.create = async (req, res) => {
  try {
    const newCab = req.body;
    const file = req.file;
    if (file) {
      newCab.image = file.path.replace(/\\/g, "/");
    }
    const result = await Cabs.create(newCab);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

// get cabs by trip
exports.getCabsByTrip = async (req, res) => {
  try {
    const { trip } = req.query;
    const result = await Cabs.find({
      trip: trip,
    }).exec();
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

// get all cab
exports.getAllCabs = async (req, res) => {
  try {
    const searchQuery = req.query.s;

    let findQuery = {};

    if (searchQuery) {
      findQuery = {
        $or: [
          { 'name': { $regex: '.*' + searchQuery + '.*' } },
          { 'type': { $regex: '.*' + searchQuery + '.*' } },
          { 'trip': { $regex: '.*' + searchQuery + '.*' } }
        ]
      };
    }

    const result = await Cabs.find({ ...findQuery }).sort({ createAt: -1 }).exec();
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

// get by id
exports.getById = async (req, res) => {
  try {
    const result = await Cabs.findById(req.params.cabId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

// update cab
exports.update = async (req, res) => {
  try {
    const file = req.file;
    if (file) {
      const getCab = await Cabs.findById(req.params.cabId).exec();
      getCab.image && fileDelete(getCab.image);
      req.body.image = file.path;
    }
    const result = await Cabs.findByIdAndUpdate(req.params.cabId, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

// delete cab
exports.delete = async (req, res) => {
  try {
    const getCab = await Cabs.findById(req.params.cabId);
    getCab.image && fileDelete(getCab.image);
    const result = await Cabs.findByIdAndDelete(req.params.cabId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};
