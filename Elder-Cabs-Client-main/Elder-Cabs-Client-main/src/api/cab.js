import instance from './config';

const cabApi = {
    sendQuery: (data) => instance.post(`/cabs`, data),
    getTripFare: (data) => instance.post(`/cabs/tripFare`, data),
    getCabsByTrip: (trip) => instance.get(`/cabs/getCabsByTrip`, { params: { trip: trip } }),
    getById: (cabId) => instance.get(`/cabs/${cabId}`),
};

export default cabApi;