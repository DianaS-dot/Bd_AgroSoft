import { SensorAlertaRepository } from '../../domain/ports/sensor-alerta.repository';
import { SensorAlertaNotFoundException } from '../../domain/exceptions/sensor-alerta-not-found.exception';

export class EliminarSensorAlertaUseCase {
  constructor(private readonly alertaRepository: SensorAlertaRepository) {}

  async ejecutar(id: number): Promise<void> {
    const alerta = await this.alertaRepository.obtenerPorId(id);

    if (!alerta) {
      throw new SensorAlertaNotFoundException(id);
    }

    await this.alertaRepository.eliminar(id);
  }
}
