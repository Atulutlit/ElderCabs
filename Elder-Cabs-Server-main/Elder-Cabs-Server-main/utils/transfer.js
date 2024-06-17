const { getDistanceMatrix } = require("./google_maps/mapsConfig");

const transfer = async (distanceInKm, admin) => {
    try {

        const chargePerKm = admin.chargePerKm,
            advancePaymentPercentage = admin.advancePayment,
            gstPercent = 5;

        let fare = 0;

        fare += Math.ceil(distanceInKm) * chargePerKm; // transfer fare charge by per km

        // add gst 
        fare += fare * gstPercent / 100;

        // advance payment
        const advancePayment = Math.ceil(fare) * advancePaymentPercentage / 100;

        return {
            type: "Transfer",
            trip: 'transfer_trip',
            gst: 5,
            totalFare: fare,
            advancePercent: advancePaymentPercentage,
            chargePerKm: chargePerKm,
            fare,
            advancePayment,
            elderCabsTransparency: "Elder Cabs Transparency",
            // extraChargesPolicy,
            calculations: `Calculations are as follow:
            Base Fare: (${distanceInKm} * ${chargePerKm}) = ${Math.ceil(distanceInKm * chargePerKm)}
            GST: ${Math.ceil(fare * gstPercent / 100)}(${gstPercent}%)
            Total Fare: ${fare}`,
        };

        // console.log(pickupLocation, dropLocation, pickupDateTime, "pickupLocation, dropLocation, pickupDateTime");
        // const mapsDataResponse = await getDistanceMatrix(pickupLocation, dropLocation);
        // const distTravelled = mapsDataResponse.data.rows[0].elements[0].distance.value // in meters
        // const distInKm = distTravelled / 1000 // in km
        // const expectedTime = mapsDataResponse.data.rows[0].elements[0].duration.value // in seconds
        // const totalHours = expectedTime / 3600 // in hr
        // console.log(distTravelled, expectedTime, "distTravelled,expectedTime");

        // // assuming Re1 per km and Rs5 per hr
        // const chgPerKm = 1;
        // const chgPerHr = 5;
        // const extraChargesPolicy = [
        //     `No Extra Charges`,
        //     `Basic charges are Rs. ${chgPerKm} per km and Rs. ${chgPerHr} per hour.`,
        // ];
        // let fare = distInKm * chgPerKm;
        // fare += totalHours * chgPerHr;
        // const gst = fare * 5 / 100;
        // fare += gst;
        // fare = Math.round(fare)
        // const advancePayment = Math.round(fare * (advancePaymentPercentage / 100))
        // const final = {
        //     type: "Transfer",
        //     fare,
        //     advancePayment,
        //     elderCabsTransparency: "Elder Cabs Transparency",
        //     extraChargesPolicy,
        //     calculations: `Calculations are as follow:
        //     Base Fare: (${distInKm} * ${chgPerKm}) + (${totalHours} * ${chgPerHr}) = ${distInKm * chgPerKm + totalHours * chgPerHr}
        //     GST: ${gst}(5%)
        //     Total Fare: ${fare}`,
        // }
        // return final;
    } catch (error) {
        console.log('Error calculating fare of transfer');
        return new Error(error, "Error calculating fare")
    }
}

// console.log(transfer())
module.exports = transfer