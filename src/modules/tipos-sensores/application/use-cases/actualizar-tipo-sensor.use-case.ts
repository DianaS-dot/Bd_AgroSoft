import { TipoSensor } from "../../domain/entities/tipo-sensor";
import { TipoSensorRepository } from "../../domain/ports/tipo-sensor.repository";
import { TipoSensorNotFoundException } from "../../domain/exceptions/tipo-sensor-not-found.exception";

export class ActualizarTipoSensorUseCase {

    constructor(
        private readonly tipoSensorRepository: TipoSensorRepository,
    ) {}

    async ejecutar(tipoSensor: TipoSensor): Promise<TipoSensor> {

        const existente = await this.tipoSensorRepository.obtenerPorId(tipoSensor.id!);

        if (!existente) {
            throw new TipoSensorNotFoundException(tipoSensor.id!);
        }

        return await this.tipoSensorRepository.actualizar(tipoSensor);

    }

}
