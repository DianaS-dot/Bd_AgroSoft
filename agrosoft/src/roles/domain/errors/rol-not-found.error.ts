export class RolNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RolNotFoundError';
  }
}
