import api from '../axiosConfig';
import type { InsumoBackend } from './insumosTypes';

export const getInsumos = async (): Promise<InsumoBackend[]> => {
  const { data } = await api.get<InsumoBackend[]>('/insumos');
  return data;
};

export const getInsumoById = async (id: number): Promise<InsumoBackend> => {
  const { data } = await api.get<InsumoBackend>(`/insumos/${id}`);
  return data;
};

