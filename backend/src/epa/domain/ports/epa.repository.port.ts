import { Epa } from '../entities/epa.entity';

export interface EpaRepository {
  save(epa: Epa): Promise<Epa>;
  findAll(): Promise<Epa[]>;
  findById(id: number): Promise<Epa | null>;
  update(id: number, data: Partial<{
    nombre: string;
    tipoEpa: string;
    descripcion: string | null;
    sintomas: string | null;
    manejoYControl: string | null;
    mesesProbables: number[];
    temporadas: string[];
    notasEstacionalidad: string | null;
    fotosSintomas: string[];
    fotosGenerales: string[];
    tags: string[];
    creadoPorUsuarioId: number;
  }>): Promise<Epa | null>;
  softDelete(id: number): Promise<void>;
}

export const EPA_REPOSITORY = Symbol('EPA_REPOSITORY');
