export class Proveedor {
  constructor(
    readonly id: number | null,

    private _nombre: string,

    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly deletedAt?: Date,
  ) {
    this.validar();
  }

  get nombre(): string {
    return this._nombre;
  }

  cambiarNombre(nombre: string): void {
    this._nombre = nombre;
    this.validar();
  }

  private validar(): void {
    if (!this._nombre.trim()) {
      throw new Error('El nombre del proveedor es obligatorio');
    }
  }
}
