import { Lote } from "../../domain/entities/lote";
import { LoteRepository } from "../../domain/ports/lote.repository";

export class ObtenerLoteUseCase {

  constructor(
    private readonly loteRepository: LoteRepository,
  ) {}

  async ejecutar(id: number): Promise<Lote | null> {
    return this.loteRepository.obtenerPorId(id);
  }

}