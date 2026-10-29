export class TipoFormacion {
  private constructor(
    public readonly id: number | null,
    public readonly codigo: string,
    public readonly nombre: string,
    public readonly descripcion: string | null,
    public readonly activo: boolean,
    public readonly orden: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date | null,
  ) {}

  static create(params: {
    id?: number | null;
    codigo: string;
    nombre: string;
    descripcion?: string | null;
    activo?: boolean;
    orden: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): TipoFormacion {
    if (!params.codigo?.trim()) {
      throw new Error('El código del tipo de formación es obligatorio');
    }
    if (!params.nombre?.trim()) {
      throw new Error('El nombre del tipo de formación es obligatorio');
    }
    return new TipoFormacion(
      params.id ?? null,
      params.codigo,
      params.nombre,
      params.descripcion ?? null,
      params.activo ?? true,
      params.orden,
      params.createdAt,
      params.updatedAt,
      params.deletedAt ?? null,
    );
  }
}