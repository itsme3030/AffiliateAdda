import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  headers: { "Content-Type": "application/json" },
  
});

export const addProduct = (data) => api.post("/product/add", data);