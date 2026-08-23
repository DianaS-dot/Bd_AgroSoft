export class RolPermisoNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RolPermisoNotFoundError';
  }
}
