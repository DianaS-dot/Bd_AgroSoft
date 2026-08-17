export class ActividadInsumoUso {
  constructor(
    readonly id: number | null,

    readonly actividadId: number,
    readonly insumoId: number,

    private _cantidadUsada: number,
    private _costoUnitarioUso: number,
    private _costoTotal: number,

    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly deletedAt?: Date,
  ) {
    this.validar();
  }

  get cantidadUsada(): number {
    return this._cantidadUsada;
  }

  get costoUnitarioUso(): number {
    return this._costoUnitarioUso;
  }

  get costoTotal(): number {
    return this._costoTotal;
  }

  private validar(): void {
    if (this.actividadId <= 0) {
      throw new Error('La actividad es obligatoria');
    }

    if (this.insumoId <= 0) {
      throw new Error('El insumo es obligatorio');
    }

    if (this._cantidadUsada <= 0) {
      throw new Error('La cantidad usada debe ser mayor que cero');
    }

    if (this._costoUnitarioUso < 0) {
      throw new Error('El costo unitario no puede ser negativo');
    }

    if (this._costoTotal < 0) {
      throw new Error('El costo total no puede ser negativo');
    }
  }
}
