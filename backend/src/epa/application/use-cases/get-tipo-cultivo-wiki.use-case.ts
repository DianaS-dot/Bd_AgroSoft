import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TipoCultivoWiki } from '../../domain/entities/tipo-cultivo-wiki.entity';
import type { TipoCultivoWikiRepository } from '../../domain/ports/tipo-cultivo-wiki.repository.port';
import { TIPO_CULTIVO_WIKI_REPOSITORY } from '../../domain/ports/tipo-cultivo-wiki.repository.port';

@Injectable()
export class GetTipoCultivoWikiUseCase {
  constructor(
    @Inject(TIPO_CULTIVO_WIKI_REPOSITORY)
    private readonly tipoCultivoWikiRepository: TipoCultivoWikiRepository,
  ) {}

  async execute(id?: number): Promise<TipoCultivoWiki | TipoCultivoWiki[]> {
    if (id !== undefined) {
      const tipo = await this.tipoCultivoWikiRepository.findById(id);
      if (!tipo) {
        throw new NotFoundException(`Tipo de cultivo (wiki) con id ${id} no encontrado`);
      }
      return tipo;
    }
    return this.tipoCultivoWikiRepository.findAll();
  }
}