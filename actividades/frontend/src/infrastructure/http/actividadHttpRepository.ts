import type { Actividad, ActividadPayload } from '../../domain/actividad';
import type { ActividadRepository } from '../../domain/actividadRepository';
import { apiClient } from './apiClient';

export class ActividadHttpRepository implements ActividadRepository {
  async findAll(): Promise<Actividad[]> {
    const { data } = await apiClient.get<Actividad[]>('/actividades');
    return data;
  }

  async create(payload: ActividadPayload): Promise<Actividad> {
    const { data } = await apiClient.post<Actividad>('/actividades', payload);
    return data;
  }

  async update(id: number, payload: Partial<ActividadPayload>): Promise<Actividad> {
    const { data } = await apiClient.patch<Actividad>(`/actividades/${id}`, payload);
    return data;
  }

  async remove(id: number): Promise<void> {
    await apiClient.delete(`/actividades/${id}`);
  }
}
