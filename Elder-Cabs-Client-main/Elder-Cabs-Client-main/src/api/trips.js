import instance from './config/index';


const tripsApi = {
    getOneWayTrips: () => instance.get(`/trips/onewayTrip/getall`),
    getOneWayPlaces: () => instance.get(`/trips/onewayTrip/getPlaces`),
    getOneWayTripBySourceDes: (sourceCity, destination) => instance.get(`/trips/onewayTrip/getOne?source=${sourceCity}&destination=${destination}`),

    getRoundTrips: () => instance.get(`/trips/roundTrip/getall`),
    getRoundTripPlaces: () => instance.get(`/trips/roundTrip/getPlaces`),
    getRoundTripBySourceDes: (sourceCity, destinations) => instance.get(`/trips/roundTrip/getOne`, {
        params: {
            source: sourceCity,
            destinations: destinations
        }
    }),

    getLocalTrips: () => instance.get(`/trips/localTrip/getall`),
    getLocalTripsPlaces: () => instance.get(`/trips/localTrip/getPlaces`),
    getLocalTripBySource: (sourceCity) => instance.get(`/trips/localTrip/getOne?source=${sourceCity}`),

    getTransferTrips: () => instance.get(`/trips/transferTrip/getall`),
    getTransferTripsPlaces: () => instance.get(`/trips/transferTrip/getPlaces`),
    getTransferTripBySourceDes: (sourceCity, destination) => instance.get(`/trips/transferTrip/getOne?source=${sourceCity}&destination=${destination}`),
    getTripsConditions: () => instance.get(`/trips/getConditions`),
    getTrips: ({ sourceCity, destinations, destination, trip }) => instance.get(`/trips/getTrips`, {
        params: {
            trip: trip,
            sourceCity: sourceCity,
            destinationsCities: destinations,
            destinationCity: destination,
        }
    }),
    getTripById: (tripId, tripType) => instance.get(`/trips/getTripById/${tripId}/${tripType}`),
    getSurgeDates: () => instance.get(`/trips/getSurgeDates`),
};

export default tripsApi;