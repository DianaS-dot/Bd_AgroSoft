import { SensorLectura } from "../entities/sensor-lectura";

export interface SensorLecturaRepository {

  registrar(lectura: SensorLectura): Promise<SensorLectura>;

  obtenerPorSensor(sensorId: number): Promise<SensorLectura[]>;

  obtenerPorId(id: number): Promise<SensorLectura | null>;

  obtenerPorRangoFechas(sensorId: number, desde: Date, hasta: Date): Promise<SensorLectura[]>;

}
