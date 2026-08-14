import { Cliente } from '../entities/cliente.entity';

export const CLIENTE_REPOSITORY = Symbol('CLIENTE_REPOSITORY');

export interface ClienteRepositoryPort {
  crear(cliente: Cliente): Promise<Cliente>;
  actualizar(id: number, cliente: Cliente): Promise<Cliente>;
  eliminar(id: number): Promise<void>;
  buscarPorId(id: number): Promise<Cliente | null>;
  buscarPorIdentificacion(identificacion: string): Promise<Cliente | null>;
  listar(): Promise<Cliente[]>;
}