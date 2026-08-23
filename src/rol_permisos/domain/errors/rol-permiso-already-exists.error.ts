export class RolPermisoAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RolPermisoAlreadyExistsError';
  }
}
