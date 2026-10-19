
import api from "../api/axios";

const obtenerSublotes = async () => {
  const respuesta = await api.get("/sublotes");
  const datos = respuesta.data;

  return Array.isArray(datos) ? datos : datos?.data ?? [];
};

const crearSublote = async (datos) => {
  const respuesta = await api.post("/sublotes", datos);
  return respuesta.data;
};

const actualizarSublote = async (id, datos) => {
  const respuesta = await api.put(`/sublotes/${id}`, datos);
  return respuesta.data;
};

const eliminarSublote = async (id) => {
  const respuesta = await api.delete(`/sublotes/${id}`);
  return respuesta.data;
};

const ServicioSublotes = {
  obtenerSublotes,
  crearSublote,
  actualizarSublote,
  eliminarSublote,
};

export default ServicioSublotes;