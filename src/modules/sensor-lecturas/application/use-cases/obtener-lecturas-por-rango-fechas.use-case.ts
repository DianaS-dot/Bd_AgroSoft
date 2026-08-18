import { SensorLectura } from "../../domain/entities/sensor-lectura";
import { SensorLecturaRepository } from "../../domain/ports/sensor-lectura.repository";

export class ObtenerLecturasPorRangoFechasUseCase {

    constructor(
        private readonly lecturaRepository: SensorLecturaRepository,
    ) {}

    async ejecutar(sensorId: number, desde: Date, hasta: Date): Promise<SensorLectura[]> {

        return await this.lecturaRepository.obtenerPorRangoFechas(sensorId, desde, hasta);

    }

}
