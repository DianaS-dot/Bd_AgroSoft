import type { Actividad, ActividadPayload } from './actividad';

export interface ActividadRepository {
  findAll(): Promise<Actividad[]>;
  create(payload: ActividadPayload): Promise<Actividad>;
  update(id: number, payload: Partial<ActividadPayload>): Promise<Actividad>;
  remove(id: number): Promise<void>;
}
