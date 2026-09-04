import { SensorLectura } from '../../domain/entities/sensor-lectura';
import { SensorLecturaRepository } from '../../domain/ports/sensor-lectura.repository';

export class ObtenerLecturasPorSensorUseCase {
  constructor(private readonly lecturaRepository: SensorLecturaRepository) {}

  async ejecutar(sensorId: number): Promise<SensorLectura[]> {
    return await this.lecturaRepository.obtenerPorSensor(sensorId);
  }
}
