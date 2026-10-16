export interface AlmacenBackend {
  id: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
  descripcion?: string;
  estado: string;
}

export interface CreateAlmacenDto {
  nombre: string;
  ubicacion: string;
  capacidad: number;
  descripcion?: string;
  estado: string;
}

export interface UpdateAlmacenDto {
  nombre?: string;
  ubicacion?: string;
  capacidad?: number;
  descripcion?: string;
  estado?: string;
}
