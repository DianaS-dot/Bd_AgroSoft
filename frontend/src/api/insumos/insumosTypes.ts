export interface InsumoBackend {
  id: number;
  nombre: string;
  descripcion: string;
  stockUso: number;
  unidadUso: string;
  costoUnitario: number;
  estado: string;
  categoriaId?: number;
  almacenId?: number;
  proveedorId?: number;
}

export interface CreateInsumoDto {
  nombre: string;
  descripcion?: string;
  stockUso: number;
  unidadUso: string;
  costoUnitario: number;
  estado: string;
  categoriaId?: number;
  almacenId?: number;
  proveedorId?: number;
}

export interface UpdateInsumoDto {
  nombre?: string;
  descripcion?: string;
  stockUso?: number;
  unidadUso?: string;
  costoUnitario?: number;
  estado?: string;
  categoriaId?: number;
  almacenId?: number;
  proveedorId?: number;
}
