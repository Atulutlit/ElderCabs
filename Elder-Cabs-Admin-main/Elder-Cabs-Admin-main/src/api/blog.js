import instance from './config';

const blogApi = {
    create: (data) => instance.post(`/blog`, data, { headers: { "Content-Type": 'multipart/form-data' } }),
    readById: (blogId) => instance.get(`/blog/${blogId}`),
    readAll: (pageNo, limit) => instance.get(`/blog/getall?pageNo=${pageNo}&limit=${limit}`),
    update: (blogId, data) => instance.put(`/blog/${blogId}`, data, { headers: { "Content-Type": 'multipart/form-data' } }),
    delete: (blogId) => instance.delete(`/blog/${blogId}`),
};

export default blogApi;