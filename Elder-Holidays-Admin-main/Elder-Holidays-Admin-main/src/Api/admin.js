import instance from "./config/axios";

const admin = {
  update: (data) => instance.put("/admin/update", data),
};

export default admin;
