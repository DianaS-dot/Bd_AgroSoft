import { InvalidRolPermisoError } from './errors/invalid-rol-permiso.error';

export type Estado = 'ACTIVO' | 'INACTIVO';

export interface CreateRolPermisoInput {
  rolId: number;
  permisoId: number;
  estado?: Estado;
}

export class RolPermiso {
  constructor(
    public readonly id: number | null,
    public readonly rolId: number,
    public readonly permisoId: number,
    public estado: Estado,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {}

  /**
   * Reglas de negocio:
   * - el rol y el permiso deben tener IDs válidos.
   * - el par (rolId, permisoId) no puede repetirse (se valida en el repositorio).
   */
  static create(input: CreateRolPermisoInput): RolPermiso {
    if (!Number.isInteger(input.rolId) || input.rolId <= 0) {
      throw new InvalidRolPermisoError(
        'El rol es obligatorio y debe tener un ID válido',
      );
    }

    if (!Number.isInteger(input.permisoId) || input.permisoId <= 0) {
      throw new InvalidRolPermisoError(
        'El permiso es obligatorio y debe tener un ID válido',
      );
    }

    const now = new Date();

    return new RolPermiso(
      null,
      input.rolId,
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
      throw new InvalidRolPermisoError(
        'La relación rol-permiso ya fue eliminada',
      );
    }
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }
}
