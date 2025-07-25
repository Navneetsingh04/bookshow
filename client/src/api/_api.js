import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials :true
});

export default instance;
