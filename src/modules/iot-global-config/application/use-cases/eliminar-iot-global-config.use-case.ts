import { IotGlobalConfigRepository } from "../../domain/ports/iot-global-config.repository";
import { IotGlobalConfigNotFoundException } from "../../domain/exceptions/iot-global-config-not-found.exception";

export class EliminarIotGlobalConfigUseCase {

    constructor(
        private readonly configRepository: IotGlobalConfigRepository,
    ) {}

    async ejecutar(id: number): Promise<void> {

        const config = await this.configRepository.obtenerPorId(id);

        if (!config) {
            throw new IotGlobalConfigNotFoundException(id);
        }

        await this.configRepository.eliminar(id);

    }

}
