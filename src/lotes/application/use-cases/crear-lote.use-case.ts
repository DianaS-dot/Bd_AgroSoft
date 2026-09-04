import { Lote } from '../../domain/entities/lote';
import { LoteRepository } from '../../domain/ports/lote.repository';

export class CrearLoteUseCase {
  constructor(private readonly loteRepository: LoteRepository) {}

  async ejecutar(lote: Lote): Promise<Lote> {
    return this.loteRepository.crear(lote);
  }
}
