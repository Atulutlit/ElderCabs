import instance from "./config/axios";

const reviews = {
  getAll: () => instance.get("/review"),

  getOne: (id) => instance.get(`/review/${id}`),

  create: (data) => instance.post("/review", data),

  update: (id, data) => instance.put(`/review/${id}`, data),

  delete: (id) => instance.delete(`/review/${id}`),

  uploadFile: (formData) =>
    instance.post("/upload/review", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default reviews;
