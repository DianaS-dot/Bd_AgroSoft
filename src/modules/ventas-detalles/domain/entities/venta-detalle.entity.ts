export class VentaDetalle {
  constructor(
    public readonly id: number | null,
    public ventaId: number,
    public productoAgroId: number,
    public loteProduccionId: number,
    public cultivoId: number,
    public cantidadKg: number,
    public precioUnitarioKg: number,
    public precioTotal: number,
    public costoUnitarioKg: number,
    public costoTotal: number,
    public readonly createdAt?: Date,
  ) {
    if (!ventaId) throw new Error('El detalle debe estar asociado a una venta');
    if (!productoAgroId) throw new Error('El detalle debe estar asociado a un producto agro');
    if (!loteProduccionId) throw new Error('El detalle debe estar asociado a un lote de producción');
    if (cantidadKg <= 0) throw new Error('La cantidad vendida debe ser mayor a cero');
    if (precioUnitarioKg < 0) throw new Error('El precio unitario no puede ser negativo');
  }

  static calcular(datos: {
    ventaId: number;
    productoAgroId: number;
    loteProduccionId: number;
    cultivoId: number;
    cantidadKg: number;
    precioUnitarioKg: number;
    costoUnitarioKg: number;
  }): VentaDetalle {
    const precioTotal = datos.cantidadKg * datos.precioUnitarioKg;
    const costoTotal = datos.cantidadKg * datos.costoUnitarioKg;
    return new VentaDetalle(
      null,
      datos.ventaId,
      datos.productoAgroId,
      datos.loteProduccionId,
      datos.cultivoId,
      datos.cantidadKg,
      datos.precioUnitarioKg,
      precioTotal,
      datos.costoUnitarioKg,
      costoTotal,
    );
  }
}