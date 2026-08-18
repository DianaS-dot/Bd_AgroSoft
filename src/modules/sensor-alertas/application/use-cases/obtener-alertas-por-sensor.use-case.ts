import { SensorAlerta } from "../../domain/entities/sensor-alerta";
import { SensorAlertaRepository } from "../../domain/ports/sensor-alerta.repository";

export class ObtenerAlertasPorSensorUseCase {

    constructor(
        private readonly alertaRepository: SensorAlertaRepository,
    ) {}

    async ejecutar(sensorId: number): Promise<SensorAlerta[]> {

        return await this.alertaRepository.obtenerPorSensor(sensorId);

    }

}
