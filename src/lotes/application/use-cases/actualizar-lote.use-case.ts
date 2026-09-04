import { Lote } from '../../domain/entities/lote'; // importamos la entidad lote para poder usarla en el caso de uso
import { LoteRepository } from '../../domain/ports/lote.repository'; // importamos el repositorio de lote para poder usarlo en el caso de uso

export class ActualizarLoteUseCase {
  // creamos la clase ActualizarLoteUseCase que sera el caso de uso para actualizar un lote
  constructor(private readonly loteRepository: LoteRepository) {}

  async ejecutar(lote: Lote): Promise<Lote> {
    // creamos el metodo ejecutar que recibira un lote y retornara una promesa de un lote
    return this.loteRepository.actualizar(lote);
  }
}
