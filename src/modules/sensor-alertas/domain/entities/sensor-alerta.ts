export class SensorAlerta {
  id?: number;

  sensorId!: number;
  valor!: number;
  umbral!: number;
  tipo!: string;
  fechaAlerta!: Date;
  loteId!: number;
  subLoteId!: number;

  constructor(data: Partial<SensorAlerta>) {
    Object.assign(this, data);
  }
}
