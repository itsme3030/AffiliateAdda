import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // Include credentials (session cookies) in requests
});

export const login = (data) => api.post("/auth/login", data);
export const signup = (data) => api.post("/auth/signup", data);
export const addProduct = (data) => api.post("/product/add", data);
export const generateLink = (data) => api.post("/link/generate", data);
export const getProducts = () => api.get("/product/list");
