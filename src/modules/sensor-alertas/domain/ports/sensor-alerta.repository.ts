import { SensorAlerta } from "../entities/sensor-alerta";

export interface SensorAlertaRepository {

  crear(alerta: SensorAlerta): Promise<SensorAlerta>;

  obtenerTodas(): Promise<SensorAlerta[]>;

  obtenerPorId(id: number): Promise<SensorAlerta | null>;

  obtenerPorSensor(sensorId: number): Promise<SensorAlerta[]>;

  eliminar(id: number): Promise<void>;

}
