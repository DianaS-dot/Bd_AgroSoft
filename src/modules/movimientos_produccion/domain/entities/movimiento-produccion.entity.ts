import { TipoMovimiento } from './tipo-movimiento.enum';

export class MovimientoProduccion {
  constructor(
    public readonly id: number | null,
    public loteProduccionId: number,
    public tipo: TipoMovimiento,
    public cantidadKg: number,
    public costoUnitarioKg: number,
    public costoTotal: number,
    public ventaId: number | null,
    public descripcion: string | null,
    public usuarioId: number,
    public fecha: Date,
    public readonly createdAt?: Date,
  ) {
    if (!loteProduccionId) throw new Error('El movimiento debe estar asociado a un lote de producción');
    if (cantidadKg <= 0) throw new Error('La cantidad del movimiento debe ser mayor a cero');
    if (!usuarioId) throw new Error('El movimiento debe registrar el usuario que lo genera');

    const requiereVenta = tipo === TipoMovimiento.SALIDA_VENTA || tipo === TipoMovimiento.ENTRADA_ANULACION;
    if (requiereVenta && !ventaId) {
      throw new Error('Los movimientos de venta o anulación deben referenciar una venta');
    }
  }

  esSalida(): boolean {
    return this.tipo === TipoMovimiento.SALIDA_VENTA || this.tipo === TipoMovimiento.AJUSTE_MANUAL_SALIDA;
  }

  esEntrada(): boolean {
    return !this.esSalida();
  }
}