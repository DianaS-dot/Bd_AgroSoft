import { TipoCultivoWiki } from '../entities/tipo-cultivo-wiki.entity';

export interface TipoCultivoWikiRepository {
  save(tipoCultivoWiki: TipoCultivoWiki): Promise<TipoCultivoWiki>;
  findAll(): Promise<TipoCultivoWiki[]>;
  findById(id: number): Promise<TipoCultivoWiki | null>;
}

export const TIPO_CULTIVO_WIKI_REPOSITORY = Symbol('TIPO_CULTIVO_WIKI_REPOSITORY');