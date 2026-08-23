export class InvalidRolError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRolError';
  }
}
