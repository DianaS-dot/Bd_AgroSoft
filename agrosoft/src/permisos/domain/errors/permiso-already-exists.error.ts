export class PermisoAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermisoAlreadyExistsError';
  }
}
