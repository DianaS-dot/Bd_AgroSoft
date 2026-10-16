import api from '../axiosConfig';
import type { 
  ActividadInsumosUsoBackend, 
  CreateActividadInsumosUsoDto, 
  UpdateActividadInsumosUsoDto 
} from './actividad_insumos_usoTypes';

export const createActividadInsumosUso = async (dto: CreateActividadInsumosUsoDto): Promise<ActividadInsumosUsoBackend> => {
  const { data } = await api.post<ActividadInsumosUsoBackend>('/actividad-insumos-uso', dto);
  return data;
};

export const updateActividadInsumosUso = async (id: number, dto: UpdateActividadInsumosUsoDto): Promise<ActividadInsumosUsoBackend> => {
  const { data } = await api.put<ActividadInsumosUsoBackend>(`/actividad-insumos-uso/${id}`, dto);
  return data;
};

export const deleteActividadInsumosUso = async (id: number): Promise<void> => {
  await api.delete(`/actividad-insumos-uso/${id}`);
};
