import { Cultivo } from "../../domain/entities/cultivo";
import { CultivoRepository } from "../../domain/ports/cultivo.repository";

export class ObtenerCultivosUseCase {

  constructor(
    private readonly cultivoRepository: CultivoRepository,
  ) {}

  async ejecutar(): Promise<Cultivo[]> {
    return this.cultivoRepository.obtenerTodos();
  }
}