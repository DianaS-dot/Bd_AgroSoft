import { ActividadInsumoReserva } from '../entities/actividad-insumo-reserva.entity';

/**
 * El Puerto es una INTERFAZ. 
 * Define qué acciones puede hacer el dominio con los datos.
 */
export interface ActividadInsumoReservaRepository {
  save(actividadInsumoReserva: ActividadInsumoReserva): Promise<ActividadInsumoReserva>;
  findAll(): Promise<ActividadInsumoReserva[]>;
  findById(id: number): Promise<ActividadInsumoReserva | null>;
  update(id: number, actividadInsumoReserva: Partial<ActividadInsumoReserva>): Promise<ActividadInsumoReserva>;
  delete(id: number): Promise<boolean>;
}

/**
 * Token de Inyección para el repositorio de reserva de insumos en actividades.
 * Se usa en los Casos de Uso y en el Módulo de NestJS.
 */
export const ACTIVIDAD_INSUMO_RESERVA_REPOSITORY = Symbol('ACTIVIDAD_INSUMO_RESERVA_REPOSITORY');
