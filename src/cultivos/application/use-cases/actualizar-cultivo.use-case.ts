import { Cultivo } from '../../domain/entities/cultivo';
import { CultivoRepository } from '../../domain/ports/cultivo.repository';

export class ActualizarCultivoUseCase {
  constructor(private readonly cultivoRepository: CultivoRepository) {}

  async ejecutar(cultivo: Cultivo): Promise<Cultivo> {
    return this.cultivoRepository.actualizar(cultivo);
  }
}
