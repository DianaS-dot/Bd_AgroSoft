import api from "../api/axios";

export const login = async (correo, password) => {
  const response = await api.post("/auth/login", {
    correo,
    password,
  });

  const data = response.data;

  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }

  if (data.usuario) {
    localStorage.setItem(
      "usuario",
      JSON.stringify(data.usuario)
    );
  }

  return data;
};