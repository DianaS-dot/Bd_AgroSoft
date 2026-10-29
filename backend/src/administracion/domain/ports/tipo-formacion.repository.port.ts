import { TipoFormacion } from '../entities/tipo-formacion.entity';

export interface TipoFormacionRepository {
  save(tipoFormacion: TipoFormacion): Promise<TipoFormacion>;
  findAll(): Promise<TipoFormacion[]>;
  findById(id: number): Promise<TipoFormacion | null>;
}

export const TIPO_FORMACION_REPOSITORY = Symbol('TIPO_FORMACION_REPOSITORY');