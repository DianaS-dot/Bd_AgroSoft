import { Inject, Injectable } from '@nestjs/common';
import { WikiTipoEpa } from '../../domain/entities/wiki-tipo-epa.entity';
import type { WikiTipoEpaRepository } from '../../domain/ports/wiki-tipo-epa.repository.port';
import { WIKI_TIPO_EPA_REPOSITORY } from '../../domain/ports/wiki-tipo-epa.repository.port';

@Injectable()
export class CreateWikiTipoEpaUseCase {
  constructor(
    @Inject(WIKI_TIPO_EPA_REPOSITORY)
    private readonly wikiTipoEpaRepository: WikiTipoEpaRepository,
  ) {}

  async execute(input: {
    nombre: string;
    descripcion?: string;
    tipoEpaEnum: string;
  }): Promise<WikiTipoEpa> {
    const wikiTipoEpa = WikiTipoEpa.create(input);
    return this.wikiTipoEpaRepository.save(wikiTipoEpa);
  }
}