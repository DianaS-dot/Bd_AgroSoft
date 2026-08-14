import { Lote } from "../../domain/entities/lote";
import { LoteRepository } from "../../domain/ports/lote.repository";

export class ActualizarLoteUseCase {

  constructor(
    private readonly loteRepository: LoteRepository,
  ) {}

  async ejecutar(lote: Lote): Promise<Lote> {
    return this.loteRepository.actualizar(lote);
  }

}