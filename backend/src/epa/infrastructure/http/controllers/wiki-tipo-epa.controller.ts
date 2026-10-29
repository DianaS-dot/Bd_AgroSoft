import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateWikiTipoEpaUseCase } from '../../../application/use-cases/create-wiki-tipo-epa.use-case';
import { GetWikiTipoEpaUseCase } from '../../../application/use-cases/get-wiki-tipo-epa.use-case';
import { CreateWikiTipoEpaDto } from '../dto/create-wiki-tipo-epa.dto';

@Controller('wiki-tipo-epa')
export class WikiTipoEpaController {
  constructor(
    private readonly createWikiTipoEpaUseCase: CreateWikiTipoEpaUseCase,
    private readonly getWikiTipoEpaUseCase: GetWikiTipoEpaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateWikiTipoEpaDto) {
    return this.createWikiTipoEpaUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.getWikiTipoEpaUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getWikiTipoEpaUseCase.execute(id);
  }
}