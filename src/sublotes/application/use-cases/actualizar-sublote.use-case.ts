import { Sublote } from "../../domain/entities/sublote";
import { SubloteRepository } from "../../domain/ports/sublote.repository";

export class ActualizarSubloteUseCase {

    constructor(
        private readonly repository:SubloteRepository,
    ){}

    async ejecutar(sublote:Sublote){

        return this.repository.actualizar(sublote);

    }

}