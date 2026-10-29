import { Inject, Injectable } from '@nestjs/common';
import { EpaTipoCultivoWiki } from '../../domain/entities/epa-tipo-cultivo-wiki.entity';
import type { EpaTipoCultivoWikiRepository } from '../../domain/ports/epa-tipo-cultivo-wiki.repository.port';
import { EPA_TIPO_CULTIVO_WIKI_REPOSITORY } from '../../domain/ports/epa-tipo-cultivo-wiki.repository.port';

@Injectable()
export class SyncEpaTipoCultivoWikiUseCase {
  constructor(
    @Inject(EPA_TIPO_CULTIVO_WIKI_REPOSITORY)
    private readonly repo: EpaTipoCultivoWikiRepository,
  ) {}

  async execute(epaId: number, tipoCultivoWikiIds: number[]): Promise<EpaTipoCultivoWiki[]> {
    await this.repo.deleteByEpaId(epaId);
    const creados: EpaTipoCultivoWiki[] = [];
    for (const tipoCultivoWikiId of tipoCultivoWikiIds) {
      const relacion = EpaTipoCultivoWiki.create({ epaId, tipoCultivoWikiId });
      creados.push(await this.repo.save(relacion));
    }
    return creados;
  }
}
