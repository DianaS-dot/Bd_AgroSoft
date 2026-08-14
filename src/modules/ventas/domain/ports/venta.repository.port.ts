import { Venta } from '../entities/venta.entity';

export const VENTA_REPOSITORY = Symbol('VENTA_REPOSITORY');

export interface VentaRepositoryPort {
  crear(venta: Venta): Promise<Venta>;
  actualizar(id: number, venta: Venta): Promise<Venta>;
  buscarPorId(id: number): Promise<Venta | null>;
  listar(): Promise<Venta[]>;
  listarPorCliente(clienteId: number): Promise<Venta[]>;
}