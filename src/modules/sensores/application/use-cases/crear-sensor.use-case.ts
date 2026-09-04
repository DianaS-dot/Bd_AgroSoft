import { Sensor } from '../../domain/entities/sensor';
import { SensorRepository } from '../../domain/ports/sensor.repository';

export class CrearSensorUseCase {
  constructor(private readonly sensorRepository: SensorRepository) {}

  async ejecutar(sensor: Sensor): Promise<Sensor> {
    return await this.sensorRepository.crear(sensor);
  }
}
