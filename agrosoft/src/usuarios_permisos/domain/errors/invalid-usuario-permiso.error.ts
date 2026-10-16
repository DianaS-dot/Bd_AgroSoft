export class InvalidUsuarioPermisoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUsuarioPermisoError';
  }
}
