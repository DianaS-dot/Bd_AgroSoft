import { Categoria } from '../entities/categoria.entity';

/**
 * El Puerto es una INTERFAZ. 
 * Define qué acciones puede hacer el dominio con los datos.
 */
export interface CategoriaRepository {
  save(categoria: Categoria): Promise<Categoria>;
  findAll(): Promise<Categoria[]>;
  findById(id: number): Promise<Categoria | null>;
  update(id: number, categoria: Partial<Categoria>): Promise<Categoria>;
  delete(id: number): Promise<boolean>;
}

/**
 * Token de Inyección para el repositorio de categorias.
 * Se usa en los Casos de Uso y en el Módulo de NestJS.
 */
export const CATEGORIA_REPOSITORY = Symbol('CATEGORIA_REPOSITORY');
