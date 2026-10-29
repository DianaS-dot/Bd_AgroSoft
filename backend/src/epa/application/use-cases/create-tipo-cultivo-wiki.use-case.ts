import { Inject, Injectable } from '@nestjs/common';
import { TipoCultivoWiki } from '../../domain/entities/tipo-cultivo-wiki.entity';
import type { TipoCultivoWikiRepository } from '../../domain/ports/tipo-cultivo-wiki.repository.port';
import { TIPO_CULTIVO_WIKI_REPOSITORY } from '../../domain/ports/tipo-cultivo-wiki.repository.port';

@Injectable()
export class CreateTipoCultivoWikiUseCase {
  constructor(
    @Inject(TIPO_CULTIVO_WIKI_REPOSITORY)
    private readonly tipoCultivoWikiRepository: TipoCultivoWikiRepository,
  ) {}

  async execute(input: { nombre: string; descripcion?: string }): Promise<TipoCultivoWiki> {
    const tipoCultivoWiki = TipoCultivoWiki.create(input);
    return this.tipoCultivoWikiRepository.save(tipoCultivoWiki);
  }
}