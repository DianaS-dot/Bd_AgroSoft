export class PermisoNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermisoNotFoundError';
  }
}
