export class ActividadNoEncontradaError extends Error {
  constructor(id: string) {
    super(`La actividad con ID "${id}" no fue encontrada.`);
    this.name = 'ActividadNoEncontradaError';
  }
}
