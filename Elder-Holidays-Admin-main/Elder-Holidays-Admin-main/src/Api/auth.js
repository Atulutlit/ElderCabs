import instance from "./config/axios";

const auth = {
  login: (data) => instance.post("/auth/login", data),
  validate: () => instance.get("/auth/validate"),
};

export default auth;
