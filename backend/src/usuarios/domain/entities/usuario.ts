export interface UsuarioProps {
  id: number;
  nombre: string;
  apellido: string;
  identificacion: string;
  idFicha: string;
  programaFormacionId: number;
  telefono: string;
  correo: string;
  passwordHash: string;
  emailVerifiedAt: Date | null;
  estado: string;
  lastLoginAt: Date | null;
  avatarUrl: string | null;
  rolId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Usuario {
  constructor(
    public readonly props: UsuarioProps,
  ) {}
}