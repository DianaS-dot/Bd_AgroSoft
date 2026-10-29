export class ProgramaFormacion {
  private constructor(
    public readonly id: number | null,
    public readonly numeroFicha: string,
    public readonly nombre: string,
    public readonly tipo: string,
    public readonly descripcion: string | null,
    public readonly fechaInicio: Date,
    public readonly fechaFin: Date,
    public readonly estado: string,
    public readonly cantidadAprendices: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date | null,
  ) {}

  static create(params: {
    id?: number | null;
    numeroFicha: string;
    nombre: string;
    tipo: string;
    descripcion?: string | null;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    cantidadAprendices: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): ProgramaFormacion {
    if (!params.numeroFicha?.trim()) {
      throw new Error('El número de ficha es obligatorio');
    }
    if (!params.nombre?.trim()) {
      throw new Error('El nombre del programa de formación es obligatorio');
    }
    if (params.fechaFin < params.fechaInicio) {
      throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
    }
    if (params.cantidadAprendices < 0) {
      throw new Error('La cantidad de aprendices no puede ser negativa');
    }
    return new ProgramaFormacion(
      params.id ?? null,
      params.numeroFicha,
      params.nombre,
      params.tipo,
      params.descripcion ?? null,
      params.fechaInicio,
      params.fechaFin,
      params.estado,
      params.cantidadAprendices,
      params.createdAt,
      params.updatedAt,
      params.deletedAt ?? null,
    );
  }
}