export class TransaccionFinanciera {
  private constructor(
    public readonly id: number | null,
    public readonly tipo: string,
    public readonly categoria: string,
    public readonly monto: number,
    public readonly descripcion: string | null,
    public readonly fecha: Date,
    public readonly actividadId: number | null,
    public readonly insumoId: number | null,
    public readonly ventaId: number | null,
    public readonly usuarioId: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date | null,
  ) {}

  static create(params: {
    id?: number | null;
    tipo: string;
    categoria: string;
    monto: number;
    descripcion?: string | null;
    fecha: Date;
    actividadId?: number | null;
    insumoId?: number | null;
    ventaId?: number | null;
    usuarioId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): TransaccionFinanciera {
    if (!params.tipo?.trim()) {
      throw new Error('El tipo de transacción financiera es obligatorio');
    }
    if (params.monto === undefined || params.monto === null) {
      throw new Error('El monto de la transacción es obligatorio');
    }
    return new TransaccionFinanciera(
      params.id ?? null,
      params.tipo,
      params.categoria,
      params.monto,
      params.descripcion ?? null,
      params.fecha,
      params.actividadId ?? null,
      params.insumoId ?? null,
      params.ventaId ?? null,
      params.usuarioId,
      params.createdAt,
      params.updatedAt,
      params.deletedAt ?? null,
    );
  }
}