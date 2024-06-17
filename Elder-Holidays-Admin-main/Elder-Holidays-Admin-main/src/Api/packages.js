import instance from "./config/axios";

const packages = {
  getAll: () => instance.get("/package"),

  getAllByTheme: (theme) => instance.get(`/package/theme/${theme}`),

  getAllByCategory: (category) => instance.get(`/package/category/${category}`),

  getOne: (id) => instance.get(`/package/${id}`),

  create: (data) => instance.post("/package", data),

  update: (id, data) => instance.put(`/package/${id}`, data),

  delete: (id) => instance.delete(`/package/${id}`),

  uploadFile: (formData) =>
    instance.post("/upload/package", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default packages;
