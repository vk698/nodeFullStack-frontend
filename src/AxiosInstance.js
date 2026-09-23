import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://nodefullstack-backend.onrender.com/",

  withCredentials: true,
});
export default axiosInstance;
