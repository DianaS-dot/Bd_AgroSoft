import { InvalidUsuarioPermisoError } from '../errors/invalid-usuario-permiso.error';

export type Estado = 'ACTIVO' | 'INACTIVO';

export interface CreateUsuarioPermisoInput {
  usuarioId: number;
  permisoId: number;
  estado?: Estado;
}

export class UsuarioPermiso {
  constructor(
    public readonly id: number | null,
    public readonly usuarioId: number,
    public readonly permisoId: number,
    public estado: Estado,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {}

  /**
   * Reglas de negocio:
   * - el usuario y el permiso deben tener IDs válidos.
   * - el par (usuarioId, permisoId) no puede repetirse (se valida en el repositorio).
   */
  static create(input: CreateUsuarioPermisoInput): UsuarioPermiso {
    if (!Number.isInteger(input.usuarioId) || input.usuarioId <= 0) {
      throw new InvalidUsuarioPermisoError(
        'El usuario es obligatorio y debe tener un ID válido',
      );
    }

    if (!Number.isInteger(input.permisoId) || input.permisoId <= 0) {
      throw new InvalidUsuarioPermisoError(
        'El permiso es obligatorio y debe tener un ID válido',
      );
    }

    const now = new Date();

    return new UsuarioPermiso(
      null,
      input.usuarioId,
      input.permisoId,
      input.estado ?? 'ACTIVO',
      now,
      now,
      null,
    );
  }

  cambiarEstado(estado: Estado): void {
    this.estado = estado;
    this.updatedAt = new Date();
  }

  eliminar(): void {
    if (this.deletedAt) {
      throw new InvalidUsuarioPermisoError(
        'La relación usuario-permiso ya fue eliminada',
      );
    }
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }
}
