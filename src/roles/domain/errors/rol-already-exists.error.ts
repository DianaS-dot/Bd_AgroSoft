export class RolAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RolAlreadyExistsError';
  }
}
