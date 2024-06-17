import instance from "./config/axios";

const themes = {
    read: async () => {
        const res = await instance.get('/theme');
        return res.data;
    },
    create: (data) => instance.post('/theme', data),
    update: (id, data) => instance.put(`/theme/${id}`, data),
    delete: (id) => instance.delete(`/theme/${id}`)
};

export default themes;