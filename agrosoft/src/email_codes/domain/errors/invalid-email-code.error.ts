export class InvalidEmailCodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidEmailCodeError';
  }
}
