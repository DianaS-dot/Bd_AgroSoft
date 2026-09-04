import { SensorLectura } from '../../domain/entities/sensor-lectura';
import { SensorLecturaRepository } from '../../domain/ports/sensor-lectura.repository';
import { SensorLecturaNotFoundException } from '../../domain/exceptions/sensor-lectura-not-found.exception';

export class ActualizarSensorLecturaUseCase {
  constructor(private readonly lecturaRepository: SensorLecturaRepository) {}

  async ejecutar(lectura: SensorLectura): Promise<SensorLectura> {
    const existente = await this.lecturaRepository.obtenerPorId(lectura.id!);

    if (!existente) {
      throw new SensorLecturaNotFoundException(lectura.id!);
    }

    return await this.lecturaRepository.actualizar(lectura);
  }
}
