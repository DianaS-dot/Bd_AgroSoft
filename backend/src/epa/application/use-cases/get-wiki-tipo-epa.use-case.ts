import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WikiTipoEpa } from '../../domain/entities/wiki-tipo-epa.entity';
import type { WikiTipoEpaRepository } from '../../domain/ports/wiki-tipo-epa.repository.port';
import { WIKI_TIPO_EPA_REPOSITORY } from '../../domain/ports/wiki-tipo-epa.repository.port';

@Injectable()
export class GetWikiTipoEpaUseCase {
  constructor(
    @Inject(WIKI_TIPO_EPA_REPOSITORY)
    private readonly wikiTipoEpaRepository: WikiTipoEpaRepository,
  ) {}

  async execute(id?: number): Promise<WikiTipoEpa | WikiTipoEpa[]> {
    if (id !== undefined) {
      const wikiTipoEpa = await this.wikiTipoEpaRepository.findById(id);
      if (!wikiTipoEpa) {
        throw new NotFoundException(`wiki_tipo_epa con id ${id} no encontrado`);
      }
      return wikiTipoEpa;
    }
    return this.wikiTipoEpaRepository.findAll();
  }
}