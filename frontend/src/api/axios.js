import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // change to your deployed backend URL
  withCredentials: true, // important for cookies
});

export default api;
