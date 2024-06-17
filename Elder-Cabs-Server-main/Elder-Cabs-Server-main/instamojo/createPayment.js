const Insta = require('instamojo-nodejs');
Insta.setKeys(process.env.INSTAMOJO_API_KEY, process.env.INSTAMOJO_AUTH_KEY);

// booking controller
const bookingController = require('../controllers/booking');
const Booking = require('../models/Booking');
const OneWayTrip = require('../models/OneWayTrip');
const Cabs = require('../models/Cabs');
const Admin = require('../models/Admin');
const RoundTrip = require('../models/RoundTrip');
const LocalTrip = require('../models/LocalTrip');
const TransferTrip = require('../models/TransferTrip');
const moment = require('moment');

// calculate payment
const calculatePayment = ({ tripType, trip, surgeDates, pickupDate, returnDate }) => {

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
        // fare = fare + cabFare; // add cab fare
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
        // fare = fare + cabFare; // add cab fare
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

        // fare = fare + cabFare; // add cab fare
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

        // fare = fare + cabFare; // add cab fare
        fare = fare + (fare / 100 * 5); // add 5% gst

        totalFare = Math.ceil(fare); // total fare
        advanceFare = Math.ceil((fare / 100 * 20)); // advance fare

    }

    return { totalFare, advanceFare, noOfDays };
}

// trip fare
const tripFare = async (tripData) => {

    try {

        const tripType = tripData.trip.trip;
        const tripId = tripData.trip.tripId;
        const paymentPercent = tripData.paymentPercent;

        // get surge dates
        const surgeDates = await (async () => {
            try {
                let findQuery = {};

                if (process.env.NODE_ENV === 'palash') {
                    findQuery = { adminOf: 'elder_cabs' };
                }

                let result = await Admin.findOne({ ...findQuery }).exec();

                if (result.surgeDates) {
                    return result.surgeDates
                }
            } catch (err) {
                throw err;
            }
        })();

        // total fare
        let getTrip = null;

        // get trip
        if (tripType === 'one_way_trip') {
            getTrip = await OneWayTrip.findById(tripId).exec();
        } else if (tripType === 'round_trip') {
            getTrip = await RoundTrip.findById(tripId).exec();
        } else if (tripType === 'local_trip') {
            getTrip = await LocalTrip.findById(tripId).exec();
        } else if (tripType === 'transfer_trip') {
            getTrip = await TransferTrip.findById(tripId).exec();
        }

        // calculate payment function argument
        const args = {
            tripType,
            surgeDates,
            trip: getTrip,
            pickupDate: tripData.trip?.pickupDate,
            returnDate: tripData.trip?.returnDate
        };

        const { totalFare } = calculatePayment(args);

        let payment = totalFare / 100 * paymentPercent;
        console.log(payment)
        return Math.ceil(payment);

    } catch (err) {
        throw err;
    }
}

module.exports = async (req, res) => {
    try {

        const bookingData = await bookingController.create(req.body);
        const data = new Insta.PaymentData();
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173/';

        const fare = await tripFare(req.body);

        if (fare === req.body.amount) {
            req.body.amount = fare
        } else {
            return res.status(400).json({ message: 'Sorry something went wrong!' });
        }

        for (let key in req.body) {
            data[key] = req.body[key];
        }
        data.currency = 'INR';
        data.phone = req.body.phoneNo;
        data.setRedirectUrl(`${clientUrl}?payment=success&bookingId=${bookingData._id}`);

        // Insta.isSandboxMode(true);

        Insta.createPayment(data, async (err, response) => {
            if (err) {
                res.status(400).send(err);
            } else {
                const resData = JSON.parse(response);
                if (resData.success) {
                    await Booking.findByIdAndUpdate(bookingData._id, { paymentId: resData.payment_request.id });
                }
                res.json(resData);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}