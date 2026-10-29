import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProgramaFormacionUseCase } from '../../../application/use-cases/create-programa-formacion.use-case';
import { GetProgramaFormacionUseCase } from '../../../application/use-cases/get-programa-formacion.use-case';
import { CreateProgramaFormacionDto } from '../dto/create-programa-formacion.dto';

@Controller('programas-formacion')
export class ProgramaFormacionController {
  constructor(
    private readonly createProgramaFormacionUseCase: CreateProgramaFormacionUseCase,
    private readonly getProgramaFormacionUseCase: GetProgramaFormacionUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProgramaFormacionDto) {
    return this.createProgramaFormacionUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.getProgramaFormacionUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getProgramaFormacionUseCase.execute(id);
  }
}