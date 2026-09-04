import { SensorLectura } from '../../domain/entities/sensor-lectura';
import { SensorLecturaRepository } from '../../domain/ports/sensor-lectura.repository';

export class RegistrarLecturaUseCase {
  constructor(private readonly lecturaRepository: SensorLecturaRepository) {}

  async ejecutar(lectura: SensorLectura): Promise<SensorLectura> {
    return await this.lecturaRepository.registrar(lectura);
  }
}
