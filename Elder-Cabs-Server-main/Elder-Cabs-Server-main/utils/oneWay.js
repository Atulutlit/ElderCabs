const { getDistanceMatrix } = require("./google_maps/mapsConfig");
/* 
Contains Functionality for One Way
    One Way Traits: Inter-City

Inputs:
1. Source City -> String
2. Destination City -> String
3. Pickup Datetime

Outputs:
1. Fare
2. Advance Payment
3. Extra Charges Policy
4. Elder Cabs Transparency
5. Calculations (How is the Fare Calculated)

Minimum Charges: Toll Tax (Admin Panel) + State Tax (Admin Panel)
*/

const oneWay = async (distanceInKM, admin) => {

  try {

    // let distTravelled = 0;
    // let source = sourceCity;
    // let destination = [destinationCities[0]];

    // for (let i = 0; i < destinationCities.length; i++) {
    //   if (i > 0) source = destination
    //   destination = [destinationCities[i]];
    //   const mapsDataResponse = await getDistanceMatrix(source, destination)
    //   distTravelled += mapsDataResponse.data.rows[0].elements[0].distance.value // in meters
    // }

    // const distInKm = Math.floor(distTravelled / 1000) // in km

    const tolls = admin.toll // getTolls from GMaps
    const stateTax = admin.stateTax // getTolls from GMaps
    const taxes = tolls + stateTax // from GMaps
    const perKmCharges = admin.chargePerKm;
    const advancePaymentPercentage = admin.advancePayment;

    let fare = distanceInKM * perKmCharges; // base fare

    fare += taxes // adding taxes
    fare += fare * (5 / 100) // adding GST

    const advancePayment = fare * (advancePaymentPercentage / 100);
    const extraChargesPolicy = [
      `For Extra Kilometers You will be Charged Rs. ${perKmCharges} per km.`,
      `Taxes is Rs. ${taxes}, Which You will be liable to pay.`,
    ];

    return {
      type: "One Way",
      trip: 'one_way_trip',
      stateTax: admin.stateTax,
      toll: admin.toll,
      chargePerKm: admin.chargePerKm,
      totalFare: fare,
      advancePercent: admin.advancePayment,
      gst: 5,
      distanceInKM: distanceInKM,
      advancePayment,
      extraChargesPolicy,
      calculations: `Calculations are as follow:
      Base Fare: ${distanceInKM} * ${perKmCharges} = ${distanceInKM * perKmCharges}
      Taxes: ${taxes}
      GST: ${fare * (5 / 100)}(5%)
      Total Fare: ${fare}`
    };
  } catch (error) {
    // console.log('Error calculating fare of one way');
    throw error;
  }
};

// console.log(oneWay());
module.exports = oneWay
