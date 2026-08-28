import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateInsumoUseCase } from '../../../application/use-cases/create-insumo.use-case';
import { GetInsumoUseCase } from '../../../application/use-cases/get-insumo.use-case';
import { UpdateInsumoUseCase } from '../../../application/use-cases/update-insumo.use-case';
import { DeleteInsumoUseCase } from '../../../application/use-cases/delete-insumo.use-case';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';

@Controller('insumos')
export class InsumoController {
  constructor(
    private readonly createInsumoUseCase: CreateInsumoUseCase,
    private readonly getInsumoUseCase: GetInsumoUseCase,
    private readonly updateInsumoUseCase: UpdateInsumoUseCase,
    private readonly deleteInsumoUseCase: DeleteInsumoUseCase,
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

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInsumoDto: UpdateInsumoDto) {
    return this.updateInsumoUseCase.execute(id, updateInsumoDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteInsumoUseCase.execute(id);
  }
}
