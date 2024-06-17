import instance from "./config";

const contactApi = {
    sendMail: (data) => instance.post(`/contact/sendMail`, data),
};

export default contactApi;