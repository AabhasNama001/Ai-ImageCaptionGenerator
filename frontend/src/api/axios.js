import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-imagecaptiongenerator.onrender.com/api", // change to your deployed backend URL
  withCredentials: true, // important for cookies
});

export default api;
