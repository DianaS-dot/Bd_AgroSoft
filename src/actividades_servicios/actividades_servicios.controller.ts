import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ActividadesServiciosService } from './actividades_servicios.service';
import { CreateActividadServicioDto } from './dto/create-actividad_servicio.dto';
import { UpdateActividadServicioDto } from './dto/update-actividad_servicio.dto';

@Controller('actividades_servicios')
export class ActividadesServiciosController {
  constructor(private readonly serviciosService: ActividadesServiciosService) {}

  @Post()
  create(@Body() createDto: CreateActividadServicioDto) {
    return this.serviciosService.create(createDto);
  }

  @Get()
  findAll() {
    return this.serviciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateActividadServicioDto) {
    return this.serviciosService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.remove(id);
  }
}
