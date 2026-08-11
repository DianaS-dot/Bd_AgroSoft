import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ActividadesHerramientasService } from './actividades_herramientas.service';
import { CreateActividadHerramientaDto } from './dto/create-actividad_herramienta.dto';
import { UpdateActividadHerramientaDto } from './dto/update-actividad_herramienta.dto';

@Controller('actividades_herramientas')
export class ActividadesHerramientasController {
  constructor(private readonly herramientasService: ActividadesHerramientasService) {}

  @Post()
  create(@Body() createDto: CreateActividadHerramientaDto) {
    return this.herramientasService.create(createDto);
  }

  @Get()
  findAll() {
    return this.herramientasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.herramientasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateActividadHerramientaDto) {
    return this.herramientasService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.herramientasService.remove(id);
  }
}
