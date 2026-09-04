import { SensorAlerta } from '../../domain/entities/sensor-alerta';
import { SensorAlertaRepository } from '../../domain/ports/sensor-alerta.repository';
import { SensorAlertaNotFoundException } from '../../domain/exceptions/sensor-alerta-not-found.exception';

export class ActualizarSensorAlertaUseCase {
  constructor(private readonly alertaRepository: SensorAlertaRepository) {}

  async ejecutar(alerta: SensorAlerta): Promise<SensorAlerta> {
    const existente = await this.alertaRepository.obtenerPorId(alerta.id!);

    if (!existente) {
      throw new SensorAlertaNotFoundException(alerta.id!);
    }

    return await this.alertaRepository.actualizar(alerta);
  }
}
