import { Cultivo } from '../../domain/entities/cultivo';
import { CultivoRepository } from '../../domain/ports/cultivo.repository';

export class CrearCultivoUseCase {
  constructor(private readonly cultivoRepository: CultivoRepository) {}

  async ejecutar(cultivo: Cultivo): Promise<Cultivo> {
    return await this.cultivoRepository.crear(cultivo);
  }
}

// Aquí NO estamos creando un PostgreSQLRepository
// Estamos diciendo:
// "Necesito cualquier objeto que cumpla el contrato CultivoRepository."
// Eso significa que el caso de uso es independiente de la base de datos.
