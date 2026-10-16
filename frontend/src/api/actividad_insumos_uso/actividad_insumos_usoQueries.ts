import api from '../axiosConfig';
import type { ActividadInsumosUsoBackend } from './actividad_insumos_usoTypes';

export const getActividadInsumosUso = async (): Promise<ActividadInsumosUsoBackend[]> => {
  const { data } = await api.get<ActividadInsumosUsoBackend[]>('/actividad-insumos-uso');
  return data;
};

export const getActividadInsumosUsoById = async (id: number): Promise<ActividadInsumosUsoBackend> => {
  const { data } = await api.get<ActividadInsumosUsoBackend>(`/actividad-insumos-uso/${id}`);
  return data;
};
