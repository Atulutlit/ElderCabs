import instance from "./config";

const categoryApi = {
    create: (data) => instance.post(`/categories`, data),
    read: (searchQuery) => instance.get(`/categories?s=${searchQuery}`),
    update: (categoryId, data) => instance.put(`/categories/${categoryId}`, data),
    delete: (categoryId) => instance.delete(`/categories/${categoryId}`),
};

export default categoryApi;