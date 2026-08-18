import { TipoSensorRepository } from "../../domain/ports/tipo-sensor.repository";
import { TipoSensorNotFoundException } from "../../domain/exceptions/tipo-sensor-not-found.exception";

export class EliminarTipoSensorUseCase {

    constructor(
        private readonly tipoSensorRepository: TipoSensorRepository,
    ) {}

    async ejecutar(id: number): Promise<void> {

        const tipoSensor = await this.tipoSensorRepository.obtenerPorId(id);

        if (!tipoSensor) {
            throw new TipoSensorNotFoundException(id);
        }

        await this.tipoSensorRepository.eliminar(id);

    }

}
