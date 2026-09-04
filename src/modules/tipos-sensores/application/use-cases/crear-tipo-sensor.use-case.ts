import { TipoSensor } from '../../domain/entities/tipo-sensor';
import { TipoSensorRepository } from '../../domain/ports/tipo-sensor.repository';

export class CrearTipoSensorUseCase {
  constructor(private readonly tipoSensorRepository: TipoSensorRepository) {}

  async ejecutar(tipoSensor: TipoSensor): Promise<TipoSensor> {
    return await this.tipoSensorRepository.crear(tipoSensor);
  }
}
