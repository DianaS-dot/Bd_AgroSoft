import { Actividad } from '../entities/actividad.entity';

export interface ActividadRepository {
  save(actividad: Actividad): Promise<void>;
  findById(id: string): Promise<Actividad | null>;
  findAll(): Promise<Actividad[]>;
  update(actividad: Actividad): Promise<void>;
  delete(id: string): Promise<void>;
}

export const ACTIVIDAD_REPOSITORY = Symbol('ACTIVIDAD_REPOSITORY');
