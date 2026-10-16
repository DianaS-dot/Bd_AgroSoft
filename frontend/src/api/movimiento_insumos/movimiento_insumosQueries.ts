import api from '../axiosConfig';
import type { MovimientoInsumosBackend } from './movimiento_insumosTypes';

export const getMovimientoInsumos = async (): Promise<MovimientoInsumosBackend[]> => {
  const { data } = await api.get<MovimientoInsumosBackend[]>('/movimiento-insumos');
  return data;
};

export const getMovimientoInsumosById = async (id: number): Promise<MovimientoInsumosBackend> => {
  const { data } = await api.get<MovimientoInsumosBackend>(`/movimiento-insumos/${id}`);
  return data;
};
