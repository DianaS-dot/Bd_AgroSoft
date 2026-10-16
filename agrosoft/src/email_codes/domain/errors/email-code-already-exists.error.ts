export class EmailCodeAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailCodeAlreadyExistsError';
  }
}
