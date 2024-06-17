import instance from "./config";

const attachTaxiApi = {
    getAll: () => instance.get(`/attachTaxi/getall`),
}

export default attachTaxiApi;