import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ActividadesEvidenciasService } from './actividades_evidencias.service';
import { CreateActividadEvidenciaDto } from './dto/create-actividad_evidencia.dto';
import { UpdateActividadEvidenciaDto } from './dto/update-actividad_evidencia.dto';

@Controller('actividades_evidencias')
export class ActividadesEvidenciasController {
  constructor(private readonly evidenciasService: ActividadesEvidenciasService) {}

  @Post()
  create(@Body() createDto: CreateActividadEvidenciaDto) {
    return this.evidenciasService.create(createDto);
  }

  @Get()
  findAll() {
    return this.evidenciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.evidenciasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateActividadEvidenciaDto) {
    return this.evidenciasService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.evidenciasService.remove(id);
  }
}
