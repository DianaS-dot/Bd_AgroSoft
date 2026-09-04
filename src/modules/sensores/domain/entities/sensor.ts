export class Sensor {
  id?: number;

  nombreSensor!: string;
  tipoSensorId!: number;
  protocolo!: string;
  endpointUrl!: string;
  mqttTopic!: string;
  valorMinimoSensor!: number;
  valorMaximoSensor!: number;
  activo!: boolean;
  estadoConexion!: string;
  estado!: string;
  ultimoValor!: string;
  ultimaMedicion!: Date;
  lastSeenAt!: Date;
  cultivoId!: number;
  creadoPorUsuarioId!: number;
  globalConfigId!: number;
  loteId!: number;
  subLoteId!: number;

  constructor(data: Partial<Sensor>) {
    Object.assign(this, data);
  }
}
