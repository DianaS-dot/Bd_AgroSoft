export class ActividadInsumoReserva {
  constructor(
    readonly id: number | null,

    readonly actividadId: number,
    readonly insumoId: number,

    private _cantidadReservada: number,

    readonly createdAt?: Date,
    readonly updatedAt?: Date,
    readonly deletedAt?: Date,
  ) {
    this.validar();
  }

  get cantidadReservada(): number {
    return this._cantidadReservada;
  }

  private validar(): void {
    if (this.actividadId <= 0) {
      throw new Error('La actividad es obligatoria');
    }

    if (this.insumoId <= 0) {
      throw new Error('El insumo es obligatorio');
    }

    if (this._cantidadReservada <= 0) {
      throw new Error('La cantidad reservada debe ser mayor que cero');
    }
  }
}
