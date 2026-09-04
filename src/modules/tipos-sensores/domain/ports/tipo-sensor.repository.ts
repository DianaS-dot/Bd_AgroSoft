import { TipoSensor } from '../entities/tipo-sensor';

export interface TipoSensorRepository {
  crear(tipoSensor: TipoSensor): Promise<TipoSensor>;

  obtenerTodos(): Promise<TipoSensor[]>;

  obtenerPorId(id: number): Promise<TipoSensor | null>;

  actualizar(tipoSensor: TipoSensor): Promise<TipoSensor>;

  eliminar(id: number): Promise<void>;
}
