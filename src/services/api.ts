import axios from "axios";

const { VITE_API_URL } = import.meta.env;

if (!VITE_API_URL) {
  throw new Error("VITE_API_URL não definido no .env");
}

const api = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
