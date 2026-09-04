export interface SensorLectura {
  id?: number;
  createdAt?: string;
  sensorId: number;
  valor: string;
  fechaLectura: string;
  unidad: string;
  observaciones: string;
}
