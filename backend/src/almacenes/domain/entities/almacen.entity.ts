export class Almacen {
  constructor(
    readonly id: number | null,

    private _nombre: string,
    private _descripcion: string,
    private _ubicacion: string,

    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly deletedAt?: Date,
  ) {
    this.validar();
  }

  get nombre(): string {
    return this._nombre;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  get ubicacion(): string {
    return this._ubicacion;
  }

  cambiarNombre(nombre: string): void {
    this._nombre = nombre;
    this.validar();
  }

  cambiarDescripcion(descripcion: string): void {
    this._descripcion = descripcion;
  }

  cambiarUbicacion(ubicacion: string): void {
    this._ubicacion = ubicacion;
    this.validar();
  }

  private validar(): void {
    if (!this._nombre.trim()) {
      throw new Error('El nombre del almacén es obligatorio');
    }

    if (!this._ubicacion.trim()) {
      throw new Error('La ubicación del almacén es obligatoria');
    }
  }
}
