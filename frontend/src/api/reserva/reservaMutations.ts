import api from '../axiosConfig';
import type { 
  ReservaBackend, 
  CreateReservaDto, 
  UpdateReservaDto 
} from './reservaTypes';

export const createReserva = async (dto: CreateReservaDto): Promise<ReservaBackend> => {
  const { data } = await api.post<ReservaBackend>('/reserva', dto);
  return data;
};

export const updateReserva = async (id: number, dto: UpdateReservaDto): Promise<ReservaBackend> => {
  const { data } = await api.put<ReservaBackend>(`/reserva/${id}`, dto);
  return data;
};

export const deleteReserva = async (id: number): Promise<void> => {
  await api.delete(`/reserva/${id}`);
};
