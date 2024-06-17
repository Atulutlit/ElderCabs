/* 
Contains Functionality for Round Trip
    Round Trip Traits: Inter-City | Multiple Destinations Can Be Chosen

Inputs:
1. Source City -> String
2. Destination Cities -> Array of Strings
3. Pickup Datetime
4. Return Date

Outputs:
1. Fare
2. Advance Payment
3. Extra Charges Policy
4. Elder Cabs Transparency
5. Calculations (How is the Fare Calculated)

Minimum Charges: 250 km.chgs. (Admin Panel) + Extra km.chgs. (Admin Panel)
    + Driver Allowance Per Day. (Admin Panel) + 5% GST
*/
const { getDistanceMatrix } = require("./google_maps/mapsConfig");

const roundTrip = async (totalDistance, days, admin) => {
  try {

    // these all values provide from dashboard
    const extraPerKmCharges = admin.extraChargePerKm,
      driverAllowancePerDay = admin.driverAllowance,
      advancePaymentPercentage = admin.advancePayment,
      roundTripFare = admin.basicFare;

    let fare = roundTripFare;

    // if total distance greater then 250 KM
    if (Math.ceil(totalDistance) > 250) {
      const extraDistance = Math.ceil(totalDistance) - 250;
      fare += extraDistance * extraPerKmCharges;
    }

    // add driver allowance per day
    fare += driverAllowancePerDay * days;

    // adding 5 % gst
    const gst = fare * (5 / 100);
    fare += gst;

    // advance payment
    const advancePayment = fare * (advancePaymentPercentage / 100);


    // const mapsDataResponse = await getDistanceMatrix(sourceCity, destinationCity)
    // const distTravelledOneWay = mapsDataResponse.data.rows[0].elements[0].distance.value // in meters
    // const distTravelledRoundTrip = distTravelledOneWay * 2 // in meters
    // const distInKm = Math.floor(distTravelledRoundTrip / 1000) // in km
    // const minimumCharge = 250;


    // let fare = minimumCharge; // base fare
    // const extraKmTravelled = distInKm - minimumCharge; // extra KM travelled
    // if (extraKmTravelled > 0) fare += extraKmTravelled * extraPerKmCharges; // adding extra KM charges
    // fare += driverAllowancePerDay * daysCount; // adding DA



    const extraChargesPolicy = [
      `For Extra Kilometers You will be Charged Rs. ${extraPerKmCharges} per km.`,
      `Per Day Driver Allowance is Rs. ${driverAllowancePerDay}, Which You will be liable to pay.`,
    ];

    const returnObj = {
      type: "Round Trip",
      trip: 'round_trip',
      advancePercent: admin.advancePayment,
      advancePayment: advancePayment,
      distanceInKM: totalDistance,
      gst: 5,
      basicFare: admin.basicFare,
      totalFare: fare,
      totalDays: days,
      extraPerKmCharges: admin.extraChargePerKm,
      driverAllowancePerDay: admin.driverAllowance,
      // ...admin,
      // fare,
      // advancePayment,
      // extraChargesPolicy,
      // calculations: `Calculations are as follow:
      // Base Fare: ${roundTripFare}
      // Extra KM Travelled: ${Math.ceil(totalDistance)} KM - 250 KM = ${Math.ceil(totalDistance) - 250} KM
      // Extra KM Charges: ${Math.ceil(totalDistance) - 250} * ${extraPerKmCharges} = ${Math.ceil(totalDistance) - 250 * extraPerKmCharges}
      // Driver Allowance: ${driverAllowancePerDay} * ${daysCount} = ${driverAllowancePerDay * daysCount}
      // GST: ${gst}(5%)`,
    };

    return returnObj;
  } catch (error) {
    throw error;
  }
};

// console.log(roundTrip());
module.exports = roundTrip
