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

import { CreateCultivoDto } from "../dto/create-cultivo.dto";
import { UpdateCultivoDto } from "../dto/update-cultivo.dto";

import { Cultivo } from "../../domain/entities/cultivo";

import { CrearCultivoUseCase } from "../../application/use-cases/crear-cultivo.use-case";
import { ObtenerCultivosUseCase } from "../../application/use-cases/obtener-cultivos.use-case";
import { ObtenerCultivoUseCase } from "../../application/use-cases/obtener-cultivo.use-case";
import { ActualizarCultivoUseCase } from "../../application/use-cases/actualizar-cultivo.use-case";
import { EliminarCultivoUseCase } from "../../application/use-cases/eliminar-cultivo.use-case";

@Controller("cultivos")
export class CultivoController {

  constructor(
    private readonly crearCultivo: CrearCultivoUseCase,
    private readonly obtenerCultivos: ObtenerCultivosUseCase,
    private readonly obtenerCultivo: ObtenerCultivoUseCase,
    private readonly actualizarCultivo: ActualizarCultivoUseCase,
    private readonly eliminarCultivo: EliminarCultivoUseCase,
  ) {}

  @Post()
  crear(@Body() dto: CreateCultivoDto) {

    const cultivo = new Cultivo({
      nombreCultivo: dto.nombreCultivo,
      tipoCultivo: dto.tipoCultivo,
      descripcion: dto.descripcion,
      loteId: dto.loteId,
      subloteId: dto.subloteId,
      imgCultivo: dto.imgCultivo,
      fechaSiembra: dto.fechaSiembra,
      fechaFinalizacion: dto.fechaFinalizacion,
      costoTotal: dto.costoTotal,
      estado: dto.estado,
    });

    return this.crearCultivo.ejecutar(cultivo);

  }

  @Get()
  obtenerTodos() {
    return this.obtenerCultivos.ejecutar();
  }

  @Get(":id")
  obtenerUno(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.obtenerCultivo.ejecutar(id);
  }

  @Put(":id")
  actualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCultivoDto,
  ) {

    const cultivo = new Cultivo({
      id,
      nombreCultivo: dto.nombreCultivo!,
      tipoCultivo: dto.tipoCultivo!,
      descripcion: dto.descripcion!,
      loteId: dto.loteId!,
      subloteId: dto.subloteId!,
      imgCultivo: dto.imgCultivo!,
      fechaSiembra: dto.fechaSiembra!,
      fechaFinalizacion: dto.fechaFinalizacion!,
      costoTotal: dto.costoTotal!,
      estado: dto.estado!,
    });

    return this.actualizarCultivo.ejecutar(cultivo);

  }

  @Delete(":id")
  eliminar(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.eliminarCultivo.ejecutar(id);
  }

}

//  el controller no cambia nada solo transforma el dto en una entidad del dominio