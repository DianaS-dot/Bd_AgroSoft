import { Sensor } from "../../domain/entities/sensor";
import { SensorRepository } from "../../domain/ports/sensor.repository";
import { SensorNotFoundException } from "../../domain/exceptions/sensor-not-found.exception";

export class ObtenerSensorUseCase {

    constructor(
        private readonly sensorRepository: SensorRepository,
    ) {}

    async ejecutar(id: number): Promise<Sensor> {

        const sensor = await this.sensorRepository.obtenerPorId(id);

        if (!sensor) {
            throw new SensorNotFoundException(id);
        }

        return sensor;

    }

}
