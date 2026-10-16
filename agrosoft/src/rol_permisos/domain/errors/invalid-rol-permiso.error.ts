export class InvalidRolPermisoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRolPermisoError';
  }
}
