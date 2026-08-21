import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreatePermisoUseCase } from '../../../application/use_cases/create-permiso.use-case';
import { GetPermisoUseCase } from '../../../application/use_cases/get-permiso.use-case';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';

@Controller('permisos')
export class PermisoController {
  constructor(
    private readonly createPermisoUseCase: CreatePermisoUseCase,
    private readonly getPermisoUseCase: GetPermisoUseCase,
  ) {}

  // ─── POST /api/v1/permisos ───────────────────────────────────────────────────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePermisoDto) {
    /**
     * La entidad de dominio Permiso usa 'nombre' y 'descripcion'.
     * Mapeamos desde los campos reales de la tabla: modulo + accion → nombre,
     * y clave → descripcion (adaptación hasta refactorizar la entidad).
     */
    const permiso = await this.createPermisoUseCase.execute({
      nombre: `${dto.modulo}:${dto.accion}`,
      descripcion: dto.clave,
    });
    return { data: permiso };
  }

  // ─── GET /api/v1/permisos/:id ────────────────────────────────────────────────
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const permiso = await this.getPermisoUseCase.findById(id);
    return { data: permiso };
  }

  // ─── GET /api/v1/permisos/nombre/:nombre ─────────────────────────────────────
  @Get('nombre/:nombre')
  async findByNombre(@Param('nombre') nombre: string) {
    const permiso = await this.getPermisoUseCase.findByNombre(nombre);
    return { data: permiso };
  }

  // ─── PATCH /api/v1/permisos/:id ──────────────────────────────────────────────
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() _dto: UpdatePermisoDto,
  ) {
    // TODO: implementar UpdatePermisoUseCase cuando esté disponible
    return {
      message: `Actualización del permiso ${id} pendiente de implementación del caso de uso`,
    };
  }

  // ─── DELETE /api/v1/permisos/:id ─────────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    // TODO: implementar soft-delete en caso de uso
    return;
  }
}
