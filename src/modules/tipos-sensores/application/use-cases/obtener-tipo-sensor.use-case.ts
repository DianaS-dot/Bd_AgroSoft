import { TipoSensor } from "../../domain/entities/tipo-sensor";
import { TipoSensorRepository } from "../../domain/ports/tipo-sensor.repository";
import { TipoSensorNotFoundException } from "../../domain/exceptions/tipo-sensor-not-found.exception";

export class ObtenerTipoSensorUseCase {

    constructor(
        private readonly tipoSensorRepository: TipoSensorRepository,
    ) {}

    async ejecutar(id: number): Promise<TipoSensor> {

        const tipoSensor = await this.tipoSensorRepository.obtenerPorId(id);

        if (!tipoSensor) {
            throw new TipoSensorNotFoundException(id);
        }

        return tipoSensor;

    }

}
