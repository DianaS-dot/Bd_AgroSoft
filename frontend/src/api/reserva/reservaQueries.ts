import api from '../axiosConfig';
import type { ReservaBackend } from './reservaTypes';

export const getReservas = async (): Promise<ReservaBackend[]> => {
  const { data } = await api.get<ReservaBackend[]>('/reserva');
  return data;
};

export const getReservaById = async (id: number): Promise<ReservaBackend> => {
  const { data } = await api.get<ReservaBackend>(`/reserva/${id}`);
  return data;
};
