import instance from "./config";

const cabsApi = {
    create: (data) => instance.post(`/cabs`, data, { headers: { "Content-Type": 'multipart/form-data' } }),
    getById: (cabId) => instance.get(`/cabs/${cabId}`),
    getAll: (searchQuery = '') => instance.get(`/cabs/getall?s=${searchQuery}`),
    update: (cabId, data) => instance.put(`/cabs/${cabId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    delete: (cabId) => instance.delete(`/cabs/${cabId}`),
};

export default cabsApi;