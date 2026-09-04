export class TipoSensorNotFoundException extends Error {
  constructor(id: number) {
    super(`TipoSensor con id ${id} no encontrado`);
    this.name = 'TipoSensorNotFoundException';
  }
}
