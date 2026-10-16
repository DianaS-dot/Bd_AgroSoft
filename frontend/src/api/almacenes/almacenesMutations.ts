import api from '../axiosConfig';
import type { 
  AlmacenBackend, 
  CreateAlmacenDto, 
  UpdateAlmacenDto 
} from './almacenesTypes';

export const createAlmacen = async (dto: CreateAlmacenDto): Promise<AlmacenBackend> => {
  const { data } = await api.post<AlmacenBackend>('/almacenes', dto);
  return data;
};

export const updateAlmacen = async (id: number, dto: UpdateAlmacenDto): Promise<AlmacenBackend> => {
  const { data } = await api.put<AlmacenBackend>(`/almacenes/${id}`, dto);
  return data;
};

export const deleteAlmacen = async (id: number): Promise<void> => {
  await api.delete(`/almacenes/${id}`);
};
