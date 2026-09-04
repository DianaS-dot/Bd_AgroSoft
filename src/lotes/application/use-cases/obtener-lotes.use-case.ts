import { Lote } from '../../domain/entities/lote';
// import { LoteRepository } from '../../domain/ports/lote.repository'; //
import { LoteRepository } from '../../domain/ports/lote.repository';
// creamos la clase ObtenerLotesUseCase que sera el caso de uso para obtener todos los lotes

export class ObtenerLotesUseCase {
  // creamos el constructor que recibira el repositorio de lote
  constructor(private readonly loteRepository: LoteRepository) {}

  async ejecutar(): Promise<Lote[]> {
    // creamos el metodo ejecutar que retornara una promesa de un arreglo de lotes
    return this.loteRepository.obtenerTodos();
  }
}
