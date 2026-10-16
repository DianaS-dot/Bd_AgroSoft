import api from '../axiosConfig';
import type { 
  MovimientoInsumosBackend, 
  CreateMovimientoInsumosDto, 
  UpdateMovimientoInsumosDto 
} from './movimiento_insumosTypes';

export const createMovimientoInsumos = async (dto: CreateMovimientoInsumosDto): Promise<MovimientoInsumosBackend> => {
  const { data } = await api.post<MovimientoInsumosBackend>('/movimiento-insumos', dto);
  return data;
};

export const updateMovimientoInsumos = async (id: number, dto: UpdateMovimientoInsumosDto): Promise<MovimientoInsumosBackend> => {
  const { data } = await api.put<MovimientoInsumosBackend>(`/movimiento-insumos/${id}`, dto);
  return data;
};

export const deleteMovimientoInsumos = async (id: number): Promise<void> => {
  await api.delete(`/movimiento-insumos/${id}`);
};
