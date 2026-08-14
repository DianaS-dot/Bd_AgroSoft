import { ActividadDomain, ActividadProps } from '../models/actividad.model';

export const ACTIVIDAD_REPOSITORY = Symbol('ACTIVIDAD_REPOSITORY');

export type ActividadUpdate = Partial<
  Omit<
    ActividadProps,
    | 'id_actividad'
    | 'fecha_creacion'
    | 'fecha_actualizacion'
    | 'cultivo_real'
    | 'responsables'
    | 'evidencias'
    | 'servicios'
    | 'herramientas'
    | 'historial'
  >
>;

export interface ActividadRepositoryPort {
  create(actividad: ActividadDomain): Promise<ActividadDomain>;
  findAll(): Promise<ActividadDomain[]>;
  findById(id: number): Promise<ActividadDomain | null>;
  update(id: number, actividad: ActividadUpdate): Promise<ActividadDomain | null>;
  delete(id: number): Promise<boolean>;
}
