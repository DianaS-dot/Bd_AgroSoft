import { SensorLecturaRepository } from '../../domain/ports/sensor-lectura.repository';
import { SensorLecturaNotFoundException } from '../../domain/exceptions/sensor-lectura-not-found.exception';

export class EliminarSensorLecturaUseCase {
  constructor(private readonly lecturaRepository: SensorLecturaRepository) {}

  async ejecutar(id: number): Promise<void> {
    const existente = await this.lecturaRepository.obtenerPorId(id);

    if (!existente) {
      throw new SensorLecturaNotFoundException(id);
    }

    await this.lecturaRepository.eliminar(id);
  }
}
