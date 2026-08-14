export class LoteProduccion {
  constructor(
    public readonly id: number | null,
    public productoAgroId: number,
    public cultivoId: number,
    public loteId: number,
    public subLoteId: number | null,
    public actividadCosechaId: number | null,
    public calidad: string | null,
    public cantidadKg: number,
    public stockDisponibleKg: number,
    public costoUnitarioKg: number,
    public costoTotal: number,
    public precioSugeridoKg: number | null,
    public readonly createdAt?: Date,
  ) {
    if (!productoAgroId) throw new Error('El lote de producción requiere un producto agro');
    if (!cultivoId) throw new Error('El lote de producción requiere un cultivo');
    if (!loteId) throw new Error('El lote de producción requiere un lote');
    if (cantidadKg <= 0) throw new Error('La cantidad producida debe ser mayor a cero');
    if (stockDisponibleKg < 0) throw new Error('El stock disponible no puede ser negativo');
    if (stockDisponibleKg > cantidadKg) {
      throw new Error('El stock disponible no puede superar la cantidad producida');
    }
  }

  /** Descuenta stock cuando se vende o se registra una salida. Lanza error si no hay suficiente. */
  descontarStock(cantidad: number) {
    if (cantidad <= 0) throw new Error('La cantidad a descontar debe ser mayor a cero');
    if (cantidad > this.stockDisponibleKg) {
      throw new Error(
        `Stock insuficiente en el lote de producción. Disponible: ${this.stockDisponibleKg}kg, solicitado: ${cantidad}kg`,
      );
    }
    this.stockDisponibleKg -= cantidad;
  }

  /** Repone stock, por ejemplo al anular una venta. No puede superar cantidadKg. */
  incrementarStock(cantidad: number) {
    if (cantidad <= 0) throw new Error('La cantidad a incrementar debe ser mayor a cero');
    const nuevoStock = this.stockDisponibleKg + cantidad;
    if (nuevoStock > this.cantidadKg) {
      throw new Error('El stock resultante no puede superar la cantidad total producida');
    }
    this.stockDisponibleKg = nuevoStock;
  }

  actualizar(datos: Partial<Pick<LoteProduccion, 'calidad' | 'costoUnitarioKg' | 'costoTotal' | 'precioSugeridoKg'>>) {
    Object.assign(this, datos);
  }
}