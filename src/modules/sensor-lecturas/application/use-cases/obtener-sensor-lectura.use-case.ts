import { SensorLectura } from '../../domain/entities/sensor-lectura';
import { SensorLecturaRepository } from '../../domain/ports/sensor-lectura.repository';
import { SensorLecturaNotFoundException } from '../../domain/exceptions/sensor-lectura-not-found.exception';

export class ObtenerSensorLecturaUseCase {
  constructor(private readonly lecturaRepository: SensorLecturaRepository) {}

  async ejecutar(id: number): Promise<SensorLectura> {
    const lectura = await this.lecturaRepository.obtenerPorId(id);

    if (!lectura) {
      throw new SensorLecturaNotFoundException(id);
    }

    return lectura;
  }
}
