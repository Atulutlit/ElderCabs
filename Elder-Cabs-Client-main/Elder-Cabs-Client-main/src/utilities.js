import moment from "moment";

export const tripFare = ({ tripType, trip, surgeDates, pickupDate, returnDate }) => {

    let totalFare = 0;
    let advanceFare = 0;
    let noOfDays = 0;

    if (tripType === 'one_way_trip') {

        const isSurgeDate = surgeDates.find(i => moment(i, 'MM-DD-YYYY').isSame(moment(pickupDate, 'DD-MM-YYYY')));
        const { pricePerKm, surgePrice, distance, driverAllowance } = trip;

        let fare = 0;

        fare = pricePerKm * distance;

        if (isSurgeDate) { // surge price
            fare += surgePrice;
        }

        fare = fare + driverAllowance; // add driver allowance
        fare = fare + (fare / 100 * 5); // add 5% gst

        totalFare = Math.ceil(fare); // total fare
        advanceFare = Math.ceil((fare / 100 * 20)); // advance fare

    }

    if (tripType === 'round_trip') {

        const isSurgeDate = surgeDates.find(i => moment(i, 'MM-DD-YYYY').isSame(moment(pickupDate, 'DD-MM-YYYY')));
        const { pricePerKm, surgePrice, noOfKmCharge, driverAllowance } = trip;
        const startDate = moment(pickupDate, 'DD-MM-YYYY'); // Replace with your start date
        const endDate = moment(returnDate, 'DD-MM-YYYY');   // Replace with your end date

        const numberOfDays = endDate.diff(startDate, 'days') + 1;

        let fare = 0;
        let distance = noOfKmCharge * numberOfDays;
        noOfDays = numberOfDays;

        fare = pricePerKm * distance;

        if (isSurgeDate) { // add surge price
            fare += surgePrice;
        }

        fare = fare + (driverAllowance * noOfDays); // add driver allowance
        fare = fare + (fare / 100 * 5); // add 5% gst

        totalFare = Math.ceil(fare); // total fare
        advanceFare = Math.ceil((fare / 100 * 20)); // advance fare

    }

    if (tripType === 'transfer_trip') {

        const isSurgeDate = surgeDates.find(i => moment(i, 'MM-DD-YYYY').isSame(moment(pickupDate, 'DD-MM-YYYY')));
        const { price, surgePrice } = trip;

        let fare = 0;

        fare = price;

        if (isSurgeDate) { // add surge price
            fare += surgePrice;
        }

        fare = fare + (fare / 100 * 5); // add 5% gst

        totalFare = Math.ceil(fare); // total fare
        advanceFare = Math.ceil((fare / 100 * 20)); // advance fare

    }

    if (tripType === 'local_trip') {

        const isSurgeDate = surgeDates.find(i => moment(i, 'MM-DD-YYYY').isSame(moment(pickupDate, 'DD-MM-YYYY')));
        const { pricePerKm, pricePerHr, price } = trip;

        let fare = 0;
        let distance = 80; // 80 km
        let duration = 80; // 80 hrs

        fare += price;

        fare = fare + (fare / 100 * 5); // add 5% gst

        totalFare = Math.ceil(fare); // total fare
        advanceFare = Math.ceil((fare / 100 * 20)); // advance fare

    }

    return { totalFare, advanceFare, noOfDays };
}

export const beautifyCurrency = (value) => {
    // Check if the value is a valid number
    if (isNaN(value) || value === null) {
        return "Invalid Number";
    }

    // Round the value to two decimal places
    const roundedValue = Math.round(value);

    // Convert the number to a string with commas for thousands separator
    const formattedValue = roundedValue.toLocaleString();

    // Add the currency symbol (you can change this based on your desired currency)
    // const currencySymbol = "$"; // For US Dollar
    // const beautifiedCurrency = currencySymbol + formattedValue;

    return formattedValue;
}