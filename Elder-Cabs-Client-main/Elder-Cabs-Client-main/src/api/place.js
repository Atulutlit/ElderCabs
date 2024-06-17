import instance from "./config";

const placeApi = {
    getAll: () => instance.get(`/place`),
};

export default placeApi;