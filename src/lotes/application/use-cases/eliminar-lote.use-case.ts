import { LoteRepository } from '../../domain/ports/lote.repository';

export class EliminarLoteUseCase {
  // creamos el constructor que recibira el repositorio de lote
  constructor(private readonly loteRepository: LoteRepository) {}

  async ejecutar(id: number): Promise<void> {
    // creamos el metodo ejecutar que recibira un id y retornara una promesa de void
    return this.loteRepository.eliminar(id);
  }
}
