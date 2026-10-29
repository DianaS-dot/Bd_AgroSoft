export class WikiTipoEpa {
  private constructor(
    public readonly id: number | null,
    public readonly nombre: string,
    public readonly descripcion: string | null,
    public readonly tipoEpaEnum: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date | null,
  ) {}

  static create(params: {
    id?: number | null;
    nombre: string;
    descripcion?: string | null;
    tipoEpaEnum: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): WikiTipoEpa {
    if (!params.nombre?.trim()) {
      throw new Error('El nombre de wiki_tipo_epa es obligatorio');
    }
    if (!params.tipoEpaEnum?.trim()) {
      throw new Error('El tipoEpaEnum es obligatorio');
    }
    return new WikiTipoEpa(
      params.id ?? null,
      params.nombre,
      params.descripcion ?? null,
      params.tipoEpaEnum,
      params.createdAt,
      params.updatedAt,
      params.deletedAt ?? null,
    );
  }
}