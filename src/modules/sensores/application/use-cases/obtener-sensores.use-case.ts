import { Sensor } from "../../domain/entities/sensor";
import { SensorRepository } from "../../domain/ports/sensor.repository";

export class ObtenerSensoresUseCase {

    constructor(
        private readonly sensorRepository: SensorRepository,
    ) {}

    async ejecutar(): Promise<Sensor[]> {

        return await this.sensorRepository.obtenerTodos();

    }

}
