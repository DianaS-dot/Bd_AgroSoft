export class InvalidUsuarioError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUsuarioError';
  }
}
