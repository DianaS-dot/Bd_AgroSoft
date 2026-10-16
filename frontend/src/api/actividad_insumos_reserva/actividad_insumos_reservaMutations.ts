import api from '../axiosConfig';
import type { 
  ActividadInsumosReservaBackend, 
  CreateActividadInsumosReservaDto, 
  UpdateActividadInsumosReservaDto 
} from './actividad_insumos_reservaTypes';

export const createActividadInsumosReserva = async (dto: CreateActividadInsumosReservaDto): Promise<ActividadInsumosReservaBackend> => {
  const { data } = await api.post<ActividadInsumosReservaBackend>('/actividad-insumos-reserva', dto);
  return data;
};

export const updateActividadInsumosReserva = async (id: number, dto: UpdateActividadInsumosReservaDto): Promise<ActividadInsumosReservaBackend> => {
  const { data } = await api.put<ActividadInsumosReservaBackend>(`/actividad-insumos-reserva/${id}`, dto);
  return data;
};

export const deleteActividadInsumosReserva = async (id: number): Promise<void> => {
  await api.delete(`/actividad-insumos-reserva/${id}`);
};
