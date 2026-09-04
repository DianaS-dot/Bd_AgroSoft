export class Actividad {
  private constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly descripcion: string,
    public readonly fechaInicio: Date,
    public readonly fechaFin: Date,
    public readonly estado: string,
  ) {}

  public static create(params: {
    id: string;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado?: string;
  }): Actividad {
    if (!params.nombre || params.nombre.trim() === '') {
      throw new Error('El nombre de la actividad es obligatorio.');
    }

    if (params.fechaFin < params.fechaInicio) {
      throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio.');
    }

    return new Actividad(
      params.id,
      params.nombre.trim(),
      params.descripcion ? params.descripcion.trim() : '',
      params.fechaInicio,
      params.fechaFin,
      params.estado || 'PENDIENTE',
    );
  }
}
