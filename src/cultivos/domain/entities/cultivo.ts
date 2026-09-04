export class Cultivo {
  id?: number;

  nombreCultivo!: string;
  tipoCultivo!: string;
  descripcion!: string;
  loteId!: number;
  subloteId!: number;
  imgCultivo!: string;
  fechaSiembra!: Date;
  fechaFinalizacion!: Date;
  costoTotal!: number;
  estado!: string;

  constructor(data: Partial<Cultivo>) {
    Object.assign(this, data);
  }
}

// readolny significa qu eel id solo se asigna una vez los demas no lo son porque si pueden cambiar
