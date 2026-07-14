import axios from "axios";

console.log("API BASE URL:", "http://127.0.0.1:8000");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});

export default api;