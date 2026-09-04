import { SensorAlerta } from '../../domain/entities/sensor-alerta';
import { SensorAlertaRepository } from '../../domain/ports/sensor-alerta.repository';

export class ObtenerSensorAlertasUseCase {
  constructor(private readonly alertaRepository: SensorAlertaRepository) {}

  async ejecutar(): Promise<SensorAlerta[]> {
    return await this.alertaRepository.obtenerTodas();
  }
}
