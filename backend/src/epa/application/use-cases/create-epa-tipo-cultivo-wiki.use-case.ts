import { Inject, Injectable } from '@nestjs/common';
import { EpaTipoCultivoWiki } from '../../domain/entities/epa-tipo-cultivo-wiki.entity';
import type { EpaTipoCultivoWikiRepository } from '../../domain/ports/epa-tipo-cultivo-wiki.repository.port';
import { EPA_TIPO_CULTIVO_WIKI_REPOSITORY } from '../../domain/ports/epa-tipo-cultivo-wiki.repository.port';

@Injectable()
export class CreateEpaTipoCultivoWikiUseCase {
  constructor(
    @Inject(EPA_TIPO_CULTIVO_WIKI_REPOSITORY)
    private readonly epaTipoCultivoWikiRepository: EpaTipoCultivoWikiRepository,
  ) {}

  async execute(input: { epaId: number; tipoCultivoWikiId: number }): Promise<EpaTipoCultivoWiki> {
    const relacion = EpaTipoCultivoWiki.create(input);
    return this.epaTipoCultivoWikiRepository.save(relacion);
  }
}