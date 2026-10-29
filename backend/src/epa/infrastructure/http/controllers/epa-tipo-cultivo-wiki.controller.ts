import { Body, Controller, Get, Post, Query, ParseIntPipe } from '@nestjs/common';
import { CreateEpaTipoCultivoWikiUseCase } from '../../../application/use-cases/create-epa-tipo-cultivo-wiki.use-case';
import { GetEpaTipoCultivoWikiUseCase } from '../../../application/use-cases/get-epa-tipo-cultivo-wiki.use-case';
import { CreateEpaTipoCultivoWikiDto } from '../dto/create-epa-tipo-cultivo-wiki.dto';

@Controller('epa-tipos-cultivos-wiki')
export class EpaTipoCultivoWikiController {
  constructor(
    private readonly createEpaTipoCultivoWikiUseCase: CreateEpaTipoCultivoWikiUseCase,
    private readonly getEpaTipoCultivoWikiUseCase: GetEpaTipoCultivoWikiUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateEpaTipoCultivoWikiDto) {
    return this.createEpaTipoCultivoWikiUseCase.execute(dto);
  }

  @Get()
  find(
    @Query('epaId', new ParseIntPipe({ optional: true })) epaId?: number,
    @Query('tipoCultivoWikiId', new ParseIntPipe({ optional: true })) tipoCultivoWikiId?: number,
  ) {
    return this.getEpaTipoCultivoWikiUseCase.execute({ epaId, tipoCultivoWikiId });
  }
}