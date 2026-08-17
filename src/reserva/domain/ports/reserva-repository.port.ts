import { Reserva } from '../entities/reserva.entity';

/**
 * El Puerto es una INTERFAZ. 
 * Define qué acciones puede hacer el dominio con los datos.
 */
export interface ReservaRepository {
  save(reserva: Reserva): Promise<Reserva>;
  findAll(): Promise<Reserva[]>;
  findById(id: number): Promise<Reserva | null>;
  update(id: number, reserva: Partial<Reserva>): Promise<Reserva>;
  delete(id: number): Promise<boolean>;
}

/**
 * Token de Inyección para el repositorio de reservas.
 * Se usa en los Casos de Uso y en el Módulo de NestJS.
 */
export const RESERVA_REPOSITORY = Symbol('RESERVA_REPOSITORY');
