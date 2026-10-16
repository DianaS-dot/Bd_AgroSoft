export interface ProveedorBackend {
  id: number;
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion?: string;
  estado: string;
}

export interface CreateProveedorDto {
  nombre: string;
  contacto: string;
  telefono: string;
  email: string;
  direccion?: string;
  estado: string;
}

export interface UpdateProveedorDto {
  nombre?: string;
  contacto?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  estado?: string;
}
