export class ProductoAgro {
  constructor(
    public readonly id: number | null,
    public nombre: string,
    public unidadBase: string,
    public descripcion: string | null,
    public imagen: string | null,
    public readonly createdAt?: Date,
  ) {
    if (!nombre?.trim()) {
      throw new Error('El nombre del producto agro es obligatorio');
    }
    if (!unidadBase?.trim()) {
      throw new Error('La unidad base es obligatoria');
    }
  }

  actualizar(datos: Partial<Pick<ProductoAgro, 'nombre' | 'unidadBase' | 'descripcion' | 'imagen'>>) {
    Object.assign(this, datos);
  }
}