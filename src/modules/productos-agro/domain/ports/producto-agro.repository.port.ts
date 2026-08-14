import { ProductoAgro } from '../entities/producto-agro.entity';

export const PRODUCTO_AGRO_REPOSITORY = Symbol('PRODUCTO_AGRO_REPOSITORY');

export interface ProductoAgroRepositoryPort {
  crear(producto: ProductoAgro): Promise<ProductoAgro>;
  actualizar(id: number, producto: ProductoAgro): Promise<ProductoAgro>;
  eliminar(id: number): Promise<void>;
  buscarPorId(id: number): Promise<ProductoAgro | null>;
  buscarPorNombre(nombre: string): Promise<ProductoAgro | null>;
  listar(): Promise<ProductoAgro[]>;
}