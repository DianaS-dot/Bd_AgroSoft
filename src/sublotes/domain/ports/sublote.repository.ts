import { Sublote } from '../entities/sublote';

export interface SubloteRepository {
  crear(sublote: Sublote): Promise<Sublote>;

  obtenerTodos(): Promise<Sublote[]>;

  obtenerPorId(id: number): Promise<Sublote | null>;

  actualizar(sublote: Sublote): Promise<Sublote>;

  eliminar(id: number): Promise<void>;
}
