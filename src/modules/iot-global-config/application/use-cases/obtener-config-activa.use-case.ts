import { IotGlobalConfig } from '../../domain/entities/iot-global-config';
import { IotGlobalConfigRepository } from '../../domain/ports/iot-global-config.repository';

export class ObtenerConfigActivaUseCase {
  constructor(private readonly configRepository: IotGlobalConfigRepository) {}

  async ejecutar(): Promise<IotGlobalConfig | null> {
    return await this.configRepository.obtenerActiva();
  }
}
