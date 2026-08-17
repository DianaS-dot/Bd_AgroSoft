export class MovimientoInsumo {
  constructor(
    readonly id: number | null,

    readonly insumoId: number,

    private _tipo: string,

    private _cantidadPresentacion: number,
    private _cantidadUso: number,

    private _costoUnitarioPresentacion: number,
    private _costoUnitarioUso: number,

    private _costoTotal: number,
    private _valorInventarioResultante: number,

    private _descripcion: string,

    readonly actividadId: number | null,
    readonly usuarioId: number,
    readonly almacenOrigenId: number | null,
    readonly almacenDestinoId: number | null,

    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly deletedAt?: Date,
  ) {
    this.validar();
  }

  get tipo(): string {
    return this._tipo;
  }

  get cantidadPresentacion(): number {
    return this._cantidadPresentacion;
  }

  get cantidadUso(): number {
    return this._cantidadUso;
  }

  get costoUnitarioPresentacion(): number {
    return this._costoUnitarioPresentacion;
  }

  get costoUnitarioUso(): number {
    return this._costoUnitarioUso;
  }

  get costoTotal(): number {
    return this._costoTotal;
  }

  get valorInventarioResultante(): number {
    return this._valorInventarioResultante;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  cambiarDescripcion(descripcion: string): void {
    this._descripcion = descripcion;
  }

  private validar(): void {
    if (!this._tipo.trim()) {
      throw new Error('El tipo de movimiento es obligatorio');
    }

    if (this._cantidadPresentacion < 0) {
      throw new Error('La cantidad en presentación no puede ser negativa');
    }

    if (this._cantidadUso < 0) {
      throw new Error('La cantidad de uso no puede ser negativa');
    }

    if (this._costoTotal < 0) {
      throw new Error('El costo total no puede ser negativo');
    }

    if (this._valorInventarioResultante < 0) {
      throw new Error('El valor del inventario resultante no puede ser negativo');
    }
  }
}
