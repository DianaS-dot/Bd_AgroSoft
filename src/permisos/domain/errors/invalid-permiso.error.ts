export class InvalidPermisoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPermisoError';
  }
}
