import instance from "./config";

const bookingApi = {
    createPayment: (data) => instance.post(`/booking/createPayment`, data),
    paymentSuccess: (data) => instance.put(`/booking/paymentSuccess`, data),
};

export default bookingApi;
