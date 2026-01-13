import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
  return req;
});

export default API;
