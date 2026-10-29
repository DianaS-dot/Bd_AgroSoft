import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateEpaUseCase } from '../../../application/use-cases/create-epa.use-case';
import { GetEpaUseCase } from '../../../application/use-cases/get-epa.use-case';
import { CreateEpaDto } from '../dto/create-epa.dto';

@Controller('epas')
export class EpaController {
  constructor(
    private readonly createEpaUseCase: CreateEpaUseCase,
    private readonly getEpaUseCase: GetEpaUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateEpaDto) {
    return this.createEpaUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.getEpaUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getEpaUseCase.execute(id);
  }
}