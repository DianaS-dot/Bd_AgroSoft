import api from '../axiosConfig';
import type { ProveedorBackend } from './proveedoresTypes';

export const getProveedores = async (): Promise<ProveedorBackend[]> => {
  const { data } = await api.get<ProveedorBackend[]>('/proveedores');
  return data;
};

export const getProveedorById = async (id: number): Promise<ProveedorBackend> => {
  const { data } = await api.get<ProveedorBackend>(`/proveedores/${id}`);
  return data;
};
