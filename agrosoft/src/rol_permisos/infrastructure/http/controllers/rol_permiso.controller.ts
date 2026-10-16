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
import { CreateRolPermisoUseCase } from '../../../application/use_cases/create-rol_permiso.use-case';
import { GetRolPermisoUseCase } from '../../../application/use_cases/get-rol_permiso.use-case';
import { CreateRolPermisoDto } from '../dto/create-rol_permiso.dto';
import { ChangeRolPermisoEstadoDto } from '../dto/change-rol_permiso-estado.dto';

@Controller('rol-permisos')
export class RolPermisoController {
  constructor(
    private readonly createRolPermisoUseCase: CreateRolPermisoUseCase,
    private readonly getRolPermisoUseCase: GetRolPermisoUseCase,
  ) {}

  // ─── POST /api/v1/rol-permisos ───────────────────────────────────────────────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateRolPermisoDto) {
    const rolPermiso = await this.createRolPermisoUseCase.execute({
      rolId: dto.rolId,
      permisoId: dto.permisoId,
      estado: dto.estado,
    });
    return { data: rolPermiso };
  }

  // ─── GET /api/v1/rol-permisos/:id ────────────────────────────────────────────
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const rolPermiso = await this.getRolPermisoUseCase.findById(id);
    return { data: rolPermiso };
  }

  // ─── GET /api/v1/rol-permisos/rol/:rolId ─────────────────────────────────────
  /** Devuelve todos los permisos asignados a un rol específico */
  @Get('rol/:rolId')
  async findByRolId(@Param('rolId', ParseIntPipe) rolId: number) {
    const permisos = await this.getRolPermisoUseCase.findByRolId(rolId);
    return { data: permisos };
  }

  // ─── PATCH /api/v1/rol-permisos/:id/estado ───────────────────────────────────
  @Patch(':id/estado')
  async changeEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeRolPermisoEstadoDto,
  ) {
    // TODO: implementar cambio de estado en caso de uso
    return {
      message: `Cambio de estado a '${dto.estado}' para la relación rol-permiso ${id} pendiente de implementación`,
    };
  }

  // ─── DELETE /api/v1/rol-permisos/:id ─────────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    // TODO: implementar soft-delete en caso de uso
    return;
  }
}
