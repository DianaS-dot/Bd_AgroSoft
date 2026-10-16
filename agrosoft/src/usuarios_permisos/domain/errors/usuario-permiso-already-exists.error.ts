export class UsuarioPermisoAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UsuarioPermisoAlreadyExistsError';
  }
}
