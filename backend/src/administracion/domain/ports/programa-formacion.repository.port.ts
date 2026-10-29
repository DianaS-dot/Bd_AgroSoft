import { ProgramaFormacion } from '../entities/programa-formacion.entity';

export interface ProgramaFormacionRepository {
  save(programaFormacion: ProgramaFormacion): Promise<ProgramaFormacion>;
  findAll(): Promise<ProgramaFormacion[]>;
  findById(id: number): Promise<ProgramaFormacion | null>;
}

export const PROGRAMA_FORMACION_REPOSITORY = Symbol('PROGRAMA_FORMACION_REPOSITORY');