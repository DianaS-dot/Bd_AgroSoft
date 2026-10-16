import api from '../axiosConfig';
import type { AlmacenBackend } from './almacenesTypes';

export const getAlmacenes = async (): Promise<AlmacenBackend[]> => {
  const { data } = await api.get<AlmacenBackend[]>('/almacenes');
  return data;
};

export const getAlmacenById = async (id: number): Promise<AlmacenBackend> => {
  const { data } = await api.get<AlmacenBackend>(`/almacenes/${id}`);
  return data;
};
