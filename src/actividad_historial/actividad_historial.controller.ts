import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ActividadHistorialService } from './actividad_historial.service';
import { CreateActividadHistorialDto } from './dto/create-actividad_historial.dto';
import { UpdateActividadHistorialDto } from './dto/update-actividad_historial.dto';

@Controller('actividad_historial')
export class ActividadHistorialController {
  constructor(private readonly historialService: ActividadHistorialService) {}

  @Post()
  create(@Body() createDto: CreateActividadHistorialDto) {
    return this.historialService.create(createDto);
  }

  @Get()
  findAll() {
    return this.historialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historialService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateActividadHistorialDto) {
    return this.historialService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.historialService.remove(id);
  }
}
