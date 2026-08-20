import { InvalidPermisoError } from './errors/invalid-permiso.error';

export type Estado = 'ACTIVO' | 'INACTIVO';

export interface CreatePermisoInput {
  nombre: string;
  descripcion: string;
  estado?: Estado;
}

export class Permiso {
  constructor(
    public readonly id: number | null,
    public readonly nombre: string,
    public descripcion: string,
    public estado: Estado,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {}

  /**
   * Reglas de negocio:
   * - nombre y descripción obligatorios con al menos 3 caracteres.
   * - el nombre del permiso no puede repetirse (se valida en el repositorio).
   */
  static create(input: CreatePermisoInput): Permiso {
    const nombre = input.nombre?.trim();
    if (!nombre || nombre.length < 3) {
      throw new InvalidPermisoError(
        'El nombre del permiso es obligatorio y debe tener al menos 3 caracteres',
      );
    }

    const descripcion = input.descripcion?.trim();
    if (!descripcion || descripcion.length < 3) {
      throw new InvalidPermisoError(
        'La descripción del permiso es obligatoria y debe tener al menos 3 caracteres',
      );
    }

    const now = new Date();

    return new Permiso(
      null,
      nombre,
      descripcion,
      input.estado ?? 'ACTIVO',
      now,
      now,
      null,
    );
  }

  actualizarDescripcion(descripcion: string): void {
    const nueva = descripcion?.trim();
    if (!nueva || nueva.length < 3) {
      throw new InvalidPermisoError(
        'La descripción del permiso es obligatoria y debe tener al menos 3 caracteres',
      );
    }
    this.descripcion = nueva;
    this.updatedAt = new Date();
  }

  cambiarEstado(estado: Estado): void {
    this.estado = estado;
    this.updatedAt = new Date();
  }

  eliminar(): void {
    if (this.deletedAt) {
      throw new InvalidPermisoError('El permiso ya fue eliminado');
    }
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }
}
