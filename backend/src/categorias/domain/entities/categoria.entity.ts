export class Categoria {
  constructor(
    readonly id: number | null,

    private _nombre: string,
    private _descripcion: string,
    private _tipoInsumo: string,

    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly deletedAt?: Date,
  ) {
    this.validar();
  }

  get nombre() {
    return this._nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  get tipoInsumo() {
    return this._tipoInsumo;
  }

  cambiarNombre(nombre: string) {
    this._nombre = nombre;
    this.validar();
  }

  cambiarDescripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  cambiarTipoInsumo(tipo: string) {
    this._tipoInsumo = tipo;
    this.validar();
  }

  private validar() {
    if (!this._nombre.trim()) {
      throw new Error('El nombre es obligatorio');
    }

    if (!this._tipoInsumo.trim()) {
      throw new Error('Debe especificar el tipo de insumo');
    }
  }
}
