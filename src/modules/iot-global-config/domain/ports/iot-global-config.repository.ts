import { IotGlobalConfig } from "../entities/iot-global-config";

export interface IotGlobalConfigRepository {

  crear(config: IotGlobalConfig): Promise<IotGlobalConfig>;

  obtenerTodas(): Promise<IotGlobalConfig[]>;

  obtenerPorId(id: number): Promise<IotGlobalConfig | null>;

  obtenerActiva(): Promise<IotGlobalConfig | null>;

  actualizar(config: IotGlobalConfig): Promise<IotGlobalConfig>;

  eliminar(id: number): Promise<void>;

}
