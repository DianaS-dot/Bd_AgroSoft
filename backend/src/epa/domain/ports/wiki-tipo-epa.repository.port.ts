import { WikiTipoEpa } from '../entities/wiki-tipo-epa.entity';

export interface WikiTipoEpaRepository {
  save(wikiTipoEpa: WikiTipoEpa): Promise<WikiTipoEpa>;
  findAll(): Promise<WikiTipoEpa[]>;
  findById(id: number): Promise<WikiTipoEpa | null>;
}

export const WIKI_TIPO_EPA_REPOSITORY = Symbol('WIKI_TIPO_EPA_REPOSITORY');