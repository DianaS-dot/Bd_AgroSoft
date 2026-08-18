import { TipoSensor } from "../../domain/entities/tipo-sensor";
import { TipoSensorRepository } from "../../domain/ports/tipo-sensor.repository";

export class ObtenerTiposSensoresUseCase {

    constructor(
        private readonly tipoSensorRepository: TipoSensorRepository,
    ) {}

    async ejecutar(): Promise<TipoSensor[]> {

        return await this.tipoSensorRepository.obtenerTodos();

    }

}
