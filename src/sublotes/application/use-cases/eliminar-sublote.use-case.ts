import { SubloteRepository } from "../../domain/ports/sublote.repository";

export class EliminarSubloteUseCase {

    constructor(
        private readonly repository:SubloteRepository,
    ){}

    async ejecutar(id:number){

        return this.repository.eliminar(id);

    }

}