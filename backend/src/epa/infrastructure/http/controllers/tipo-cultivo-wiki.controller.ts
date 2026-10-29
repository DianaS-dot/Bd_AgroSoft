import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateTipoCultivoWikiUseCase } from '../../../application/use-cases/create-tipo-cultivo-wiki.use-case';
import { GetTipoCultivoWikiUseCase } from '../../../application/use-cases/get-tipo-cultivo-wiki.use-case';
import { CreateTipoCultivoWikiDto } from '../dto/create-tipo-cultivo-wiki.dto';

@Controller('tipos-cultivos-wiki')
export class TipoCultivoWikiController {
  constructor(
    private readonly createTipoCultivoWikiUseCase: CreateTipoCultivoWikiUseCase,
    private readonly getTipoCultivoWikiUseCase: GetTipoCultivoWikiUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTipoCultivoWikiDto) {
    return this.createTipoCultivoWikiUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.getTipoCultivoWikiUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getTipoCultivoWikiUseCase.execute(id);
  }
}