import instance from "./config";

const attachTaxiApi = {
    create: (data) => instance.post(`/attachTaxi`, data),
};

export default attachTaxiApi;