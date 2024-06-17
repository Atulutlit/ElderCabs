import instance from "./config/axios";

const blogs = {
  getAll: () => instance.get("/blog"),

  getOne: (id) => instance.get(`/blog/${id}`),

  create: (data) => instance.post("/blog", data),

  update: (id, data) => instance.put(`/blog/${id}`, data),

  delete: (id) => instance.delete(`/blog/${id}`),

  uploadFile: (formData) =>
    instance.post("/upload/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default blogs;
