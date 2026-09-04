export class CultivoHistorial {
  id?: number;

  cultivoId!: number;
  usuarioId!: number;

  motivo!: string;
  cambios!: string;

  constructor(data: Partial<CultivoHistorial>) {
    Object.assign(this, data);
  }
}
