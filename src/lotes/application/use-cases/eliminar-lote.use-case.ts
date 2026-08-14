import { LoteRepository } from "../../domain/ports/lote.repository";

export class EliminarLoteUseCase {

  constructor(
    private readonly loteRepository: LoteRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {
    return this.loteRepository.eliminar(id);
  }

}