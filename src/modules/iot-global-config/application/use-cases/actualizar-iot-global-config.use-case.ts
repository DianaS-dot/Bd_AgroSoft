import { IotGlobalConfig } from "../../domain/entities/iot-global-config";
import { IotGlobalConfigRepository } from "../../domain/ports/iot-global-config.repository";
import { IotGlobalConfigNotFoundException } from "../../domain/exceptions/iot-global-config-not-found.exception";

export class ActualizarIotGlobalConfigUseCase {

    constructor(
        private readonly configRepository: IotGlobalConfigRepository,
    ) {}

    async ejecutar(config: IotGlobalConfig): Promise<IotGlobalConfig> {

        const existente = await this.configRepository.obtenerPorId(config.id!);

        if (!existente) {
            throw new IotGlobalConfigNotFoundException(config.id!);
        }

        return await this.configRepository.actualizar(config);

    }

}
