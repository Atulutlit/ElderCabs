/* 
Contains Functionality for Multicity
    Multicity Traits: Inter-City | Multiple Destinations Can Be Chosen

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

const extraPerKmCharges = 10;
const driverAllowancePerDay = 500;
const advancePaymentPercentage = 20;

const multiCity = async (sourceCity, destinationCities, pickupDatetime, returnDate) => {
    try {
        let distTravelled = 0;
        let source = sourceCity;
        let destination = [destinationCities[0]];
        for (let i = 0; i < destinationCities.length; i++) {
            if (i > 0) source = destination
            destination = [destinationCities[i]];
            console.log(source, destination, 'source, destination');
            const mapsDataResponse = await getDistanceMatrix(source, destination)
            distTravelled += mapsDataResponse.data.rows[0].elements[0].distance.value // in meters
        }
        console.log(distTravelled, 'distTravelled');
        const distanceTravelledOneWay = distTravelled / 1000; // in km
        const distanceTravelled = distanceTravelledOneWay * 2; // in km
        const minimumChargePerCity = 250;
        const cityVisitCount = 2;
        const daysCount = 3;

        let fare = minimumChargePerCity * cityVisitCount; // base fare
        const extraKmTravelled = distanceTravelled - (minimumChargePerCity * cityVisitCount); // extra KM travelled
        if (extraKmTravelled > 0) fare += extraKmTravelled * extraPerKmCharges; // adding extra KM charges
        fare += driverAllowancePerDay * daysCount; // adding DA
        fare += Math.floor(fare * (5 / 100)) // adding GST

        const advancePayment = Math.floor(fare * (advancePaymentPercentage / 100))

        const extraChargesPolicy = [
            `For Extra Kilometers You will be Charged Rs. ${extraPerKmCharges} per km.`,
            `Per Day Driver Allowance is Rs. ${driverAllowancePerDay}, Which You will be liable to pay.`,
        ];

        const final = {
            type: "Multi City",
            fare,
            advancePayment,
            extraChargesPolicy,
            elderCabsTransparency: "Elder Cabs Transparency",
            calculations: `Calculations are as follow:
            Base Fare: ${minimumChargePerCity} * ${cityVisitCount} = ${minimumChargePerCity * cityVisitCount}
            Extra KM Travelled: ${distanceTravelled} - (${minimumChargePerCity} * ${cityVisitCount}) = ${extraKmTravelled}
            Extra KM Charges: ${extraKmTravelled} * ${extraPerKmCharges} = ${extraKmTravelled * extraPerKmCharges}
            Driver Allowance: ${driverAllowancePerDay} * ${daysCount} = ${driverAllowancePerDay * daysCount}
            GST: ${fare * (5 / 100)}(5%)
            Total Fare: ${fare}`,
        };
        return final;
    } catch (error) {
        console.log('Error calculating fare of multi city');
        return new Error(error, "Error calculating fare");
    }
};

// console.log(multiCity());
module.exports = multiCity