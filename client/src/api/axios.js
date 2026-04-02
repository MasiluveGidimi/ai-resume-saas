import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-saas-9twy.onrender.com/api",
});

export default API;