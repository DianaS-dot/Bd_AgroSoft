export class SensorNotFoundException extends Error {

  constructor(id: number) {
    super(`Sensor con id ${id} no encontrado`);
    this.name = 'SensorNotFoundException';
  }

}
