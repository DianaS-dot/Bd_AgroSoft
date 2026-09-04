export interface SensorAlerta {
  id?: number;
  sensorId: number;
  valor: number;
  umbral: number;
  tipo: string;
  fechaAlerta: string;
  loteId: number;
  subLoteId: number;
}
