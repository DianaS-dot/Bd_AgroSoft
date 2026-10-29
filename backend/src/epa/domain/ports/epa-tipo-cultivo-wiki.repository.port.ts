import { EpaTipoCultivoWiki } from '../entities/epa-tipo-cultivo-wiki.entity';

export interface EpaTipoCultivoWikiRepository {
  save(relacion: EpaTipoCultivoWiki): Promise<EpaTipoCultivoWiki>;
  findAll(): Promise<EpaTipoCultivoWiki[]>;
  findByEpaId(epaId: number): Promise<EpaTipoCultivoWiki[]>;
  findByTipoCultivoWikiId(tipoCultivoWikiId: number): Promise<EpaTipoCultivoWiki[]>;
  deleteByEpaId(epaId: number): Promise<void>;

}

export const EPA_TIPO_CULTIVO_WIKI_REPOSITORY = Symbol('EPA_TIPO_CULTIVO_WIKI_REPOSITORY');