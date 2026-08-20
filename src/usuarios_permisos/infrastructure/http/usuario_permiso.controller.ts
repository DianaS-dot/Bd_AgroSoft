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
import { CreateUsuarioPermisoUseCase } from '../../application/use_cases/create-usuario_permiso.use-case';
import { CreateUsuarioPermisoDto } from './dto/create-usuario_permiso.dto';
import { ChangeUsuarioPermisoEstadoDto } from './dto/change-usuario_permiso-estado.dto';

@Controller('usuarios-permisos')
export class UsuarioPermisoController {
  constructor(
    private readonly createUsuarioPermisoUseCase: CreateUsuarioPermisoUseCase,
  ) {}

  // ─── POST /api/v1/usuarios-permisos ──────────────────────────────────────────
  /** Asigna un permiso directo a un usuario (override del rol) */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUsuarioPermisoDto) {
    const usuarioPermiso = await this.createUsuarioPermisoUseCase.execute({
      usuarioId: dto.usuarioId,
      permisoId: dto.permisoId,
      estado: dto.estado,
    });
    return { data: usuarioPermiso };
  }

  // ─── PATCH /api/v1/usuarios-permisos/:id/estado ───────────────────────────────
  @Patch(':id/estado')
  async changeEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeUsuarioPermisoEstadoDto,
  ) {
    // TODO: implementar cambio de estado en caso de uso
    return {
      message: `Cambio de estado a '${dto.estado}' para la relación usuario-permiso ${id} pendiente de implementación`,
    };
  }

  // ─── DELETE /api/v1/usuarios-permisos/:id ────────────────────────────────────
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    // TODO: implementar soft-delete en caso de uso
    return;
  }
}
