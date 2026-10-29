export class TipoCultivoWiki {
  private constructor(
    public readonly id: number | null,
    public readonly nombre: string,
    public readonly descripcion: string | null,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date | null,
  ) {}

  static create(params: {
    id?: number | null;
    nombre: string;
    descripcion?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): TipoCultivoWiki {
    if (!params.nombre?.trim()) {
      throw new Error('El nombre del tipo de cultivo (wiki) es obligatorio');
    }
    return new TipoCultivoWiki(
      params.id ?? null,
      params.nombre,
      params.descripcion ?? null,
      params.createdAt,
      params.updatedAt,
      params.deletedAt ?? null,
    );
  }
}