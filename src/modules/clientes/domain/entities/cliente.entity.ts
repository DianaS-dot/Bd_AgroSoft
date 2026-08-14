export class Cliente {
  constructor(
    public readonly id: number | null,
    public nombre: string,
    public identificacion: string,
    public telefono: string | null,
    public email: string | null,
    public direccion: string | null,
    public notas: string | null,
    public readonly createdAt?: Date,
  ) {
    if (!nombre?.trim()) {
      throw new Error('El nombre del cliente es obligatorio');
    }
    if (!identificacion?.trim()) {
      throw new Error('La identificación del cliente es obligatoria');
    }
  }

  actualizar(datos: Partial<Pick<Cliente, 'nombre' | 'identificacion' | 'telefono' | 'email' | 'direccion' | 'notas'>>) {
    Object.assign(this, datos);
  }
}