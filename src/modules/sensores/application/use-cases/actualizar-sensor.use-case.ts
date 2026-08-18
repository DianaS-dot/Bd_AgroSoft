import { Sensor } from "../../domain/entities/sensor";
import { SensorRepository } from "../../domain/ports/sensor.repository";
import { SensorNotFoundException } from "../../domain/exceptions/sensor-not-found.exception";

export class ActualizarSensorUseCase {

    constructor(
        private readonly sensorRepository: SensorRepository,
    ) {}

    async ejecutar(sensor: Sensor): Promise<Sensor> {

        const existente = await this.sensorRepository.obtenerPorId(sensor.id!);

        if (!existente) {
            throw new SensorNotFoundException(sensor.id!);
        }

        return await this.sensorRepository.actualizar(sensor);

    }

}
