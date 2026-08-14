export class Factura {
  constructor(
    public readonly id: number | null,
    public ventaId: number,
    public numero: string,
    public prefijo: string | null,
    public fechaEmision: Date,
    public vencimiento: Date | null,
    public qrUrl: string | null,
    public pdfUrl: string | null,
    public readonly createdAt?: Date,
  ) {
    if (!ventaId) {
      throw new Error('La factura debe estar asociada a una venta');
    }
    if (!numero?.trim()) {
      throw new Error('El número de factura es obligatorio');
    }
  }

  asignarArchivos(qrUrl: string | null, pdfUrl: string | null) {
    this.qrUrl = qrUrl;
    this.pdfUrl = pdfUrl;
  }
}