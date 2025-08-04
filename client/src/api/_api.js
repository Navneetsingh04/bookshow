import axios from "axios";

// console.log("process.env.VITE_API_BASE_URL",process.env.VITE_API_BASE_URL);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials :true
});

export default instance;
