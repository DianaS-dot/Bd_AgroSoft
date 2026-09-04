import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateSensorLecturaDto } from '../dto/create-sensor-lectura.dto';
import { UpdateSensorLecturaDto } from '../dto/update-sensor-lectura.dto';

import { SensorLectura } from '../../domain/entities/sensor-lectura';

import { RegistrarLecturaUseCase } from '../../application/use-cases/registrar-lectura.use-case';
import { ObtenerSensorLecturasUseCase } from '../../application/use-cases/obtener-sensor-lecturas.use-case';
import { ObtenerSensorLecturaUseCase } from '../../application/use-cases/obtener-sensor-lectura.use-case';
import { ObtenerLecturasPorSensorUseCase } from '../../application/use-cases/obtener-lecturas-por-sensor.use-case';
import { ObtenerLecturasPorRangoFechasUseCase } from '../../application/use-cases/obtener-lecturas-por-rango-fechas.use-case';
import { ActualizarSensorLecturaUseCase } from '../../application/use-cases/actualizar-sensor-lectura.use-case';
import { EliminarSensorLecturaUseCase } from '../../application/use-cases/eliminar-sensor-lectura.use-case';

@Controller('sensor-lecturas')
export class SensorLecturaController {
  constructor(
    private readonly registrarLectura: RegistrarLecturaUseCase,
    private readonly obtenerSensorLecturas: ObtenerSensorLecturasUseCase,
    private readonly obtenerSensorLectura: ObtenerSensorLecturaUseCase,
    private readonly obtenerLecturasPorSensor: ObtenerLecturasPorSensorUseCase,
    private readonly obtenerLecturasPorRangoFechas: ObtenerLecturasPorRangoFechasUseCase,
    private readonly actualizarSensorLectura: ActualizarSensorLecturaUseCase,
    private readonly eliminarSensorLectura: EliminarSensorLecturaUseCase,
  ) {}

  @Post()
  registrar(@Body() dto: CreateSensorLecturaDto) {
    const lectura = new SensorLectura({
      sensorId: dto.sensorId,
      valor: dto.valor,
      fechaLectura: dto.fechaLectura,
      unidad: dto.unidad,
      observaciones: dto.observaciones,
    });

    return this.registrarLectura.ejecutar(lectura);
  }

  @Get()
  obtenerTodas() {
    return this.obtenerSensorLecturas.ejecutar();
  }

  @Get(':id')
  obtenerUna(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerSensorLectura.ejecutar(id);
  }

  @Get('sensor/:sensorId')
  obtenerPorSensor(@Param('sensorId', ParseIntPipe) sensorId: number) {
    return this.obtenerLecturasPorSensor.ejecutar(sensorId);
  }

  @Get('sensor/:sensorId/rango')
  obtenerPorRangoFechas(
    @Param('sensorId', ParseIntPipe) sensorId: number,
    @Query('desde') desde: string,
    @Query('hasta') hasta: string,
  ) {
    return this.obtenerLecturasPorRangoFechas.ejecutar(
      sensorId,
      new Date(desde),
      new Date(hasta),
    );
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSensorLecturaDto,
  ) {
    const lectura = new SensorLectura({
      id,
      sensorId: dto.sensorId!,
      valor: dto.valor!,
      fechaLectura: dto.fechaLectura!,
      unidad: dto.unidad!,
      observaciones: dto.observaciones!,
    });

    return this.actualizarSensorLectura.ejecutar(lectura);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarSensorLectura.ejecutar(id);
  }
}
