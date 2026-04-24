import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-saas-zysj.onrender.com/api"
});

export default API;