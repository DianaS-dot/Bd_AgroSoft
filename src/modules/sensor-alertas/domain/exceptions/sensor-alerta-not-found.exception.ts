export class SensorAlertaNotFoundException extends Error {
  constructor(id: number) {
    super(`SensorAlerta con id ${id} no encontrada`);
    this.name = 'SensorAlertaNotFoundException';
  }
}
