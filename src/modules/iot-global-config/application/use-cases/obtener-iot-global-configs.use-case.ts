import { IotGlobalConfig } from '../../domain/entities/iot-global-config';
import { IotGlobalConfigRepository } from '../../domain/ports/iot-global-config.repository';

export class ObtenerIotGlobalConfigsUseCase {
  constructor(private readonly configRepository: IotGlobalConfigRepository) {}

  async ejecutar(): Promise<IotGlobalConfig[]> {
    return await this.configRepository.obtenerTodas();
  }
}
