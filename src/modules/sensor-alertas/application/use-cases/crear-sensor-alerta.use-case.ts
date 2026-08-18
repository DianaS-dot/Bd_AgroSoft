import { SensorAlerta } from "../../domain/entities/sensor-alerta";
import { SensorAlertaRepository } from "../../domain/ports/sensor-alerta.repository";

export class CrearSensorAlertaUseCase {

    constructor(
        private readonly alertaRepository: SensorAlertaRepository,
    ) {}

    async ejecutar(alerta: SensorAlerta): Promise<SensorAlerta> {

        return await this.alertaRepository.crear(alerta);

    }

}
