import { InvalidEmailCodeError } from './invalid-email-code.error';

export class EmailCodeExpiredError extends InvalidEmailCodeError {
  constructor() {
    super('El código ha expirado');
    this.name = 'EmailCodeExpiredError';
  }
}
