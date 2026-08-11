import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ActividadesResponsablesService } from './actividades_responsables.service';
import { CreateActividadResponsableDto } from './dto/create-actividad_responsable.dto';
import { UpdateActividadResponsableDto } from './dto/update-actividad_responsable.dto';

@Controller('actividades_responsables')
export class ActividadesResponsablesController {
  constructor(private readonly responsablesService: ActividadesResponsablesService) {}

  @Post()
  create(@Body() createDto: CreateActividadResponsableDto) {
    return this.responsablesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.responsablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.responsablesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateActividadResponsableDto) {
    return this.responsablesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.responsablesService.remove(id);
  }
}
