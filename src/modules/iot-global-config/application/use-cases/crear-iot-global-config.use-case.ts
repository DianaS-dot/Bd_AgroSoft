import { IotGlobalConfig } from "../../domain/entities/iot-global-config";
import { IotGlobalConfigRepository } from "../../domain/ports/iot-global-config.repository";

export class CrearIotGlobalConfigUseCase {

    constructor(
        private readonly configRepository: IotGlobalConfigRepository,
    ) {}

    async ejecutar(config: IotGlobalConfig): Promise<IotGlobalConfig> {

        return await this.configRepository.crear(config);

    }

}
