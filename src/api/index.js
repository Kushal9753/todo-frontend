import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true   // ⭐️⭐️⭐️ MAGIC LINE
});

export default API;
