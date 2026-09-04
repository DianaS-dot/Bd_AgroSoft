import { Sensor } from '../entities/sensor';

export interface SensorRepository {
  crear(sensor: Sensor): Promise<Sensor>;

  obtenerTodos(): Promise<Sensor[]>;

  obtenerPorId(id: number): Promise<Sensor | null>;

  obtenerActivos(): Promise<Sensor[]>;

  actualizar(sensor: Sensor): Promise<Sensor>;

  eliminar(id: number): Promise<void>;
}
