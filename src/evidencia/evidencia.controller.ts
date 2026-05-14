import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EvidenciaService } from './evidencia.service';
import { CreateEvidenciaDto } from './dto/create-evidencia.dto';
import { UpdateEvidenciaDto } from './dto/update-evidencia.dto';

@Controller('evidencia')
export class EvidenciaController {
  constructor(private readonly evidenciaService: EvidenciaService) {}

  @Post()
  create(@Body() createEvidenciaDto: CreateEvidenciaDto) {
    return this.evidenciaService.create(createEvidenciaDto);
  }

  @Get()
  findAll() {
    return this.evidenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.evidenciaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEvidenciaDto: UpdateEvidenciaDto) {
    return this.evidenciaService.update(id, updateEvidenciaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.evidenciaService.remove(id);
  }
}