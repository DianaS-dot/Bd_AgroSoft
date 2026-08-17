import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateCategoriaUseCase } from '../../../application/use-cases/create-categoria.use-case';
import { GetCategoriaUseCase } from '../../../application/use-cases/get-categoria.use-case';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriaController {
  constructor(
    private readonly createCategoriaUseCase: CreateCategoriaUseCase,
    private readonly getCategoriaUseCase: GetCategoriaUseCase,
  ) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.createCategoriaUseCase.execute(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.getCategoriaUseCase.executeAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getCategoriaUseCase.execute(id);
  }
}
