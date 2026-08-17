import { ActividadInsumoUso } from '../entities/actividad-insumo-uso.entity';

/**
 * El Puerto es una INTERFAZ. 
 * Define qué acciones puede hacer el dominio con los datos.
 */
export interface ActividadInsumoUsoRepository {
  save(actividadInsumoUso: ActividadInsumoUso): Promise<ActividadInsumoUso>;
  findAll(): Promise<ActividadInsumoUso[]>;
  findById(id: number): Promise<ActividadInsumoUso | null>;
  update(id: number, actividadInsumoUso: Partial<ActividadInsumoUso>): Promise<ActividadInsumoUso>;
  delete(id: number): Promise<boolean>;
}

/**
 * Token de Inyección para el repositorio de uso de insumos en actividades.
 * Se usa en los Casos de Uso y en el Módulo de NestJS.
 */
export const ACTIVIDAD_INSUMO_USO_REPOSITORY = Symbol('ACTIVIDAD_INSUMO_USO_REPOSITORY');
