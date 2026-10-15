import { ActividadServicioDomain, ActividadServicioProps } from '../entities/actividad-servicio.entity';

export const ACTIVIDAD_SERVICIO_REPOSITORY = Symbol('ACTIVIDAD_SERVICIO_REPOSITORY');

export type ActividadServicioUpdate = Partial<Omit<ActividadServicioProps, 'id_actividad_servicio'>>;

export interface ActividadServicioRepositoryPort {
  create(servicio: ActividadServicioDomain): Promise<ActividadServicioDomain>;
  findAll(): Promise<ActividadServicioDomain[]>;
  findById(id: number): Promise<ActividadServicioDomain | null>;
  update(id: number, servicio: ActividadServicioUpdate): Promise<ActividadServicioDomain | null>;
  delete(id: number): Promise<boolean>;
}
