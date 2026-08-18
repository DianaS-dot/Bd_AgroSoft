import { SensorAlerta } from "../../domain/entities/sensor-alerta";
import { SensorAlertaRepository } from "../../domain/ports/sensor-alerta.repository";
import { SensorAlertaNotFoundException } from "../../domain/exceptions/sensor-alerta-not-found.exception";

export class ObtenerSensorAlertaUseCase {

    constructor(
        private readonly alertaRepository: SensorAlertaRepository,
    ) {}

    async ejecutar(id: number): Promise<SensorAlerta> {

        const alerta = await this.alertaRepository.obtenerPorId(id);

        if (!alerta) {
            throw new SensorAlertaNotFoundException(id);
        }

        return alerta;

    }

}
