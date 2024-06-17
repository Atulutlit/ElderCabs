const { getDistanceMatrix } = require("./google_maps/mapsConfig");

// const advancePaymentPercentage = 10;
const local = async (admin) => {

    try {

        // assuming Rs1 per km and Rs5 per hr
        const advancePaymentPercentage = admin.advancePayment, // advance payment . 
            chargePerKm = admin.chargePerKm, // it's provide from dashboard
            chargePerHr = admin.chargePerHour, // it's provide from dashboard
            localBasicFare = admin.basicFare; // it's provide from dashboard

        // extra charge
        const extraChargesPolicy = [
            `No Extra Charges`,
            `Basic charges are Rs. ${chargePerKm} per km and Rs. ${chargePerHr} per hour.`,
        ];

        let fare = localBasicFare;

        // // if distance grater than 80 KM
        // if (Math.ceil(distanceInKm) > 80) {
        //     const extraDistance = Math.ceil(distanceInKm) - 80;
        //     fare = localBasicFare + (extraDistance * chargePerKm);
        // }

        // // if time grater then 8 hours
        // if (Math.ceil(totalHours) > 8) {
        //     const extraHours = Math.ceil(totalHours) - 8;
        //     fare += extraHours * chargePerHr;
        // }

        const gst = fare * 5 / 100;
        fare += gst; // add 5% gst on fare
        fare = Math.round(fare);

        // advance payment
        const advancePayment = Math.round(fare * (advancePaymentPercentage / 100));

        const final = {
            type: "Transfer",
            trip: 'local_trip',
            totalFare: fare,
            advancePercent: advancePaymentPercentage,
            chargePerHr: chargePerHr,
            chargePerKm: chargePerKm,
            gst: 5,
            fare,
            // advancePayment,
            // elderCabsTransparency: "Elder Cabs Transparency",
            // extraChargesPolicy,
            // calculations: `Calculations are as follow:
            // Base Fare: (${distanceInKm} * ${chargePerKm}) + (${totalHours} * ${chargePerHr}) = ${distanceInKm * chargePerKm + totalHours * chargePerHr}
            // GST: ${gst}(5%)
            // Total Fare: ${fare}`,
        }

        return final;

        // const mapsDataResponse = await getDistanceMatrix(source, destination)
        // const distTravelledOneWay = mapsDataResponse.data.rows[0].elements[0].distance.value // in meters
        // const distTravelledRoundTrip = distTravelledOneWay * 2 // in meters
        // const expectedTimeOneWay = mapsDataResponse.data.rows[0].elements[0].duration.value // in seconds
        // const totalExpectedTime = expectedTimeOneWay * 2 // in seconds
        // const distInKm = Math.floor(distTravelledRoundTrip / 1000) // in km
        // const totalTimeInHr = Math.floor(totalExpectedTime / 3600) // in hr

        // // assuming rates as Rs10 for 10km/1hr
        // const defaultCharges = 80 // Rs 80 upto 80km/8hr
        // const extraPerKmCharges = 0.8 // Rs 0.8 per km
        // const extraPerHrCharges = 8 // Rs 8 per hr
        // const extraChargesPolicy = [
        //     `For Extra Kilometers You will be Charged Rs. ${extraPerKmCharges} per km.`,
        //     `For Extra Hours You will be Charged Rs. ${extraPerHrCharges} per km.`,
        // ];

        // let fare = 80;

        // if (totalTimeInHr <= 8 && distInKm <= 80) {
        //     const gst = fare * 5 / 100;
        //     fare += gst; // final amount payable by user
        //     fare = Math.round(fare)
        //     const advancePayment = Math.floor(fare * (advancePaymentPercentage / 100))
        //     const final = {
        //         fare,
        //         advancePayment,
        //         extraChargesPolicy,
        //         elderCabsTransparency: "Elder Cabs Transparency",
        //         calculations: `Calculations are as follow:
        //         Base Fare: ${fare}
        //         GST: ${gst}(5%)
        //         Total Fare: ${fare}`,
        //     }
        //     return final;
        // }
        // if (totalTimeInHr > 8) {
        //     const extraTime = totalTimeInHr - 8;
        //     fare += extraTime * extraPerHrCharges;
        //     const gst = fare * 5 / 100;
        //     fare += gst; // final amount payable by user
        //     fare = Math.round(fare)
        //     const advancePayment = Math.floor(fare * (advancePaymentPercentage / 100))
        //     const final = {
        //         fare,
        //         advancePayment,
        //         extraChargesPolicy,
        //         elderCabsTransparency: "Elder Cabs Transparency",
        //         calculations: `Calculations are as follow:
        //         Base Fare: ${fare}
        //         Extra Hours: ${totalTimeInHr} - 8 = ${extraTime}
        //         Extra Hours Charges: ${extraTime} * ${extraPerHrCharges} = ${extraTime * extraPerHrCharges}
        //         GST: ${gst}(5%)
        //         Total Fare: ${fare}`,
        //     }
        //     return final;
        // }
        // if (distInKm > 80) {
        //     const extraDist = distInKm - 80;
        //     fare += extraDist * extraPerKmCharges;
        //     const gst = fare * 5 / 100;
        //     fare += gst; // final amount payable by user
        //     fare = Math.round(fare)
        //     const advancePayment = Math.floor(fare * (advancePaymentPercentage / 100))
        //     const final = {
        //         type: "Local",
        //         fare,
        //         advancePayment,
        //         extraChargesPolicy,
        //         elderCabsTransparency: "Elder Cabs Transparency",
        //         calculations: `Calculations are as follow:
        //         Base Fare: ${fare}
        //         Extra Distance: ${distInKm} - 80 = ${extraDist}
        //         Extra Distance Charges: ${extraDist} * ${extraPerKmCharges} = ${extraDist * extraPerKmCharges}
        //         GST: ${gst}(5%)
        //         Total Fare: ${fare}`,
        //     }
        //     return final;
        // }
    } catch (error) {
        console.log('Error calculating fare of local');
        return new Error(error, "Error calculating fare")
    }
}

// console.log(local())
module.exports = local