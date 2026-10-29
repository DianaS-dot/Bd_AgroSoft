import { Inject, Injectable } from '@nestjs/common';
import { EpaTipoCultivoWiki } from '../../domain/entities/epa-tipo-cultivo-wiki.entity';
import type { EpaTipoCultivoWikiRepository } from '../../domain/ports/epa-tipo-cultivo-wiki.repository.port';
import { EPA_TIPO_CULTIVO_WIKI_REPOSITORY } from '../../domain/ports/epa-tipo-cultivo-wiki.repository.port';

@Injectable()
export class GetEpaTipoCultivoWikiUseCase {
  constructor(
    @Inject(EPA_TIPO_CULTIVO_WIKI_REPOSITORY)
    private readonly epaTipoCultivoWikiRepository: EpaTipoCultivoWikiRepository,
  ) {}

  async execute(params: { epaId?: number; tipoCultivoWikiId?: number }): Promise<EpaTipoCultivoWiki[]> {
    if (params.epaId !== undefined) {
      return this.epaTipoCultivoWikiRepository.findByEpaId(params.epaId);
    }
    if (params.tipoCultivoWikiId !== undefined) {
      return this.epaTipoCultivoWikiRepository.findByTipoCultivoWikiId(params.tipoCultivoWikiId);
    }
    return this.epaTipoCultivoWikiRepository.findAll();
  }
}