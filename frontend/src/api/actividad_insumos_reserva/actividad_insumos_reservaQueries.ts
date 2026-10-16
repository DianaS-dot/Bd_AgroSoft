import api from '../axiosConfig';
import type { ActividadInsumosReservaBackend } from './actividad_insumos_reservaTypes';

export const getActividadInsumosReserva = async (): Promise<ActividadInsumosReservaBackend[]> => {
  const { data } = await api.get<ActividadInsumosReservaBackend[]>('/actividad-insumos-reserva');
  return data;
};

export const getActividadInsumosReservaById = async (id: number): Promise<ActividadInsumosReservaBackend> => {
  const { data } = await api.get<ActividadInsumosReservaBackend>(`/actividad-insumos-reserva/${id}`);
  return data;
};
