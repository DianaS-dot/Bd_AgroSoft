export class Notificacion {
  private constructor(
    public readonly id: number | null,
    public readonly titulo: string,
    public readonly mensaje: string,
    public readonly leida: boolean,
    public readonly tipo: string,
    public readonly metadata: Record<string, any> | null,
    public readonly usuarioId: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly deletedAt?: Date | null,
  ) {}

  static create(params: {
    id?: number | null;
    titulo: string;
    mensaje: string;
    leida?: boolean;
    tipo: string;
    metadata?: Record<string, any> | null;
    usuarioId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): Notificacion {
    if (!params.titulo?.trim()) {
      throw new Error('El título de la notificación es obligatorio');
    }
    if (!params.mensaje?.trim()) {
      throw new Error('El mensaje de la notificación es obligatorio');
    }
    return new Notificacion(
      params.id ?? null,
      params.titulo,
      params.mensaje,
      params.leida ?? false,
      params.tipo,
      params.metadata ?? null,
      params.usuarioId,
      params.createdAt,
      params.updatedAt,
      params.deletedAt ?? null,
    );
  }
}