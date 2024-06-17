import instance from "./config/axios";

const categories = {
    read: async () => {
        const res = await instance.get('/categories');
        return res.data;
    },
    create: (data) => instance.post('/categories', data),
    update: (id, data) => instance.put(`/categories/${id}`, data),
    delete: (id) => instance.delete(`/categories/${id}`)
};

export default categories;