import { Notificacion } from '../entities/notificacion.entity';

export interface NotificacionRepository {
  save(notificacion: Notificacion): Promise<Notificacion>;
  findAll(): Promise<Notificacion[]>;
  findById(id: number): Promise<Notificacion | null>;
  findByUsuarioId(usuarioId: number): Promise<Notificacion[]>;
}

export const NOTIFICACION_REPOSITORY = Symbol('NOTIFICACION_REPOSITORY');