export interface Sensor {
  id?: number;
  nombreSensor: string;
  tipoSensorId: number;
  protocolo: string;
  endpointUrl: string;
  mqttTopic: string;
  valorMinimoSensor: number;
  valorMaximoSensor: number;
  activo: boolean;
  estadoConexion: string;
  estado: string;
  ultimoValor: string;
  ultimaMedicion: string;
  lastSeenAt: string;
  cultivoId: number;
  creadoPorUsuarioId: number;
  globalConfigId: number;
  loteId: number;
  subLoteId: number;
}
