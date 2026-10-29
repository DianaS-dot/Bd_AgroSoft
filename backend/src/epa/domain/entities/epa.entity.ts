export class Epa {
  private constructor(
    public readonly id: number | null,
    public readonly nombre: string,
    public readonly tipoEpa: string,
    public readonly descripcion: string | null,
    public readonly sintomas: string | null,
    public readonly manejoYControl: string | null,
    public readonly mesesProbables: number[],
    public readonly temporadas: string[],
    public readonly notasEstacionalidad: string | null,
    public readonly fotosSintomas: string[],
    public readonly fotosGenerales: string[],
    public readonly tags: string[],
    public readonly creadoPorUsuarioId: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date | null,
  ) {}

  static create(params: {
    id?: number | null;
    nombre: string;
    tipoEpa: string;
    descripcion?: string | null;
    sintomas?: string | null;
    manejoYControl?: string | null;
    mesesProbables?: number[];
    temporadas?: string[];
    notasEstacionalidad?: string | null;
    fotosSintomas?: string[];
    fotosGenerales?: string[];
    tags?: string[];
    creadoPorUsuarioId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): Epa {
    if (!params.nombre?.trim()) {
      throw new Error('El nombre de la EPA es obligatorio');
    }
    if (!params.tipoEpa?.trim()) {
      throw new Error('El tipo de EPA es obligatorio');
    }
    return new Epa(
      params.id ?? null,
      params.nombre,
      params.tipoEpa,
      params.descripcion ?? null,
      params.sintomas ?? null,
      params.manejoYControl ?? null,
      params.mesesProbables ?? [],
      params.temporadas ?? [],
      params.notasEstacionalidad ?? null,
      params.fotosSintomas ?? [],
      params.fotosGenerales ?? [],
      params.tags ?? [],
      params.creadoPorUsuarioId,
      params.createdAt,
      params.updatedAt,
      params.deletedAt ?? null,
    );
  }
}