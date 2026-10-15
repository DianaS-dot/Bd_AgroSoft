import { ActividadResponsableDomain, ActividadResponsableProps } from '../entities/actividad-responsable.entity';

export const ACTIVIDAD_RESPONSABLE_REPOSITORY = Symbol('ACTIVIDAD_RESPONSABLE_REPOSITORY');

export type ActividadResponsableUpdate = Partial<Omit<ActividadResponsableProps, 'id_actividad_responsable'>>;

export interface ActividadResponsableRepositoryPort {
  create(responsable: ActividadResponsableDomain): Promise<ActividadResponsableDomain>;
  findAll(): Promise<ActividadResponsableDomain[]>;
  findById(id: number): Promise<ActividadResponsableDomain | null>;
  update(id: number, responsable: ActividadResponsableUpdate): Promise<ActividadResponsableDomain | null>;
  delete(id: number): Promise<boolean>;
}
