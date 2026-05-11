import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.evidenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvidenciaDto: UpdateEvidenciaDto) {
    return this.evidenciaService.update(+id, updateEvidenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evidenciaService.remove(+id);
  }
}
