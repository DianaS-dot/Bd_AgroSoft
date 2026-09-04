import { CultivoRepository } from '../../domain/ports/cultivo.repository';

export class EliminarCultivoUseCase {
  constructor(private readonly cultivoRepository: CultivoRepository) {}

  async ejecutar(id: number): Promise<void> {
    return this.cultivoRepository.eliminar(id);
  }
}
