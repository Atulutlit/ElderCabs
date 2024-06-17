import axios from "axios";

// export const getToken = () =>
//   localStorage.getItem("token") ? localStorage.getItem("token") : null;

// export const getAuthorizationHeader = () => {
//   return `Bearer ${getToken()}`;
// };

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem("token") ? localStorage.getItem("token") : null
    }`,
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;
