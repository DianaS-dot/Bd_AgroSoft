import { Factura } from '../entities/factura.entity';

export const FACTURA_REPOSITORY = Symbol('FACTURA_REPOSITORY');

export interface FacturaRepositoryPort {
  crear(factura: Factura): Promise<Factura>;
  actualizar(id: number, factura: Factura): Promise<Factura>;
  eliminar(id: number): Promise<void>;
  buscarPorId(id: number): Promise<Factura | null>;
  buscarPorVentaId(ventaId: number): Promise<Factura | null>;
  buscarPorNumero(numero: string): Promise<Factura | null>;
  listar(): Promise<Factura[]>;
}