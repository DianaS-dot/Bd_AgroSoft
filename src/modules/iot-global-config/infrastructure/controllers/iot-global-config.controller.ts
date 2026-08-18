import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";

import { CreateIotGlobalConfigDto } from "../dto/create-iot-global-config.dto";
import { UpdateIotGlobalConfigDto } from "../dto/update-iot-global-config.dto";

import { IotGlobalConfig } from "../../domain/entities/iot-global-config";

import { CrearIotGlobalConfigUseCase } from "../../application/use-cases/crear-iot-global-config.use-case";
import { ObtenerIotGlobalConfigsUseCase } from "../../application/use-cases/obtener-iot-global-configs.use-case";
import { ObtenerIotGlobalConfigUseCase } from "../../application/use-cases/obtener-iot-global-config.use-case";
import { ObtenerConfigActivaUseCase } from "../../application/use-cases/obtener-config-activa.use-case";
import { ActualizarIotGlobalConfigUseCase } from "../../application/use-cases/actualizar-iot-global-config.use-case";
import { EliminarIotGlobalConfigUseCase } from "../../application/use-cases/eliminar-iot-global-config.use-case";

@Controller("iot-global-config")
export class IotGlobalConfigController {

  constructor(
    private readonly crearConfig: CrearIotGlobalConfigUseCase,
    private readonly obtenerConfigs: ObtenerIotGlobalConfigsUseCase,
    private readonly obtenerConfig: ObtenerIotGlobalConfigUseCase,
    private readonly obtenerConfigActiva: ObtenerConfigActivaUseCase,
    private readonly actualizarConfig: ActualizarIotGlobalConfigUseCase,
    private readonly eliminarConfig: EliminarIotGlobalConfigUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreateIotGlobalConfigDto) {

    const config = new IotGlobalConfig({
      name: dto.name,
      broker: dto.broker,
      port: dto.port,
      protocol: dto.protocol,
      topicPrefix: dto.topicPrefix,
      defaultTopics: dto.defaultTopics,
      customTopics: dto.customTopics,
      loteId: dto.loteId,
      subLoteId: dto.subLoteId,
      username: dto.username,
      password: dto.password,
      activo: dto.activo,
      defaultSensorsInitialized: dto.defaultSensorsInitialized,
      autoDiscover: dto.autoDiscover,
    });

    return this.crearConfig.ejecutar(config);

  }

  @Get()
  obtenerTodas() {
    return this.obtenerConfigs.ejecutar();
  }

  @Get("activa")
  obtenerActiva() {
    return this.obtenerConfigActiva.ejecutar();
  }

  @Get(":id")
  obtenerUna(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.obtenerConfig.ejecutar(id);
  }

  @Put(":id")
  actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateIotGlobalConfigDto,
  ) {

    const config = new IotGlobalConfig({
      id,
      name: dto.name!,
      broker: dto.broker!,
      port: dto.port!,
      protocol: dto.protocol!,
      topicPrefix: dto.topicPrefix!,
      defaultTopics: dto.defaultTopics!,
      customTopics: dto.customTopics!,
      loteId: dto.loteId!,
      subLoteId: dto.subLoteId!,
      username: dto.username!,
      password: dto.password!,
      activo: dto.activo!,
      defaultSensorsInitialized: dto.defaultSensorsInitialized!,
      autoDiscover: dto.autoDiscover!,
    });

    return this.actualizarConfig.ejecutar(config);

  }

  @Delete(":id")
  eliminar(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.eliminarConfig.ejecutar(id);
  }

}
