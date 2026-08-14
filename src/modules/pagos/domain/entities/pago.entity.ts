import { MetodoPago } from './metodo-pago.enum';

export class Pago {
  constructor(
    public readonly id: number | null,
    public ventaId: number,
    public metodo: MetodoPago,
    public monto: number,
    public moneda: string,
    public referencia: string | null,
    public readonly createdAt?: Date,
  ) {
    if (!ventaId) throw new Error('El pago debe estar asociado a una venta');
    if (monto <= 0) throw new Error('El monto del pago debe ser mayor a cero');
    if (!moneda?.trim()) throw new Error('La moneda del pago es obligatoria');
  }
}