import { CultivoHistorial } from '../entities/cultivo-historial';

export abstract class CultivoHistorialRepository {
  abstract crear(historial: CultivoHistorial): Promise<CultivoHistorial>;

  abstract obtenerTodos(): Promise<CultivoHistorial[]>;

  abstract obtenerPorId(id: number): Promise<CultivoHistorial | null>;

  abstract actualizar(historial: CultivoHistorial): Promise<CultivoHistorial>;

  abstract eliminar(id: number): Promise<void>;
}
