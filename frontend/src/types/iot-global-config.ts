export interface IotGlobalConfig {
  id?: number;
  name: string;
  broker: string;
  port: number;
  protocol: string;
  topicPrefix: string;
  defaultTopics: string;
  customTopics: string;
  loteId: number;
  subLoteId: number;
  username: string;
  password: string;
  activo: boolean;
  defaultSensorsInitialized: boolean;
  autoDiscover: boolean;
}
