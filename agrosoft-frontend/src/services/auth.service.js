import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (correo, password) => {
  const response = await API.post("/auth/login", {
    correo,
    password,
  });

  return response.data;
};