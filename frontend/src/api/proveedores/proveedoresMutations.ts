import api from '../axiosConfig';
import type { 
  ProveedorBackend, 
  CreateProveedorDto, 
  UpdateProveedorDto 
} from './proveedoresTypes';

export const createProveedor = async (dto: CreateProveedorDto): Promise<ProveedorBackend> => {
  const { data } = await api.post<ProveedorBackend>('/proveedores', dto);
  return data;
};

export const updateProveedor = async (id: number, dto: UpdateProveedorDto): Promise<ProveedorBackend> => {
  const { data } = await api.put<ProveedorBackend>(`/proveedores/${id}`, dto);
  return data;
};

export const deleteProveedor = async (id: number): Promise<void> => {
  await api.delete(`/proveedores/${id}`);
};
