const { Client } = require("@googlemaps/google-maps-services-js");
const { default: axios } = require("axios");
const { getDistance, convertDistance } = require("geolib");

const client = new Client({});

const apiKey = process.env.MAPS_API_KEY;


// get location details || latitude , longitude etc
const getLocation = async (address) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
        if (response?.data?.results?.length > 0) {
            const { lat, lng } = response?.data?.results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        }
        return {};
    } catch (err) {
        throw err;
    }
}

// get road distance between two locations
const getRoadDistance = (origin, destination) => new Promise(async (resolve, reject) => {

    try {
        let distance = await client.distancematrix({
            params: {
                key: apiKey,
                origins: [origin],
                destinations: [destination],
                units: 'metric'
            },
            timeout: 3000,
        });

        distance = distance.data.rows;

        if (distance.length > 0) {
            const distanceInMeters = distance[0].elements.reduce((total, element) => total + element.distance.value, 0);
            const distanceInKm = convertDistance(distanceInMeters, 'km'); // convert meter to km
            const duration = distance[0].elements.reduce((total, element) => total + element.duration.value, 0);
            resolve({ distanceInKm, distance: distanceInMeters, duration });
        } else {
            resolve(null);
        }
    } catch (err) {
        reject(err);
    }

    // console.log(distance);

    // let maxRetries = 3,
    //     retries = 0;

    // while (retries < maxRetries) {
    //     try {
    //         // console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`)

    //         const response = await axios(`https://maps.googleapis.com/maps/api/directions/json`, {
    //             method: 'get',
    //             params: {
    //                 origin: encodeURIComponent(origin),
    //                 destination: encodeURIComponent(destination),
    //                 key: apiKey
    //             }
    //         });
    //         console.log(response);
    //         // console.log('api', apiKey);

    //         const routes = response.data.routes;
    //         // console.log(routes[0].legs)
    //         if (routes.length > 0) {
    //             const distanceInMeters = routes[0].legs.reduce(
    //                 (total, leg) => total + leg.distance.value,
    //                 0
    //             );
    //             const duration = routes[0].legs.reduce(
    //                 (total, leg) => total + leg.duration.value,
    //                 0
    //             );
    //             const distanceInKm = convertDistance(distanceInMeters, 'km')
    //             resolve({ distanceInKm, distance: distanceInMeters, duration });
    //         } else {
    //             resolve(null);
    //         }

    //     } catch (error) {
    //         if (error.code === 'ECONNRESET' && retries < maxRetries) {
    //             retries++;
    //             console.log(`Retrying request (${retries}/${maxRetries})...`);
    //             // Add a short delay before retrying
    //             await new Promise(resolve => setTimeout(resolve, 1000));
    //         } else {
    //             // Handle other types of errors or rethrow the error
    //             reject(error)
    //         }
    //     }
    // }
});

// get duration by two locations

const getDistanceFromTwoLocations = async (location1, location2) => {
    try {

        // get distance in meters
        const distanceInMeters = getDistance(location1, location2);

        // get kilometer distance convert by meter
        const distanceInKm = convertDistance(distanceInMeters, 'km');

        return distanceInKm;

    } catch (err) {
        throw err;
    }
}

module.exports = { getLocation, getDistanceFromTwoLocations, getRoadDistance };


// const elevalte = async (locations) => {
//     return client
//         .elevation({
//             params: {
//                 locations, // array of coordinates -- [{ lat: 45, lng: -110 }]
//                 key,
//             },
//             timeout: 1000, // milliseconds
//         })
//         .then((res) => {
//             // console.log(res.data.results[0].elevation);
//             return results = {
//                 data: res.data,
//                 statusCode: res.status,
//                 statusMessage: res.statusText,
//             }
//         })
//         .catch((err) => {
//             console.log(err.response.data.error_message);
//             return results = {
//                 data: err.response.data.error_message,
//                 statusCode: 500,
//                 statusMessage: "Unknown Error!!!",
//             }
//         });
// }

// const getDistanceMatrix = async (origins, destinations) => {
//     return client
//         .distancematrix({
//             params: {
//                 origins, // array of coordinates -- [{ lat: 45, lng: -110 }]
//                 destinations, // array of coordinates -- [{ lat: 46, lng: -110 }]
//                 key,
//             },
//             timeout: 1000, // milliseconds
//         })
//         .then((res) => {
//             return results = {
//                 data: res.data,
//                 statusCode: res.status,
//                 statusMessage: res.statusText,
//             }
//         })
//         .catch((err) => {
//             console.log(err, 'Maps API error');
//             const results = {
//                 data: err.response.data.error_message,
//                 statusCode: 500,
//                 statusMessage: "Error connecting Google Maps!!!",
//             }
//             return new Error(results);
//         });
// }

// module.exports = {
//     elevalte,
//     getDistanceMatrix,
// };

// -----------------axios starts-------------

// const axios = require('axios');

// const config = {
//     method: 'get',
//     url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=YOUR_API_KEY',
//     headers: {}
// };

// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// -----------------axios ends-------------

// const { Loader } = require("@googlemaps/js-api-loader");

// const loader = new Loader({
//     apiKey: process.env.MAPS_API_KEY,
//     version: "weekly",
//     ...additionalOptions,
// });
// const service = new


// function initMap() {
//     const bounds = new google.maps.LatLngBounds();
//     const markersArray = [];
//     const map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: 55.53, lng: 9.4 },
//         zoom: 10,
//     });
//     // initialize services
//     const geocoder = new google.maps.Geocoder();
//     const service = new google.maps.DistanceMatrixService();
//     // build request
//     const origin1 = { lat: 55.93, lng: -3.118 };
//     const origin2 = "Greenwich, England";
//     const destinationA = "Stockholm, Sweden";
//     const destinationB = { lat: 50.087, lng: 14.421 };
//     const request = {
//         origins: [origin1, origin2],
//         destinations: [destinationA, destinationB],
//         travelMode: google.maps.TravelMode.DRIVING,
//         unitSystem: google.maps.UnitSystem.METRIC,
//         avoidHighways: false,
//         avoidTolls: false,
//     };

//     // put request on page
//     document.getElementById("request").innerText = JSON.stringify(
//         request,
//         null,
//         2
//     );
//     // get distance matrix response
//     service.getDistanceMatrix(request).then((response) => {
//         // put response
//         document.getElementById("response").innerText = JSON.stringify(
//             response,
//             null,
//             2
//         );

//         // show on map
//         const originList = response.originAddresses;
//         const destinationList = response.destinationAddresses;

//         deleteMarkers(markersArray);

//         const showGeocodedAddressOnMap = (asDestination) => {
//             const handler = ({ results }) => {
//                 map.fitBounds(bounds.extend(results[0].geometry.location));
//                 markersArray.push(
//                     new google.maps.Marker({
//                         map,
//                         position: results[0].geometry.location,
//                         label: asDestination ? "D" : "O",
//                     })
//                 );
//             };
//             return handler;
//         };

//         for (let i = 0; i < originList.length; i++) {
//             const results = response.rows[i].elements;

//             geocoder
//                 .geocode({ address: originList[i] })
//                 .then(showGeocodedAddressOnMap(false));

//             for (let j = 0; j < results.length; j++) {
//                 geocoder
//                     .geocode({ address: destinationList[j] })
//                     .then(showGeocodedAddressOnMap(true));
//             }
//         }
//     });
// }

// function deleteMarkers(markersArray) {
//     for (let i = 0; i < markersArray.length; i++) {
//         markersArray[i].setMap(null);
//     }

//     markersArray = [];
// }

// window.initMap = initMap;