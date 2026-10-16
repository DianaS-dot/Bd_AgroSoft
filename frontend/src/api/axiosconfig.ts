import axios from "axios";

/** */
const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10_000,
    headers: {  
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export default api;
