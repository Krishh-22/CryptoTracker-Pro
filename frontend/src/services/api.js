import axios from "axios";

const api = axios.create({
  baseURL: "https://cryptotracker-pro-backend.onrender.com",
  timeout: 10000,
});

export default api;