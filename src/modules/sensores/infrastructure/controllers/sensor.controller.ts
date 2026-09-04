import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateSensorDto } from '../dto/create-sensor.dto';
import { UpdateSensorDto } from '../dto/update-sensor.dto';

import { Sensor } from '../../domain/entities/sensor';

import { CrearSensorUseCase } from '../../application/use-cases/crear-sensor.use-case';
import { ObtenerSensoresUseCase } from '../../application/use-cases/obtener-sensores.use-case';
import { ObtenerSensorUseCase } from '../../application/use-cases/obtener-sensor.use-case';
import { ObtenerSensoresActivosUseCase } from '../../application/use-cases/obtener-sensores-activos.use-case';
import { ActualizarSensorUseCase } from '../../application/use-cases/actualizar-sensor.use-case';
import { EliminarSensorUseCase } from '../../application/use-cases/eliminar-sensor.use-case';

@Controller('sensores')
export class SensorController {
  constructor(
    private readonly crearSensor: CrearSensorUseCase,
    private readonly obtenerSensores: ObtenerSensoresUseCase,
    private readonly obtenerSensor: ObtenerSensorUseCase,
    private readonly obtenerSensoresActivos: ObtenerSensoresActivosUseCase,
    private readonly actualizarSensor: ActualizarSensorUseCase,
    private readonly eliminarSensor: EliminarSensorUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreateSensorDto) {
    const sensor = new Sensor({
      nombreSensor: dto.nombreSensor,
      tipoSensorId: dto.tipoSensorId,
      protocolo: dto.protocolo,
      endpointUrl: dto.endpointUrl,
      mqttTopic: dto.mqttTopic,
      valorMinimoSensor: dto.valorMinimoSensor,
      valorMaximoSensor: dto.valorMaximoSensor,
      activo: dto.activo,
      estadoConexion: dto.estadoConexion,
      estado: dto.estado,
      ultimoValor: dto.ultimoValor,
      ultimaMedicion: dto.ultimaMedicion,
      lastSeenAt: dto.lastSeenAt,
      cultivoId: dto.cultivoId,
      creadoPorUsuarioId: dto.creadoPorUsuarioId,
      globalConfigId: dto.globalConfigId,
      loteId: dto.loteId,
      subLoteId: dto.subLoteId,
    });

    return this.crearSensor.ejecutar(sensor);
  }

  @Get()
  obtenerTodos() {
    return this.obtenerSensores.ejecutar();
  }

  @Get('activos')
  obtenerActivos() {
    return this.obtenerSensoresActivos.ejecutar();
  }

  @Get(':id')
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.obtenerSensor.ejecutar(id);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSensorDto,
  ) {
    const sensor = new Sensor({
      id,
      nombreSensor: dto.nombreSensor!,
      tipoSensorId: dto.tipoSensorId!,
      protocolo: dto.protocolo!,
      endpointUrl: dto.endpointUrl!,
      mqttTopic: dto.mqttTopic!,
      valorMinimoSensor: dto.valorMinimoSensor!,
      valorMaximoSensor: dto.valorMaximoSensor!,
      activo: dto.activo!,
      estadoConexion: dto.estadoConexion!,
      estado: dto.estado!,
      ultimoValor: dto.ultimoValor!,
      ultimaMedicion: dto.ultimaMedicion!,
      lastSeenAt: dto.lastSeenAt!,
      cultivoId: dto.cultivoId!,
      creadoPorUsuarioId: dto.creadoPorUsuarioId!,
      globalConfigId: dto.globalConfigId!,
      loteId: dto.loteId!,
      subLoteId: dto.subLoteId!,
    });

    return this.actualizarSensor.ejecutar(sensor);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.eliminarSensor.ejecutar(id);
  }
}
