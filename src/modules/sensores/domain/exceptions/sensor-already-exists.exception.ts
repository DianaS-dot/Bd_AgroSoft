export class SensorAlreadyExistsException extends Error {

  constructor(nombreSensor: string) {
    super(`El sensor "${nombreSensor}" ya existe`);
    this.name = 'SensorAlreadyExistsException';
  }

}
