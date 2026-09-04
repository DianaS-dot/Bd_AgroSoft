import { Cultivo } from '../entities/cultivo';

export interface CultivoRepository {
  crear(cultivo: Cultivo): Promise<Cultivo>;

  obtenerTodos(): Promise<Cultivo[]>;

  obtenerPorId(id: number): Promise<Cultivo | null>;

  actualizar(cultivo: Cultivo): Promise<Cultivo>;

  eliminar(id: number): Promise<void>;
}

// interface es cualquir clase que quiera ser un cultivorepository debe implementar estos metodos
// metodo crear debe de existir
// obtener todos es decir dame todos los cultivos pero no dice como
// obtener por id lo busca
// actualizar debe modificar el cultivo-eliminar elimina el cultivo
