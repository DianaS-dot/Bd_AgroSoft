export class TipoSensor {
  id?: number;

  nombre!: string;
  unidad!: string;
  decimales!: number;
  descripcion!: string;
  imagen!: string;
  ttlMinutos!: number;

  constructor(data: Partial<TipoSensor>) {
    Object.assign(this, data);
  }
}
