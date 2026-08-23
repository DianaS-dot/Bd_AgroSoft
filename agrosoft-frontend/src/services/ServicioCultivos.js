import api from "../api/axios";

export const obtenerCultivos = async () => {
  const respuesta = await api.get("/cultivos");
  return respuesta.data;
};

export const obtenerCultivo = async (id) => {
  const respuesta = await api.get(`/cultivos/${id}`);
  return respuesta.data;
};

export const crearCultivo = async (cultivo) => {
  const respuesta = await api.post("/cultivos", cultivo);
  return respuesta.data;
};

export const actualizarCultivo = async (id, cultivo) => {
  const respuesta = await api.put(`/cultivos/${id}`, cultivo);
  return respuesta.data;
};

export const eliminarCultivo = async (id) => {
  await api.delete(`/cultivos/${id}`);
};