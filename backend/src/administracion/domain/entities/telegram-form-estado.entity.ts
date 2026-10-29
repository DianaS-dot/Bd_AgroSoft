export class TelegramFormEstado {
  private constructor(
    public readonly id: number | null,
    public readonly userId: bigint,
    public readonly step: number,
    public readonly data: Record<string, any> | null,
    public readonly estado: string,
    public readonly accessToken: string | null,
    public readonly updatedAt?: Date,
  ) {}

  static create(params: {
    id?: number | null;
    userId: bigint;
    step: number;
    data?: Record<string, any> | null;
    estado: string;
    accessToken?: string | null;
    updatedAt?: Date;
  }): TelegramFormEstado {
    if (params.userId === undefined || params.userId === null) {
      throw new Error('El id del usuario de Telegram es obligatorio');
    }
    if (!params.estado?.trim()) {
      throw new Error('El estado del formulario es obligatorio');
    }
    return new TelegramFormEstado(
      params.id ?? null,
      params.userId,
      params.step,
      params.data ?? null,
      params.estado,
      params.accessToken ?? null,
      params.updatedAt,
    );
  }
}