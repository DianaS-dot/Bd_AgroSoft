import { EstadoVenta } from './estado-venta.enum';

export class Venta {
  constructor(
    public readonly id: number | null,
    public clienteId: number,
    public fecha: Date,
    public subtotal: number,
    public impuestos: number,
    public descuento: number,
    public total: number,
    public estado: EstadoVenta,
    public usuarioId: number,
    public anuladaPorUsuarioId: number | null,
    public fechaAnulacion: Date | null,
    public readonly createdAt?: Date,
  ) {
    if (!clienteId) throw new Error('La venta debe estar asociada a un cliente');
    if (!usuarioId) throw new Error('La venta debe registrar el usuario que la crea');
    if (subtotal < 0 || impuestos < 0 || descuento < 0) {
      throw new Error('Los valores monetarios de la venta no pueden ser negativos');
    }
  }

  /** Recalcula el total a partir de subtotal, impuestos y descuento. Se usa cuando cambian los detalles. */
  recalcularTotales(subtotal: number, impuestos: number, descuento: number) {
    if (this.estado === EstadoVenta.ANULADA) {
      throw new Error('No se pueden modificar los totales de una venta anulada');
    }
    if (subtotal < 0 || impuestos < 0 || descuento < 0) {
      throw new Error('Los valores monetarios de la venta no pueden ser negativos');
    }
    this.subtotal = subtotal;
    this.impuestos = impuestos;
    this.descuento = descuento;
    this.total = subtotal + impuestos - descuento;
  }

  anular(usuarioId: number) {
    if (this.estado === EstadoVenta.ANULADA) {
      throw new Error('La venta ya se encuentra anulada');
    }
    if (!usuarioId) {
      throw new Error('Se requiere el usuario que anula la venta');
    }
    this.estado = EstadoVenta.ANULADA;
    this.anuladaPorUsuarioId = usuarioId;
    this.fechaAnulacion = new Date();
  }

  estaActiva(): boolean {
    return this.estado === EstadoVenta.ACTIVA;
  }
}