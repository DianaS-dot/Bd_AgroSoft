import { InvalidRolError } from './errors/invalid-rol.error';

export type Estado = 'ACTIVO' | 'INACTIVO';

export interface CreateRolInput {
  nombre: string;
  descripcion: string;
  estado?: Estado;
}

export class Rol {
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
   * - el nombre del rol no puede repetirse (se valida en el repositorio).
   */
  static create(input: CreateRolInput): Rol {
    const nombre = input.nombre?.trim();
    if (!nombre || nombre.length < 3) {
      throw new InvalidRolError(
        'El nombre del rol es obligatorio y debe tener al menos 3 caracteres',
      );
    }

    const descripcion = input.descripcion?.trim();
    if (!descripcion || descripcion.length < 3) {
      throw new InvalidRolError(
        'La descripción del rol es obligatoria y debe tener al menos 3 caracteres',
      );
    }

    const now = new Date();

    return new Rol(
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
      throw new InvalidRolError(
        'La descripción del rol es obligatoria y debe tener al menos 3 caracteres',
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
      throw new InvalidRolError('El rol ya fue eliminado');
    }
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }
}
