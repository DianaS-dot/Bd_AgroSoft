import { Cultivo } from "../../domain/entities/cultivo";
import { CultivoRepository } from "../../domain/ports/cultivo.repository";

export class ObtenerCultivoUseCase {

  constructor(
    private readonly cultivoRepository: CultivoRepository,
  ) {}

  async ejecutar(id:number): Promise<Cultivo | null> {
    return this.cultivoRepository.obtenerPorId(id);
  }
}