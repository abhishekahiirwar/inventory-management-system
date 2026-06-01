import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-backend-b80x.onrender.com",
});

export default api;