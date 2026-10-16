import api from '../axiosConfig';
import type { 
  InsumoBackend, 
  CreateInsumoDto, 
  UpdateInsumoDto 
} from './insumosTypes';

export const createInsumo = async (dto: CreateInsumoDto): Promise<InsumoBackend> => {
  const { data } = await api.post<InsumoBackend>('/insumos', dto);
  return data;
};

export const updateInsumo = async (id: number, dto: UpdateInsumoDto): Promise<InsumoBackend> => {
  const { data } = await api.put<InsumoBackend>(`/insumos/${id}`, dto);
  return data;
};

export const deleteInsumo = async (id: number): Promise<void> => {
  await api.delete(`/insumos/${id}`);
};
