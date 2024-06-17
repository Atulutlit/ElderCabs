import instance from "./config";

const authApi = {
    login: (email, password) => instance.post(`/auth/login`, { email, password }),
    validateAdmin: () => instance.get(`/auth/validate`),
};

export default authApi;