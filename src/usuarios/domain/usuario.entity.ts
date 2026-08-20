import { InvalidUsuarioError } from './errors/invalid-usuario.error';

export type Estado = 'ACTIVO' | 'INACTIVO' | 'BLOQUEADO';

export interface CreateUsuarioInput {
  nombre: string;
  apellido: string;
  identificacion: string;
  idFicha?: string;
  programaFormacionId: number;
  telefono?: string | null;
  correo: string;
  passwordHash: string;
  rolId: number;
  estado?: Estado;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDENTIFICACION_REGEX = /^\d{6,15}$/;
const PASSWORD_MIN_LENGTH = 8;

export class Usuario {
  constructor(
    public readonly id: number | null,
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly identificacion: string,
    public readonly idFicha: string | null,
    public readonly programaFormacionId: number,
    public telefono: string | null,
    public readonly correo: string,
    public passwordHash: string,
    public emailVerifiedAt: Date | null,
    public estado: Estado,
    public lastLoginAt: Date | null,
    public avatarUrl: string | null,
    public readonly rolId: number,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
  ) {}

  /**
   * Reglas de negocio:
   * - nombre y apellido obligatorios con al menos 3 caracteres.
   * - identificación numérica de 6 a 15 dígitos.
   * - correo con formato válido.
   * - contraseña con al menos 8 caracteres.
   * - programa de formación y rol con IDs válidos.
   */
  static create(input: CreateUsuarioInput): Usuario {
    const nombre = input.nombre?.trim();
    if (!nombre || nombre.length < 3) {
      throw new InvalidUsuarioError(
        'El nombre del usuario es obligatorio y debe tener al menos 3 caracteres',
      );
    }

    const apellido = input.apellido?.trim();
    if (!apellido || apellido.length < 3) {
      throw new InvalidUsuarioError(
        'El apellido del usuario es obligatorio y debe tener al menos 3 caracteres',
      );
    }

    const identificacion = input.identificacion?.trim();
    if (!identificacion || !IDENTIFICACION_REGEX.test(identificacion)) {
      throw new InvalidUsuarioError(
        'La identificación es obligatoria y debe contener entre 6 y 15 dígitos',
      );
    }

    const correo = input.correo?.trim();
    if (!correo || !EMAIL_REGEX.test(correo)) {
      throw new InvalidUsuarioError('El correo electrónico no es válido');
    }

    if (
      !Number.isInteger(input.programaFormacionId) ||
      input.programaFormacionId <= 0
    ) {
      throw new InvalidUsuarioError(
        'El programa de formación es obligatorio y debe tener un ID válido',
      );
    }

    if (!Number.isInteger(input.rolId) || input.rolId <= 0) {
      throw new InvalidUsuarioError(
        'El rol es obligatorio y debe tener un ID válido',
      );
    }

    const passwordHash = input.passwordHash?.trim();
    if (!passwordHash || passwordHash.length < PASSWORD_MIN_LENGTH) {
      throw new InvalidUsuarioError(
        `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
      );
    }

    const now = new Date();

    return new Usuario(
      null,
      nombre,
      apellido,
      identificacion,
      input.idFicha?.trim() || null,
      input.programaFormacionId,
      input.telefono?.trim() || null,
      correo,
      passwordHash,
      null,
      input.estado ?? 'ACTIVO',
      null,
      null,
      input.rolId,
      now,
      now,
      null,
    );
  }

  verificarEmail(): void {
    if (this.emailVerifiedAt) {
      throw new InvalidUsuarioError('El correo ya fue verificado');
    }
    this.emailVerifiedAt = new Date();
    this.updatedAt = new Date();
  }

  cambiarPassword(nuevoPasswordHash: string): void {
    const hash = nuevoPasswordHash?.trim();
    if (!hash || hash.length < PASSWORD_MIN_LENGTH) {
      throw new InvalidUsuarioError(
        `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
      );
    }
    this.passwordHash = hash;
    this.updatedAt = new Date();
  }

  registrarLogin(): void {
    this.lastLoginAt = new Date();
    this.updatedAt = new Date();
  }

  cambiarEstado(estado: Estado): void {
    this.estado = estado;
    this.updatedAt = new Date();
  }

  eliminar(): void {
    if (this.deletedAt) {
      throw new InvalidUsuarioError('El usuario ya fue eliminado');
    }
    this.deletedAt = new Date();
    this.updatedAt = new Date();
  }
}
