import { SensorRepository } from "../../domain/ports/sensor.repository";
import { SensorNotFoundException } from "../../domain/exceptions/sensor-not-found.exception";

export class EliminarSensorUseCase {

    constructor(
        private readonly sensorRepository: SensorRepository,
    ) {}

    async ejecutar(id: number): Promise<void> {

        const sensor = await this.sensorRepository.obtenerPorId(id);

        if (!sensor) {
            throw new SensorNotFoundException(id);
        }

        await this.sensorRepository.eliminar(id);

    }

}
