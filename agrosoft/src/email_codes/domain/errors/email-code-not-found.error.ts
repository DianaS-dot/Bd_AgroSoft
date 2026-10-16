export class EmailCodeNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailCodeNotFoundError';
  }
}
