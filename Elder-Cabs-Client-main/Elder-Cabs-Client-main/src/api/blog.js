import instance from './config';

const blogApi = {
    getAll: (pageNo, limit) => instance.get(`/blog/getall?pageNo=${pageNo}&limit=${limit}`),
    getById: (blogId) => instance.get(`/blog/${blogId}`),
    viewCount: (blogId) => instance.put(`/blog/viewCount/${blogId}`),
};

export default blogApi;