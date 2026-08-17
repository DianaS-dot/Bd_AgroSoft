export class Insumo {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly descripcion: string,
    public readonly stockUso: number,
    public readonly unidadUso: string,
    public readonly costoUnitario: number,
    public readonly estado: string, // Basado en insumos_estado_enum
    public readonly categoriaId?: number,
    public readonly almacenId?: number,
    public readonly proveedorId?: number,
    // ... otros campos críticos del negocio
  ) {}

  /**
   * Ejemplo de Regla de Negocio:
   * Un insumo no puede ser creado con stock negativo.
   */
  static create(data: Partial<Insumo>): Insumo {
    if (data.stockUso === undefined || data.stockUso < 0) {
      throw new Error('El stock de uso no puede ser negativo'); // Regla de dominio [1, 3]
    }
    if (!data.nombre || data.nombre.trim().length < 3) {
      throw new Error('El nombre del insumo es obligatorio y debe ser válido');
    }
    if (!data.unidadUso) {
      throw new Error('La unidad de uso es obligatoria');
    }
    if (!data.estado) {
      throw new Error('El estado es obligatorio');
    }
    if (data.costoUnitario === undefined || data.costoUnitario < 0) {
      throw new Error('El costo unitario no puede ser negativo');
    }
    
    return new Insumo(
      data.id ?? 0,
      data.nombre,
      data.descripcion ?? '',
      data.stockUso,
      data.unidadUso,
      data.costoUnitario,
      data.estado,
      data.categoriaId,
      data.almacenId,
      data.proveedorId
    );
  }
}
