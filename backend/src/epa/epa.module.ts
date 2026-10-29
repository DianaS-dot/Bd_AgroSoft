import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EpaOrmEntity } from './infrastructure/persistence/epa.orm-entity';
import { WikiTipoEpaOrmEntity } from './infrastructure/persistence/wiki-tipo-epa.orm-entity';
import { TipoCultivoWikiOrmEntity } from './infrastructure/persistence/tipo-cultivo-wiki.orm-entity';
import { EpaTipoCultivoWikiOrmEntity } from './infrastructure/persistence/epa-tipo-cultivo-wiki.orm-entity';

import { EpaTypeOrmRepository } from './infrastructure/persistence/epa-typeorm.repository';
import { WikiTipoEpaTypeOrmRepository } from './infrastructure/persistence/wiki-tipo-epa-typeorm.repository';
import { TipoCultivoWikiTypeOrmRepository } from './infrastructure/persistence/tipo-cultivo-wiki-typeorm.repository';
import { EpaTipoCultivoWikiTypeOrmRepository } from './infrastructure/persistence/epa-tipo-cultivo-wiki-typeorm.repository';

import { EPA_REPOSITORY } from './domain/ports/epa.repository.port';
import { WIKI_TIPO_EPA_REPOSITORY } from './domain/ports/wiki-tipo-epa.repository.port';
import { TIPO_CULTIVO_WIKI_REPOSITORY } from './domain/ports/tipo-cultivo-wiki.repository.port';
import { EPA_TIPO_CULTIVO_WIKI_REPOSITORY } from './domain/ports/epa-tipo-cultivo-wiki.repository.port';

import { CreateEpaUseCase } from './application/use-cases/create-epa.use-case';
import { GetEpaUseCase } from './application/use-cases/get-epa.use-case';
import { CreateWikiTipoEpaUseCase } from './application/use-cases/create-wiki-tipo-epa.use-case';
import { GetWikiTipoEpaUseCase } from './application/use-cases/get-wiki-tipo-epa.use-case';
import { CreateTipoCultivoWikiUseCase } from './application/use-cases/create-tipo-cultivo-wiki.use-case';
import { GetTipoCultivoWikiUseCase } from './application/use-cases/get-tipo-cultivo-wiki.use-case';
import { CreateEpaTipoCultivoWikiUseCase } from './application/use-cases/create-epa-tipo-cultivo-wiki.use-case';
import { GetEpaTipoCultivoWikiUseCase } from './application/use-cases/get-epa-tipo-cultivo-wiki.use-case';

import { EpaController } from './infrastructure/http/controllers/epa.controller';
import { WikiTipoEpaController } from './infrastructure/http/controllers/wiki-tipo-epa.controller';
import { TipoCultivoWikiController } from './infrastructure/http/controllers/tipo-cultivo-wiki.controller';
import { EpaTipoCultivoWikiController } from './infrastructure/http/controllers/epa-tipo-cultivo-wiki.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EpaOrmEntity,
      WikiTipoEpaOrmEntity,
      TipoCultivoWikiOrmEntity,
      EpaTipoCultivoWikiOrmEntity,
    ]),
  ],
  controllers: [
    EpaController,
    WikiTipoEpaController,
    TipoCultivoWikiController,
    EpaTipoCultivoWikiController,
  ],
  providers: [
    CreateEpaUseCase,
    GetEpaUseCase,
    CreateWikiTipoEpaUseCase,
    GetWikiTipoEpaUseCase,
    CreateTipoCultivoWikiUseCase,
    GetTipoCultivoWikiUseCase,
    CreateEpaTipoCultivoWikiUseCase,
    GetEpaTipoCultivoWikiUseCase,
    { provide: EPA_REPOSITORY, useClass: EpaTypeOrmRepository },
    { provide: WIKI_TIPO_EPA_REPOSITORY, useClass: WikiTipoEpaTypeOrmRepository },
    { provide: TIPO_CULTIVO_WIKI_REPOSITORY, useClass: TipoCultivoWikiTypeOrmRepository },
    { provide: EPA_TIPO_CULTIVO_WIKI_REPOSITORY, useClass: EpaTipoCultivoWikiTypeOrmRepository },
  ],
})
export class EpaModule {}