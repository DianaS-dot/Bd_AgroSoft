import { Lote } from "../entities/lote";

export interface LoteRepository {

  crear(lote: Lote): Promise<Lote>;

  obtenerTodos(): Promise<Lote[]>;

  obtenerPorId(id:number): Promise<Lote | null>;

  actualizar(lote:Lote): Promise<Lote>;

  eliminar(id:number): Promise<void>;

}