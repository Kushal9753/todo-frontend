import axios from "axios";

const API = axios.create({
  baseURL: "/api",   // ⭐️ VERY IMPORTANT
});

export default API;
