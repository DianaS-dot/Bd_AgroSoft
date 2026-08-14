import { Lote } from "../../domain/entities/lote";
import { LoteRepository } from "../../domain/ports/lote.repository";

export class ObtenerLotesUseCase {

  constructor(
    private readonly loteRepository: LoteRepository,
  ) {}

  async ejecutar(): Promise<Lote[]> {
    return this.loteRepository.obtenerTodos();
  }

}