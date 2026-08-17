import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateInsumoUseCase } from '../../../application/use-cases/create-insumo.use-case';
import { GetInsumoUseCase } from '../../../application/use-cases/get-insumo.use-case';
import { CreateInsumoDto } from './dto/create-insumo.dto';

@Controller('insumos')
export class InsumoController {
  constructor(
    private readonly createInsumoUseCase: CreateInsumoUseCase,
    private readonly getInsumoUseCase: GetInsumoUseCase,
  ) {}

  @Post()
  create(@Body() createInsumoDto: CreateInsumoDto) {
    return this.createInsumoUseCase.execute(createInsumoDto);
  }

  @Get()
  findAll() {
    return this.getInsumoUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getInsumoUseCase.execute(id);
  }
}
