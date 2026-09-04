import { Lote } from '../entities/lote';

export interface LoteRepository {
  crear(lote: Lote): Promise<Lote>; // crear un nuevo lote

  obtenerTodos(): Promise<Lote[]>; // obtener todos los lotes

  obtenerPorId(id: number): Promise<Lote | null>; // obtener un lote por su id

  actualizar(lote: Lote): Promise<Lote>; // actualizar un lote existente

  eliminar(id: number): Promise<void>; // eliminar un lote por su id
}

//# sourceMappingURL=lote.repository.js.map
