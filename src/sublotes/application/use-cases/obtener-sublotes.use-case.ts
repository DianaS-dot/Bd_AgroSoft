import { SubloteRepository } from "../../domain/ports/sublote.repository";

export class ObtenerSublotesUseCase {

    constructor(
        private readonly repository:SubloteRepository,
    ){}

    async ejecutar(){

        return this.repository.obtenerTodos();

    }

}