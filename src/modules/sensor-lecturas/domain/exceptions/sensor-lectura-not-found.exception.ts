export class SensorLecturaNotFoundException extends Error {
  constructor(id: number) {
    super(`SensorLectura con id ${id} no encontrada`);
    this.name = 'SensorLecturaNotFoundException';
  }
}
