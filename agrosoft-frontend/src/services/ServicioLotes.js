import api from "../api/axios";

const obtenerLotes = async () => {
  const respuesta = await api.get("/lotes");
  return respuesta.data;
};

const obtenerLote = async (id) => {
  const respuesta = await api.get(`/lotes/${id}`);
  return respuesta.data;
};

const crearLote = async (datos) => {
  const respuesta = await api.post("/lotes", datos);
  return respuesta.data;
};

const actualizarLote = async (id, datos) => {
  const respuesta = await api.put(`/lotes/${id}`, datos);
  return respuesta.data;
};


const eliminarLote = async (id) => {
  const respuesta = await api.delete(`/lotes/${id}`);
  return respuesta.data;
};

const ServicioLotes = {
  obtenerLotes,
  obtenerLote,
  crearLote,
  actualizarLote,
  eliminarLote,
};

export default ServicioLotes;