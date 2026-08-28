export class User {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly email: string,
    public readonly password: string, // Contraseña hasheada
    public readonly rolId: number,
    public readonly estado: boolean = true,
    public readonly telefono?: string,
    public readonly cultivoRealId?: number,
  ) {}

  static create(data: Partial<User>): User {
    if (!data.nombre || data.nombre.trim().length < 3) {
      throw new Error('El nombre es obligatorio y debe tener al menos 3 caracteres');
    }
    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('El email es obligatorio y debe ser válido');
    }
    if (!data.password || data.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    if (!data.rolId) {
      throw new Error('El rol es obligatorio');
    }

    return new User(
      data.id ?? 0,
      data.nombre,
      data.email,
      data.password,
      data.rolId,
      data.estado ?? true,
      data.telefono,
      data.cultivoRealId,
    );
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}