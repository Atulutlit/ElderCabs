const router = require('express').Router();
const onewayController = require('../controllers/oneWayTrip');
const roundController = require('../controllers/roundTrip');
const localController = require('../controllers/localTrip');
const transferController = require('../controllers/transferTrip');
const adminController = require('../controllers/admin');

// terms and condition and surge dates route
router.get(`/getConditions`, adminController.getConditions);
router.get(`/getSurgeDates`, adminController.getSurgeDates);

// one way trip
router.post('/onewayTrip', onewayController.create); // create 
router.get('/onewayTrip/getPlaces', onewayController.getSourcesAndDestinations); // create 
router.get('/onewayTrip/getall', onewayController.getAll); // create 
router.get('/onewayTrip/getOne', onewayController.getBySourceDes); // create 
router.delete('/onewayTrip/:tripId', onewayController.delete); // delete 

// round trip
router.post('/roundTrip', roundController.create); // create 
router.get('/roundTrip/getall', roundController.getAll); // create 
router.get('/roundTrip/getPlaces', roundController.getSourcesAndDestinations); // create 
router.get('/roundTrip/getOne', roundController.getBySourceDes); // create 
router.delete('/roundTrip/:tripId', roundController.delete); // delete 

// local trip
router.post('/localTrip', localController.create); // create 
router.get('/localTrip/getall', localController.getAll); // create 
router.get('/localTrip/getPlaces', localController.getSources); // create 
router.get('/localTrip/getOne', localController.getBySource); // create 
router.delete('/localTrip/:tripId', localController.delete); // delete 

// transfer trip
router.post('/transferTrip', transferController.create); // create 
router.get('/transferTrip/getall', transferController.getAll); // create 
router.get('/transferTrip/getPlaces', transferController.getSourcesAndDestinations); // create 
router.get('/transferTrip/getOne', transferController.getBySourceDes); // create 
router.delete('/transferTrip/:tripId', transferController.delete); // delete

// get trips 
router.get(`/getTrips`, async (req, res) => {
    try {

        const { trip, sourceCity, destinationCity, destinationsCities } = req.query;

        // one way trip
        if (trip === 'one_way_trip') {
            return await onewayController.getBySourceDes({ query: { source: sourceCity, destination: destinationCity } }, res);
        }

        // round trip
        if (trip === 'round_trip') {
            return await roundController.getBySourceDes({ query: { source: sourceCity, destinations: destinationsCities } }, res);
        }

        // local trip
        if (trip === 'local_trip') {
            return await localController.getBySource({ query: { source: sourceCity } }, res);
        }

        // local trip
        if (trip === 'transfer_trip') {
            return await transferController.getBySourceDes({ query: { source: sourceCity, destination: destinationCity } }, res);
        }

    } catch (err) {
        res.status(400).send(err);
    }
});

// get trip by id
router.get(`/getTripById/:tripId/:tripType`, async (req, res) => {
    try {

        const { tripId, tripType } = req.params;

        // one way trip
        if (tripType === 'one_way_trip') {
            return await onewayController.getById({ query: { id: tripId } }, res);
        }

        // round trip
        if (tripType === 'round_trip') {
            return await roundController.getById({ query: { id: tripId } }, res);
        }

        // local trip
        if (tripType === 'local_trip') {
            return await localController.getById({ query: { id: tripId } }, res);
        }

        // local trip
        if (tripType === 'transfer_trip') {
            return await transferController.getById({ query: { id: tripId } }, res);
        }

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;