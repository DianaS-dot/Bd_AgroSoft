import { SubloteRepository } from '../../domain/ports/sublote.repository';

export class ObtenerSubloteUseCase {
  constructor(private readonly repository: SubloteRepository) {}

  async ejecutar(id: number) {
    return this.repository.obtenerPorId(id);
  }
}
