import { SensorLectura } from '../../domain/entities/sensor-lectura';
import { SensorLecturaRepository } from '../../domain/ports/sensor-lectura.repository';

export class ObtenerSensorLecturasUseCase {
  constructor(private readonly lecturaRepository: SensorLecturaRepository) {}

  async ejecutar(): Promise<SensorLectura[]> {
    return await this.lecturaRepository.obtenerTodas();
  }
}
