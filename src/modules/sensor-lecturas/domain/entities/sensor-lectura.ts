export class SensorLectura {

  readonly id?: number;
  readonly createdAt?: Date;

  readonly sensorId!: number;
  readonly valor!: string;
  readonly fechaLectura!: Date;
  readonly unidad!: string;
  readonly observaciones!: string;

  constructor(data: Partial<SensorLectura>) {
    Object.assign(this, data);
  }

}
