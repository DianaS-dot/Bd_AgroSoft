import { IotGlobalConfig } from "../../domain/entities/iot-global-config";
import { IotGlobalConfigRepository } from "../../domain/ports/iot-global-config.repository";
import { IotGlobalConfigNotFoundException } from "../../domain/exceptions/iot-global-config-not-found.exception";

export class ObtenerIotGlobalConfigUseCase {

    constructor(
        private readonly configRepository: IotGlobalConfigRepository,
    ) {}

    async ejecutar(id: number): Promise<IotGlobalConfig> {

        const config = await this.configRepository.obtenerPorId(id);

        if (!config) {
            throw new IotGlobalConfigNotFoundException(id);
        }

        return config;

    }

}
